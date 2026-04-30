import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import SurveyForm from "./SurveyForm";
import {
  createSurveyAction,
  fetchDraftAction,
  updateSurveyAction,
  saveDraftAction,
} from "../../redux/slice/survey/surveySlice";

// import { getUserProfileAction } from "../../redux/slice/user/usersSlice";
// import {
//   resetSuccessAction,
//   resetErrAction,
// } from "../../redux/slice/globalActions/globalActions";

import first from "../image/🌿.png";
import second from "../image/⛏️.png";
import third from "../image/🏗️.png";
import fourth from "../image/🏛️.png";

// import SurveyContent from "./SurveyContent";
import { useParams } from "react-router-dom";
// const { survey } = useSelector((state) => state.surveys);
// =======

import SurveyConnectivity from "./SurveyConnectivity";
import { useNavigate } from "react-router-dom";
// >>>>>>> 312e976465945fab6535197eff0613843bc951a6

const SurveyFormValidation = ({ onNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchDraftAction(id));
      setSurveyId(id); // 🔥 IMPORTANT FIX
    }
  }, [id, dispatch]);

  const { error: reduxError, survey } = useSelector(
    (state) => state.surveys
  );

  // <<<<<<< HEAD


  // const [content] = useState([
  // =======
  const [contents] = useState([
    
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

  // ✅ HANDLE INPUT CHANGE

  useEffect(() => {
    if (survey && id) { // 👈 only when editing
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
  }, [survey, id]);

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
      const cleanData = Object.fromEntries(
        Object.entries(surveyForm).filter(
          ([_, v]) => v !== "" && v !== null && v !== undefined
        )
      );

      const payload = {
        ...cleanData,
        status: "draft",
        ...(surveyId && { _id: surveyId }),
      };

      const draft = await dispatch(saveDraftAction(payload)).unwrap();

      const newId = draft?._id || draft?.survey?._id;

      if (newId) setSurveyId(newId);

      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Draft saved successfully",
      });
      setSurveyForm({
        surveyName: "",
        description: "",
        surveyObjective: "",
        others: "",
        clientName: "",
        clientEmail: "",
        targetCompletionDate: "",
      })
      navigate(`/dashboard/my-project`);
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

    // ❌ STOP HERE IF ERROR
    if (surveyFormError.surveyName || surveyFormError.surveyObjective) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all required fields (*) before continuing",
      });
      return;
    }

    try {
      let res;

      if (surveyId) {
        res = await dispatch(
          updateSurveyAction({
            id: surveyId,
            surveyData: surveyForm,
          })
        ).unwrap();
      } else {
        res = await dispatch(createSurveyAction(surveyForm)).unwrap();
      }

      const newId =
        res?.surveyCreated?._id ||
        res?.survey?._id ||
        res?._id;

      if (!newId) throw new Error("No survey ID returned");

      setSurveyId(newId);

      // ✅ SWEET ALERT MUST COME AFTER API
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Survey created successfully",
      }).then(() => {
        setSurveyForm({
          surveyName: "",
          description: "",
          surveyObjective: "",
          others: "",
          clientName: "",
          clientEmail: "",
          targetCompletionDate: "",
        })
        // ✅ ONLY NAVIGATE HERE
        navigate(`/dashboard/survey/${newId}/2`);
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Failed to create/update survey",
      });
    }
  };

  // ✅ SUCCESS HANDLER
  // useEffect(() => {
  //   if (submitted && success) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Saved",
  //       text: successMessage || "Survey saved successfully",
  //     }).then(async () => {
  //       setSubmitted(false);
  //       dispatch(resetSuccessAction());

  //       await dispatch(getUserProfileAction());

  //       if (onNext) onNext(2);
  //       // navigate(`/dashboard/survey/${newSurveyId}/2`);

  //     });
  //   }
  // }, [submitted, success, successMessage, dispatch, onNext]);

  // ❌ ERROR HANDLER
  useEffect(() => {
    if (submitted && reduxError) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: reduxError,
      }).then(() => {
        setSubmitted(false);
        // dispatch(resetxErrAction());
      });
    }
  }, [submitted, reduxError, dispatch]);

  return (
    <>
      <SurveyConnectivity handleSaveToDraft={handleSaveToDraft} />

      <div className="flex">
        {/* <SurveyContent
          survey={content}
        /> */}
      </div>

      <div className="md:w-[967px] border border-[#DADCE0] rounded-[10px] py-[10px] mx-auto mt-10">
        <SurveyForm
          title="Project Setup"
          content={contents}
          surveyForm={surveyForm}
          error={error}
          handleSurveyChange={handleSurveyChange}
          handleSurveySubmit={handleSurveySubmit}
          handleSurveyObjective={handleSurveyObjective}
        />

      </div>

    </>
  );
};

export default SurveyFormValidation;