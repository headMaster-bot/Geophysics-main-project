import { useState } from "react";
import Swal from "sweetalert2";
import UseStoryModal from "./UseStoryModal";
import { useDispatch } from "react-redux";
import { createStoryAction, fetchStoriesByEpicIdAction } from "../../redux/slice/story/storySlice";

const UserStoryModalValidation = ({ closeUserStoryModal, epicId, projectId }) => {
  console.log(epicId, "epic id declare");

  console.log("PROJECT ID:", projectId);
  console.log("EPIC ID:", epicId);
  // dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({

    title: "",
    priority: "",
    points: "",
    // assigned: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    titleError: "",
    priorityError: "",
    pointError: "",
    // assignError: "",
    descriptionError: "",
  });

  // ✅ HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error instantly when typing
    // const errorKey = `${name}Error`;

    // setErrors((prev) => ({
    //   ...prev,
    //   [errorKey]: "",
    // }));
  };

  // HANDLE SUBMIT

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   // validation...

  //   try {
  //     await dispatch(
  //       createStoryAction({
  //         ...formData,
  //         epicId,
  //       })
  //     ).unwrap();

  //     await dispatch(fetchStoriesByEpicIdAction(epicId));

  //     Swal.fire({
  //       icon: "success",
  //       title: "User Story Created!",
  //       text: "New user story added",
  //     });

  //     setFormData({
  //       title: "",
  //       priority: "",
  //       points: "",
  //       description: "",
  //     });

  //     closeUserStoryModal();

  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: err?.message || "Something went wrong",
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await dispatch(
        createStoryAction({
          ...formData,
          epicId,
          projectId,
        })
      ).unwrap();

      await dispatch(fetchStoriesByEpicIdAction(epicId));

      Swal.fire({
        icon: "success",
        title: "User Story Created!",
        text: "New user story added",
      });

      setFormData({
        title: "",
        priority: "",
        points: "",
        description: "",
      });

      closeUserStoryModal();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err || "Something went wrong",
      });
    }
  };
  return (
    <UseStoryModal
      closeUserStoryModal={closeUserStoryModal}
      change={handleInputChange}
      handlingSubmitStory={handleSubmit}
      userInput={formData}
      error={errors}
    />
  );
};

export default UserStoryModalValidation;