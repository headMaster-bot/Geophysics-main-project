import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import ProjectPlanner from "./ProjectPlanner";
import {
  createProjectAction,
  saveDraftAction,
} from "../redux/slice/project/projectSlice";

const ProjectPlannerValidation = ({ onNext }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ FIXED missing id
  const dispatch = useDispatch();

  const { project } = useSelector((state) => state.projects);

  const [availableUsers, setAvailableUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState("");

  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    sprint: "",
  });

  const [error, setError] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [projectId, setProjectId] = useState(null);

  // ✅ Load project if editing
  useEffect(() => {
    if (project && !projectId) {
      setProjectDetails({
        projectName: project.projectName || "",
        description: project.description || "",
        startDate: project.startDate?.split("T")[0] || "",
        endDate: project.endDate?.split("T")[0] || "",
        sprint: project.sprint || "",
      });

      setProjectId(project._id);
    }
  }, [project, projectId]);

  // ✅ Fetch users
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

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ Add team member
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

    if (onNext) onNext(2);
  };

  // =========================
  // ✅ SAVE DRAFT
  // =========================
  const handleSaveToDraft = async () => {
    try {
      const payload = {
        ...projectDetails,
        status: "draft",
        projectId,
      };

      const res = await dispatch(saveDraftAction(payload)).unwrap();

      const savedProject = res?.project || res;

      if (!savedProject?._id) {
        Swal.fire("Error", "Failed to save draft", "error");
        return;
      }

      setProjectId(savedProject._id);

      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Draft saved successfully",
        timer: 1200,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard/my-project");
      });
    } catch (err) {
      console.log("❌ SAVE DRAFT ERROR:", err);
    }
  };

  // =========================
  // ✅ SUBMIT PROJECT
  // =========================
  const HandleSubmit = (e) => {
    e.preventDefault();

    let formError = {
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
    };

    if (!projectDetails.projectName?.trim()) {
      formError.projectName = "Project name is required";
    }

    if (!projectDetails.description?.trim()) {
      formError.description = "Description is required";
    }

    if (!projectDetails.startDate) {
      formError.startDate = "Start date is required";
    }

    if (!projectDetails.endDate) {
      formError.endDate = "End date is required";
    }

    setError(formError);

    if (
      formError.projectName ||
      formError.description ||
      formError.startDate ||
      formError.endDate
    ) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill all required fields",
        icon: "error",
      });
      return;
    }

    const swal = Swal.mixin({
      customClass: {
        confirmButton:
          "swal2-confirm bg-green-500 text-white px-4 py-2 rounded",
        cancelButton:
          "swal2-cancel bg-red-500 text-white px-4 py-2 rounded mx-3",
      },
      buttonsStyling: false,
    });

    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to submit this project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit!",
      })
      .then((result) => {
        if (!result.isConfirmed) return;

        dispatch(
          createProjectAction({
            ...projectDetails,
            teamMembers,
          })
        )
          .then((res) => {
            if (
              res.meta?.requestStatus === "fulfilled" ||
              (res.payload && !res.error)
            ) {
              const created = res.payload?.data || res.payload;
              const newProjectId = created?._id;

              // ✅ RESET FORM
              setProjectDetails({
                projectName: "",
                description: "",
                startDate: "",
                endDate: "",
                sprint: "",
              });

              setTeamMembers([]);
              setSelectedTeamMemberId("");
              setProjectId(null);

              swal
                .fire({
                  title: "Success",
                  text: "Project created successfully",
                  icon: "success",
                })
                .then(() => {
                  navigate(`/dashboard/project/${newProjectId}/3`);
                });
            } else {
              swal.fire("Error", "Failed to create project", "error");
            }
          })
          .catch((err) => {
            console.log(err);
            swal.fire("Error", "Something went wrong", "error");
          });
      });
  };

  return (
    <ProjectPlanner
      error={error}
      HandleSubmit={HandleSubmit}
      handleChange={handleChange}
      projectDetails={projectDetails}
      handleSaveToDraft={handleSaveToDraft}
      selectedTeamMemberId={selectedTeamMemberId}
      onSelectTeamMember={onSelectTeamMember}
      onAddTeamMember={onAddTeamMember}
      teamMembers={teamMembers}
      onNext={onNext}
    />
  );
};

export default ProjectPlannerValidation;