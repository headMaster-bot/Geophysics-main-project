import { useNavigate } from "react-router-dom";
import ProjectSaveDraftContent from "./ProjectSaveDraftContent";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { saveDraftAction } from "../redux/slice/project/projectSlice";
// import axios from "axios";

const ProjectSaveDraftValidation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleSaveToDraft = () => {

  //   // ✅ SUCCESS
  //   Swal.fire({
  //     position: "top-end",
  //     icon: "success",
  //     title: "Your work has been saved",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   }).then(() => {
  //     navigate("/dashboard/my-project");
  //   });



  // };

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
  // const handleVarChange = (e) => {
  //   const { name, value } = e.target;

  //   setProjectDetails((prev) => ({
  //     ...prev,
  //     [name]: value
  //   }));

  //   // clear error while typing
  //   setError((prev) => ({
  //     ...prev,
  //     [name]: ""
  //   }));
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
     console.log(name, value); // 👈 debug
    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [projectId, setProjectId] = useState(null)

  // const handleSaveToDraft = async (projectId) => {
  //   console.log("working");
  //   if (
  //     !projectDetails.projectName &&
  //     !projectDetails.description &&
  //     !projectDetails.startDate &&
  //     !projectDetails.endDate
  //   ) {
  //     console.log("❌ Empty draft — still allowed or block if you want");
  //     // OPTIONAL: return here if you truly want to block empty drafts
  //     // return;
  //   }

  //   try {
  //     const payload = {
  //       ...projectDetails,
  //       ...(projectId && { projectId }), // only include if exists
  //     };

  //     const res = await dispatch(saveDraftAction(payload)).unwrap();

  //     console.log("Saved:", res);

  //     // 🔥 THIS LINE MAKES EVERYTHING WORK
  //     if (res?.project?._id) {
  //       setProjectId(res.project._id);
  //     }

  //     Swal.fire({
  //       icon: "success",
  //       title: "Saved",
  //       text: "Draft saved successfully",
  //       timer: 1200,
  //       showConfirmButton: false,
  //     });
  //     navigate("/dashboard/my-project");


  //   } catch (err) {
  //     console.log("❌ ERROR:", err);
  //   }
  // };




  // ✅ SAVE TO DRAFT
  // const handleSaveToDraft = async () => {
  //   console.log(projectDetails);

  //   try {
  //     const cleanData = Object.entries(projectDetails).reduce(
  //       (acc, [key, value]) => {
  //         if (value !== "" && value !== null && value !== undefined) {
  //           acc[key] = value;
  //         }
  //         return acc;
  //       },
  //       {}
  //     );

  //     const payload = {
  //       ...cleanData,
  //       status: "draft",
  //       ...(projectId && { _id: projectId }), // ✅ FIXED
  //     };

  //     const draft = await dispatch(saveDraftAction(payload)).unwrap();

  //     if (draft?._id) {
  //       setProjectId(draft._id);
  //     }

  //     Swal.fire({
  //       icon: "success",
  //       title: "Saved",
  //       text: "Draft saved successfully",
  //     }).then(() => {
  //       navigate("/dashboard/my-project");
  //     });
  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: err?.message || "Failed to save draft",
  //     });
  //   }
  // };

   const handleSaveToDraft = async () => {
        console.log("Project Validation");

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
            console.log(res, "created");

            const draft = res.payload?.data || res.payload;

            if (draft?._id) {
                const newId = draft._id;

                setProjectId(newId);

                // 🔥 IMPORTANT: navigate WITH id
                navigate(`/dashboard/my-project/${newId}`);
                
            }

            Swal.fire({
              icon: "success",
                title: "Saved",
                text: "Draft saved successfully",
              }).then(() => {
                navigate("/dashboard/my-project");
              });

        } catch (err) {
            console.log("❌ SAVE DRAFT ERROR:", err);
        }
    };

  return (
    <>
      <ProjectSaveDraftContent
        handleSaveToDraft={handleSaveToDraft}
        projectDetails={projectDetails}
        handleChange={handleChange}
        // error={error}
        // users={availableUsers}
      />
    </>
  );
};

export default ProjectSaveDraftValidation;