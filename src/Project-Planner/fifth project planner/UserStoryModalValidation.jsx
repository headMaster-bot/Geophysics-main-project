import { useState } from "react";
import Swal from "sweetalert2";
import UseStoryModal from "./UseStoryModal";
import { useDispatch } from "react-redux";
import { createStoryAction, fetchStoriesByEpicIdAction } from "../../redux/slice/story/storySlice";

const UserStoryModalValidation = ({ closeUserStoryModal, epicId }) => {
  console.log(epicId, "epic id declare");
  
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      titleError: "",
      priorityError: "",
      pointError: "",
      // assignError: "",
      descriptionError: "",
    };
    // const payload = {
    //   ...formData,
    //   epic: epicId, // 🔥 THIS IS THE KEY
    // };

    // Validation
    if (!formData.title.trim()) {
      newErrors.titleError = "Title is required";
    }

    if (!formData.priority.trim()) {
      newErrors.priorityError = "Priority is required";
    }

    if (!formData.points.trim()) {
      newErrors.pointError = "Point is required";
    }

    // if (!formData.assigned.trim()) {
    //   newErrors.assignError = "Assign is required";
    // }

    if (!formData.description.trim()) {
      newErrors.descriptionError = "Description is required";
    }

    setErrors(newErrors);

    //  DEFINE IT HERE
    const hasError = Object.values(newErrors).some(Boolean);

    //  STOP IF ERROR
    if (hasError) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return;
    }

    //  NOW SAFE TO DISPATCH
    try {
      // const payload = await dispatch(createStoryAction(formData)).unwrap();
      const payload = await dispatch(
        createStoryAction({
          ...formData,
          epicId, // ✅ THIS IS THE KEY FIX
        })
      ).unwrap();
      console.log(payload, "Payload");
      console.log("FINAL PAYLOAD:", {
        ...formData,
        epicId, 
      });

      // refresh only this epic stories
      dispatch(fetchStoriesByEpicIdAction(epicId));


      // ✅ success
      Swal.fire({
        icon: "success",
        title: "User Story Created!",
        text: "New user story added",
      });

    } catch (err) {
      // ✅ error (including duplicates)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Something went wrong, duplicate story title",
      });
    }

    setFormData({
      title: "",
      priority: "",
      points: "",
      // assigned: "",
      description: "",
    });

    closeUserStoryModal();
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