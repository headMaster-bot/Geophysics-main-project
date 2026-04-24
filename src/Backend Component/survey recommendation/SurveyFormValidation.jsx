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
import SurveyContent from "./SurveyContent";
import { useParams } from "react-router-dom";
// const { survey } = useSelector((state) => state.surveys);

const SurveyFormValidation = ({ onNext }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchDraftAction(id));
    }
  }, [id, dispatch]);

  const { error: reduxError, success, successMessage, survey } = useSelector(
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

  // ✅ SAVE DRAFT (FIXED COMPLETELY)
  // const handleSaveToDraft = async () => {
  //   console.log("yessssssssssssss");

  //   try {
  //     console.log("🧪 SURVEY FORM BEFORE SAVE:", surveyForm);

  //     // const cleanData = Object.fromEntries(
  //     //   Object.entries(surveyForm).filter(
  //     //     ([_, v]) => v !== "" && v !== null && v !== undefined
  //     //   )
  //     // );

  //     const cleanData = Object.entries(surveyForm).reduce((acc, [key, value]) => {
  //       if (value !== "" && value !== null && value !== undefined) {
  //         acc[key] = value;
  //       }
  //       return acc;
  //     }, {});

  //     const payload = {
  //       ...cleanData,
  //       status: "draft",
  //       surveyId,
  //     };

  //     console.log("📦 FINAL PAYLOAD:", payload);

  //     const res = await dispatch(saveDraftAction(payload));

  //     console.log("📥 RESPONSE:", res);

  //     // if (res.payload?._id) {
  //     //   setSurveyId(res.payload._id);
  //     // }

  //     const draft = res.payload?.data || res.payload;

  //     if (draft?._id) {
  //       setSurveyId(draft._id);
  //     }

  //     Swal.fire({
  //       icon: "success",
  //       title: "Saved",
  //       text: "Draft saved successfully",
  //       timer: 1200,
  //       showConfirmButton: false,
  //     });
  //   } catch (err) {
  //     console.log("❌ SAVE DRAFT ERROR:", err);
  //   }
  // };

  const handleSaveToDraft = async () => {
    try {
      console.log("🧪 SURVEY FORM:", surveyForm);

      if (!surveyForm) {
        console.log("❌ surveyForm is missing");
        return;
      }

      const cleanData = Object.entries(surveyForm).reduce((acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const payload = {
        ...cleanData,
        status: "draft",
        ...(surveyId && { surveyId }),
      };

      console.log("📦 DRAFT PAYLOAD:", payload);

      const res = await dispatch(saveDraftAction(payload));

      const draft = res.payload?.data || res.payload;

      if (draft?._id) {
        setSurveyId(draft._id);
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

    const result = await dispatch(createSurveyAction(surveyForm));

    if (result?.payload?.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Duplicate Survey",
        text: result.payload.message,
      });
      return;
    }

    setSubmitted(true);
  };

  // ✅ SUCCESS HANDLER
  useEffect(() => {
    if (submitted && success) {
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: successMessage || "Survey saved successfully",
      }).then(() => {
        setSubmitted(false);
        dispatch(resetSuccessAction());

        dispatch(getUserProfileAction()).then(() => {
          if (onNext) onNext(2);
        });
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
    <div className="md:w-[967px] border border-[#DADCE0] rounded-[10px] py-[10px] mx-auto mt-10">
      {/* <SurveyForm
        title="Project Setup"
        content={content}
        surveyForm={surveyForm}
        error={error}
        handleSurveyChange={handleSurveyChange}
        handleSurveySubmit={handleSurveySubmit}
        handleSurveyObjective={handleSurveyObjective}
      // handleSaveToDraft={handleSaveToDraft}
      /> */}

      <div className="flex">
        <SurveyContent
          survey={content}
          handleSaveToDraft={handleSaveToDraft}
        />
      </div>

      <SurveyForm
        title="Project Setup"
        content={content}
        surveyForm={surveyForm}
        error={error}
        handleSurveyChange={handleSurveyChange}
        handleSurveySubmit={handleSurveySubmit}
        handleSurveyObjective={handleSurveyObjective}
        handleSaveToDraft={handleSaveToDraft}   // ✅ ADD THIS
      />

      {/* <SurveyContent
        survey={content}
        handleSaveToDraft={handleSaveToDraft}
      /> */}

    </div>
  );
};

export default SurveyFormValidation;