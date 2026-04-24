import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import SurveyForm from "./SurveyForm";

import {
  createSurveyAction,
  fetchDraftAction,
  saveDraftAction,
} from "../../redux/slice/survey/surveySlice";

import { getUserProfileAction } from "../../redux/slice/user/usersSlice";
import {
  resetSuccessAction,
  resetErrAction,
} from "../../redux/slice/globalActions/globalActions";

import first from "../image/🌿.png";
import second from "../image/⛏️.png";
import third from "../image/🏗️.png";
import fourth from "../image/🏛️.png";
<<<<<<< HEAD
import SurveyContent from "./SurveyContent";
import { useParams } from "react-router-dom";
// const { survey } = useSelector((state) => state.surveys);
=======

import SurveyConnectivity from "./SurveyConnectivity";
import { useNavigate } from "react-router-dom";
>>>>>>> 312e976465945fab6535197eff0613843bc951a6

const SurveyFormValidation = ({ onNext }) => {
  const dispatch = useDispatch();
  const navToMyProject = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchDraftAction(id));
    }
  }, [id, dispatch]);

  const { error: reduxError, success, successMessage, survey } = useSelector(
    (state) => state.surveys
  );

<<<<<<< HEAD


  const [content] = useState([
=======
  const [contents] = useState([
>>>>>>> 312e976465945fab6535197eff0613843bc951a6
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

  const [surveyId, setSurveyId] = useState(null);

  const [error, setError] = useState({
    surveyName: "",
    surveyObjective: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (survey) {
      setSurveyForm({
        surveyName: survey.surveyName || "",
        description: survey.description || "",
        surveyObjective: survey.surveyObjective || "",
        others: survey.others || "",
        clientName: survey.clientName || "",
        clientEmail: survey.clientEmail || "",
        targetCompletionDate: survey.targetCompletionDate || "",
      });
    }
  }, [survey]);


  // ✅ HANDLE INPUT CHANGE
  const handleSurveyChange = (e) => {
    const { name, value } = e.target;

    setSurveyForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ✅ OBJECTIVE SELECT
  const handleSurveyObjective = (value) => {
    setSurveyForm((prev) => ({
      ...prev,
      surveyObjective: value,
    }));

    if (error.surveyObjective) {
      setError((prev) => ({
        ...prev,
        surveyObjective: "",
      }));
    }
  };

  // ✅ SAVE TO DRAFT
  const handleSaveToDraft = async () => {
    try {
      const cleanData = Object.entries(surveyForm).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const payload = {
        ...cleanData,
        status: "draft",
        ...(surveyId && { _id: surveyId }), // ✅ FIXED
      };

      const draft = await dispatch(saveDraftAction(payload)).unwrap();

      if (draft?._id) {
        setSurveyId(draft._id);
      }

      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Draft saved successfully",
      }).then(() => {
        navToMyProject("/dashboard/my-project");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Failed to save draft",
      });
    }
  };

  // ✅ SUBMIT SURVEY
  const handleSurveySubmit = async (e) => {
    e.preventDefault();

    const surveyFormError = {
      surveyName: !surveyForm.surveyName?.trim()
        ? "Survey name is required"
        : "",
      surveyObjective: !surveyForm.surveyObjective
        ? "Survey objective must be selected"
        : "",
    };

    setError(surveyFormError);

    if (surveyFormError.surveyName || surveyFormError.surveyObjective) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all required fields (*) before continuing",
      });
      return;
    }

    try {
      await dispatch(createSurveyAction(surveyForm)).unwrap();
      setSubmitted(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Failed to create survey",
      });
    }
  };

  // ✅ SUCCESS HANDLER
  useEffect(() => {
    if (submitted && success) {
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: successMessage || "Survey saved successfully",
      }).then(async () => {
        setSubmitted(false);
        dispatch(resetSuccessAction());

        await dispatch(getUserProfileAction());

        if (onNext) onNext(2);
      });
    }
  }, [submitted, success, successMessage, dispatch, onNext]);

  // ❌ ERROR HANDLER
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
    <>
      <SurveyConnectivity handleSaveToDraft={handleSaveToDraft} />

<<<<<<< HEAD
      <div className="flex">
        <SurveyContent
          survey={content}
=======
      <div className="md:w-[967px] border border-[#DADCE0] rounded-[10px] py-[10px] mx-auto mt-10">
        <SurveyForm
          title="Project Setup"
          content={contents}
          surveyForm={surveyForm}
          error={error}
          handleSurveyChange={handleSurveyChange}
          handleSurveySubmit={handleSurveySubmit}
          handleSurveyObjective={handleSurveyObjective}
>>>>>>> 312e976465945fab6535197eff0613843bc951a6
          handleSaveToDraft={handleSaveToDraft}
        />
      </div>
    </>
  );
};

export default SurveyFormValidation;