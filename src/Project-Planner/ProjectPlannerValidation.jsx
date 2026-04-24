import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import ProjectPlanner from "./ProjectPlanner";
import { createProjectAction, saveDraftAction } from "../redux/slice/project/projectSlice";

const ProjectPlannerValidation = ({ onNext }) => {
<<<<<<< HEAD
    const saveToDraft = useNavigate();
=======
    // const saveToDraft = useNavigate();
    // const handleSaveToDraft = () => {
    //     Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Your work has been saved",
    //     showConfirmButton: false,
    //     timer: 1500
    //     });
    //     saveToDraft('/dashboard/my-project');
    // }
>>>>>>> 312e976465945fab6535197eff0613843bc951a6
    const dispatch = useDispatch();


    const [availableUsers, setAvailableUsers] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedTeamMemberId, setSelectedTeamMemberId] = useState("");
    // const handleSaveToDraft = () => {
    //     Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Your work has been saved",
    //     showConfirmButton: false,
    //     timer: 1500
    //     });
    //     saveToDraft('/dashboard/my-project');
    // }

    const [projectDetails, setProjectDetails] = useState({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const [error, setError] = useState({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
    });
    const [projectId, setProjectId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/users`);
                setAvailableUsers(data?.message || []);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
    }, []);

    // const [project, setProject] = useState(null)

    // const handleSaveToDraft = async (projectId) => {
    //     console.log("working");
    //     if (
    //         !projectDetails.projectName &&
    //         !projectDetails.description &&
    //         !projectDetails.startDate &&
    //         !projectDetails.endDate
    //     ) {
    //         console.log("❌ Empty draft — still allowed or block if you want");
    //         // OPTIONAL: return here if you truly want to block empty drafts
    //         // return;
    //     }

    //     try {
    //         const payload = {
    //             ...projectDetails,
    //             ...(projectId && { projectId }), // only include if exists
    //         };

    //         const res = await dispatch(saveDraftAction(payload)).unwrap();

    //         console.log("Saved:", res);

    //         // 🔥 THIS LINE MAKES EVERYTHING WORK
    //         if (res?.project?._id) {
    //             setProject(res.project._id);
    //         }

    //         Swal.fire({
    //             icon: "success",
    //             title: "Saved",
    //             text: "Draft saved successfully",
    //             timer: 1200,
    //             showConfirmButton: false,
    //         });

    //     } catch (err) {
    //         console.log("❌ ERROR:", err);
    //     }
    // };

    const handleSaveToDraft = async () => {
        try {
            console.log("🧪 SURVEY FORM:", projectDetails);

            if (!projectDetails) {
                console.log("❌ surveyForm is missing");
                return;
            }

            const cleanData = Object.entries(projectDetails).reduce((acc, [key, value]) => {
                if (value !== "" && value !== null && value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});

            const payload = {
                ...cleanData,
                status: "draft",
                ...(projectId && { projectId }),
            };

            console.log("📦 DRAFT PAYLOAD:", payload);

            const res = await dispatch(saveDraftAction(payload));

            const draft = res.payload?.data || res.payload;

            if (draft?._id) {
                setProjectId(draft._id);
            }

            Swal.fire({
                icon: "success",
                title: "Saved",
                text: "Draft saved successfully",
                timer: 1200,
                showConfirmButton: false,
            });

        } catch (err) {
            console.log("❌ SAVE DRAFT ERROR:", err);
        }
    };

    const onSelectTeamMember = (e) => {
        setSelectedTeamMemberId(e.target.value);
    };

    const onAddTeamMember = () => {
        if (!selectedTeamMemberId) return;

        const member = availableUsers.find(
            (user) => user._id === selectedTeamMemberId
        );

        if (member && !teamMembers.some((m) => m._id === member._id)) {
            setTeamMembers((prev) => [...prev, member]);
        }

        // ✅ Move to next step when button is clicked
        if (onNext) onNext(2);
    };

    // ✅ Handle input change
    const handleVarChange = (e) => {
        const { name, value } = e.target;

        setProjectDetails((prev) => ({
            ...prev,
            [name]: value
        }));

        // clear error while typing
        setError((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    // ✅ Handle submit
    const HandleSubmit = (e) => {
        e.preventDefault();

        let formError = {
            projectName: "",
            description: "",
            startDate: "",
            endDate: "",
        };

        // ✅ Validate each field individually
        if (!projectDetails.projectName || !projectDetails.projectName.trim()) {
            formError.projectName = "Project name is required";
        }

        if (!projectDetails.description || !projectDetails.description.trim()) {
            formError.description = "Description is required";
        }

        if (!projectDetails.startDate) {
            formError.startDate = "Start date is required";
        }

        if (!projectDetails.endDate) {
            formError.endDate = "End date is required";
        }

        setError(formError);

        // ✅ Stop if any error exists
        if (formError.projectName || formError.description || formError.startDate || formError.endDate) {
            Swal.fire({
                title: "Validation Error",
                text: "Please fill in all required fields",
                icon: "error"
            });
            return;
        }

        // confirmation
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "swal2-confirm rounded-[10px] bg-green-500 text-white px-4 py-2 rounded border border-green-700",
                cancelButton: "swal2-cancel rounded-[10px] mx-4 bg-red-500 text-white px-4 py-2 rounded border border-red-700"

            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "Do you want to submit this project?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, submit!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {

            if (result.isConfirmed) {
                // dispatch Redux action and wait for it to complete
                dispatch(createProjectAction({ ...projectDetails, teamMembers })).then((res) => {
                    console.log('Project creation response:', res);
                    // Check if action was fulfilled (payload exists) or rejected (error exists)
                    if (res.meta?.requestStatus === 'fulfilled' || (res.payload && !res.error)) {
                        swalWithBootstrapButtons.fire({
                            title: "Submitted!",
                            text: "Your project has been created successfully.",
                            icon: "success"
                        }).then(() => {
                            if (onNext) onNext(3);
                        });
                    } else {
                        swalWithBootstrapButtons.fire({
                            title: "Error!",
                            text: res.payload || "Failed to create project",
                            icon: "error"
                        });
                    }
                }).catch((err) => {
                    console.error('Error creating project:', err);
                    swalWithBootstrapButtons.fire({
                        title: "Error!",
                        text: err?.message || "Failed to create project",
                        icon: "error"
                    });
                });
            }

            else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Submission cancelled",
                    icon: "info"
                });
            }
        });
    };

    return (
        <>
            <ProjectPlanner
                error={error}
                HandleSubmit={HandleSubmit}
                HandleChange={handleVarChange}
                userInput={projectDetails}
                availableUsers={availableUsers}
                selectedTeamMemberId={selectedTeamMemberId}
                onSelectTeamMember={onSelectTeamMember}
                onAddTeamMember={onAddTeamMember}
                teamMembers={teamMembers}
                onNext={onNext}
<<<<<<< HEAD
                handleSaveToDraft={handleSaveToDraft}

=======

                // handleSaveToDraft={handleSaveToDraft}
                
>>>>>>> 312e976465945fab6535197eff0613843bc951a6
            />
        </>
    );
};

export default ProjectPlannerValidation;