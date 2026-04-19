import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import SurveyForm from "./SurveyForm";
import { createSurveyAction } from "../../redux/slice/survey/surveySlice";
import { getUserProfileAction } from "../../redux/slice/user/usersSlice";
import {
  resetSuccessAction,
  resetErrAction,
} from "../../redux/slice/globalActions/globalActions";

import first from "../image/🌿.png";
import second from "../image/⛏️.png";
import third from "../image/🏗️.png";
import fourth from "../image/🏛️.png";


const SurveyFormValidation = ({ onNext }) => {
  const dispatch = useDispatch();
  const { error: reduxError, success, successMessage } = useSelector(
    (state) => state.surveys
  );

  const [content] = useState([
    { id: 1, photo: first, topic: "Environmental Assessment" },
    { id: 2, photo: second, topic: "Groundwater Exploration" },
    { id: 3, photo: third, topic: "Engineering Investigation" },
    { id: 4, photo: fourth, topic: "Archaeological Survey" },
  ]);

  const [surveyForm, setSurveyForm] = useState({
    surveyName: "",
    description: "",
    surveyObjective: "",
    others: "",
    clientName: "",
    clientEmail: "",
    targetCompletionDate: "",
  });

  const [error, setError] = useState({
    surveyName: "",
    surveyObjective: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSurveyChange = (e) => {
    const { name, value } = e.target;
    setSurveyForm((prev) => ({ ...prev, [name]: value }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSurveyObjective = (value) => {
    setSurveyForm((prev) => ({ ...prev, surveyObjective: value }));

    if (error.surveyObjective) {
      setError((prev) => ({ ...prev, surveyObjective: "" }));
    }
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();

    const surveyFormError = {
      surveyName: !surveyForm.surveyName.trim()
        ? "Survey name is required"
        : "",
      surveyObjective: !surveyForm.surveyObjective
        ? "Survey objective must be selected"
        : "",
    };

    setError(surveyFormError);

    // ✅ FIXED VALIDATION
    if (surveyFormError.surveyName || surveyFormError.surveyObjective) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all required fields (*) before continuing",
      });
      return;
    }

    // ✅ SEND TO REDUX AND SHOW SUCCESS ON COMPLETE
    const result = dispatch(createSurveyAction(surveyForm));

    const payload = result?.payload;

    // ❌ STOP IF FAILED
    if (payload?.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Duplicate Survey",
        text: payload.message,
      });
      return;
    }
    setSubmitted(true);
  };

  /** SUCCESS (optional feedback only) */
  useEffect(() => {
    if (submitted && success) {
      console.log('=== SurveyFormValidation Success ===');
      console.log('Refreshing profile to get new survey ID...');

      Swal.fire({
        icon: "success",
        title: "Saved",
        text: successMessage || "Survey saved successfully done",
      }).then(() => {
        setSubmitted(false);
        dispatch(resetSuccessAction());

        // ✅ CRITICAL: Refresh profile to get the new survey ID
        // This ensures all subsequent steps see the new survey
        dispatch(getUserProfileAction()).then(() => {
          console.log('Profile refreshed with new survey ID');
          if (onNext) onNext(2);
        });
      });
    }
  }, [submitted, success, successMessage, dispatch, onNext]);

  /** ERROR HANDLING */
  useEffect(() => {
    if (submitted && reduxError) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: reduxError,
      }).then(() => {
        setSubmitted(false);
        dispatch(resetErrAction());
      });
    }
  }, [submitted, reduxError, dispatch]);

  return (
    <div className="md:w-[967px] border border-[#DADCE0] rounded-[10px] py-[10px] mx-auto mt-10">
      <SurveyForm
        title="Project Setup"
        content={content}
        surveyForm={surveyForm}
        error={error}
        handleSurveyChange={handleSurveyChange}
        handleSurveySubmit={handleSurveySubmit}
        handleSurveyObjective={handleSurveyObjective}
      />
    </div>
  );
};

export default SurveyFormValidation;