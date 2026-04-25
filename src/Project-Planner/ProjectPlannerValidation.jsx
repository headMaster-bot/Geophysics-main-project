import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import ProjectPlanner from "./ProjectPlanner";
import { createProjectAction, saveDraftAction } from "../redux/slice/project/projectSlice";

const ProjectPlannerValidation = ({ onNext }) => {
    const navigate = useNavigate();
    // const navigate = useNavigate();
    // const handleSaveToDraft = () => {
    //     Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Your work has been saved",
    //     showConfirmButton: false,
    //     timer: 1500
    //     });
    //     navigate('/dashboard/my-project');
    // }
    const dispatch = useDispatch();
    const { project } = useSelector((state) => state.projects);



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
    //     navigate('/dashboard/my-project');
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
        if (project) {
            setProjectDetails({
                projectName: project.projectName || "",
                description: project.description || "",
                startDate: project.startDate?.split("T")[0] || "",
                endDate: project.endDate?.split("T")[0] || "",
            });
        }
    }, [project]);

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

    // const handleSaveToDraft = async () => {
    //     console.log("Project Validation");

    //     try {
    //         console.log("🧪 SURVEY FORM:", projectDetails);

    //         if (!projectDetails) {
    //             console.log("❌ surveyForm is missing");
    //             return;
    //         }

    //         const cleanData = Object.entries(projectDetails).reduce((acc, [key, value]) => {
    //             if (value !== "" && value !== null && value !== undefined) {
    //                 acc[key] = value;
    //             }
    //             return acc;
    //         }, {});

    //         const payload = {
    //             ...cleanData,
    //             status: "draft",
    //             ...(projectId && { projectId }),
    //         };

    //         console.log("📦 DRAFT PAYLOAD:", payload);

    //         const res = await dispatch(saveDraftAction(payload));
    //         console.log(res, "created");


    //         const draft = res.payload?.data || res.payload;

    //         if (draft?._id) {
    //             setProjectId(draft._id);
    //         }

    //         Swal.fire({
    //             icon: "success",
    //             title: "Saved",
    //             text: "Draft saved successfully",
    //             timer: 1200,
    //             showConfirmButton: false,
    //         });

    //     } catch (err) {
    //         console.log("❌ SAVE DRAFT ERROR:", err);
    //     }
    // };


    // const handleSaveToDraft = async () => {
    //     console.log("Project Validation");

    //     try {
    //         console.log("🧪 SURVEY FORM:", projectDetails);

    //         if (!projectDetails) {
    //             console.log("❌ surveyForm is missing");
    //             return;
    //         }

    //         const cleanData = Object.entries(projectDetails).reduce((acc, [key, value]) => {
    //             if (value !== "" && value !== null && value !== undefined) {
    //                 acc[key] = value;
    //             }
    //             return acc;
    //         }, {});

    //         const payload = {
    //             ...cleanData,
    //             status: "draft",
    //             ...(projectId && { projectId }),
    //         };

    //         console.log("📦 DRAFT PAYLOAD:", payload);

    //         const res = await dispatch(saveDraftAction(payload));
    //         console.log(res, "created");

    //         const draft = res.payload?.data || res.payload;

    //         if (draft?._id) {
    //             const newId = draft._id;

    //             setProjectId(newId);

    //             // 🔥 IMPORTANT: navigate WITH id
    //             navigate(`/dashboard/project/${newId}/2`);
    //         }

    //          Swal.fire({
    //                       icon: "success",
    //                         title: "Saved",
    //                         text: "Draft saved successfully",
    //                       }).then(() => {
    //                         navigate("/dashboard/my-project");
    //                       });

    //     } catch (err) {
    //         console.log("❌ SAVE DRAFT ERROR:", err);
    //     }
    // };

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
    const handleChange = (e) => {
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
                        const createdProject = res.payload?.data || res.payload;

                        const newProjectId = createdProject?._id;

                        console.log("🔥 NEW PROJECT ID:", newProjectId);

                        if (!newProjectId) {
                            console.log("❌ No ID returned");
                            return;
                        }
                        swalWithBootstrapButtons.fire({
                            title: "Submitted!",
                            text: "Your project has been created successfully.",
                            icon: "success"
                        }).then(() => {
                            // if (onNext) onNext(3);
                            navigate(`/dashboard/project/${newProjectId}/3`);
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
            {/* <ProjectPlanner
                error={error}
                HandleSubmit={HandleSubmit}
                handleChange={handleChange}
                projectDetails={projectDetails}
                availableUsers={availableUsers}
                selectedTeamMemberId={selectedTeamMemberId}
                onSelectTeamMember={onSelectTeamMember}
                onAddTeamMember={onAddTeamMember}
                teamMembers={teamMembers}
                onNext={onNext}
                // handleSaveToDraft={handleSaveToDraft}


                // handleSaveToDraft={handleSaveToDraft}
                
            /> */}
            <ProjectPlanner
                error={error}
                HandleSubmit={HandleSubmit}
                handleChange={handleChange}
                projectDetails={projectDetails}
                setProjectDetails={setProjectDetails}
                // handleSaveToDraft={handleSaveToDraft}
                 selectedTeamMemberId={selectedTeamMemberId}
                onSelectTeamMember={onSelectTeamMember}
                onAddTeamMember={onAddTeamMember}
                teamMembers={teamMembers}
                onNext={onNext}
            />
        </>
    );
};

export default ProjectPlannerValidation;