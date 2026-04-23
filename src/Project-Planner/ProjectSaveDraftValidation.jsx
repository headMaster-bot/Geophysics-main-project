import { useNavigate } from "react-router-dom";
import ProjectSaveDraftContent from "./ProjectSaveDraftContent";
import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import axios from "axios";

const ProjectSaveDraftValidation = () => {
  const navigate = useNavigate();
//   const dispatch = useDispatch();

    const handleSaveToDraft = () => {

    // ✅ SUCCESS
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/dashboard/my-project");
    });

    // 👉 OPTIONAL: dispatch saveDraftAction here
    // dispatch(saveProjectDraftAction(projectDetails));
  };

  return (
    <>
      <ProjectSaveDraftContent
        handleSaveToDraft={handleSaveToDraft}
        // projectDetails={projectDetails}
        // handleChange={handleChange}
        // error={error}
        // users={availableUsers}
      />
    </>
  );
};

export default ProjectSaveDraftValidation;