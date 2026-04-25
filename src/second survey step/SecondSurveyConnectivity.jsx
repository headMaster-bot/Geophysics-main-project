import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import number1 from "../Backend Component/image/num1.png";
import number2 from "../Backend Component/image/num2.png";
import number3 from "../Backend Component/image/num3.png";
import number4 from "../Backend Component/image/num4.png";
import number5 from "../Backend Component/image/num5.png";
import number6 from "../Backend Component/image/num6.png";
import range from "../Backend Component/image/range.png";

import SecondSurveyContent from "./SecondSurveyContent";
import { updateSurveyAction } from "../redux/slice/survey/surveySlice";
import {
  resetSuccessAction,
  resetErrAction,
} from "../redux/slice/globalActions/globalActions";
import { getUserProfileAction } from "../redux/slice/user/usersSlice";
import { useParams } from "react-router-dom";

const SecondSurveyConnectivity = ({ onNext }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const profile = useSelector((state) => state.users.profile);
  const profileLoading = useSelector((state) => state.users.loading);

  const {
    success,
    successMessage,
    error: reduxError,
    loading: surveyLoading,
  } = useSelector((state) => state.surveys);

  const [form, setForm] = useState({
    latitude: "",
    longitude: "",
  });

  const [error, setError] = useState({
    latName: "",
    longName: "",
  });

  const [steps] = useState([
    { id: 1, name: "project setup", range, photo: number1 },
    { id: 2, name: "survey area", range, photo: number2 },
    { id: 3, name: "site characterisation", range, photo: number3 },
    { id: 4, name: "method recommendation", range, photo: number4 },
    { id: 5, name: "survey design", range, photo: number5 },
    { id: 6, name: "review and report", range: number6 },
  ]);

  // Load profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  // Get LATEST survey (VERY IMPORTANT FIX)
  // const surveys = profile?.message?.survey;
  // const currentSurvey =
  //   Array.isArray(surveys) && surveys.length > 0
  //     ? surveys[surveys.length - 1]
  //     : null;

  // const surveyId = currentSurvey?._id;

  const surveys = profile?.message?.survey;
  const currentSurvey =
    Array.isArray(surveys) && surveys.length > 0
      ? surveys[surveys.length - 1]
      : null;

  const surveyId = currentSurvey?._id;

  // INPUT HANDLER
  const handleSecondSurveyChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers (prevents "1000m" issue)
    if (value && !/^\d*$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT HANDLER
  const handleSecondSurveySubmit = (e) => {
    e.preventDefault();

    let errors = {
      latName: "",
      longName: "",
    };

    if (!form.latitude) errors.latName = "Latitude is required";
    if (!form.longitude) errors.longName = "Longitude is required";

    // Prevent NaN
    if (isNaN(Number(form.latitude))) {
      errors.latName = "Latitude must be a number";
    }

    if (isNaN(Number(form.longitude))) {
      errors.longName = "Longitude must be a number";
    }

    setError(errors);

    if (errors.latName || errors.longName) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter valid numeric values",
      });
      return;
    }

    if (!surveyId) {
      Swal.fire({
        icon: "error",
        title: "Survey not ready",
        text: "No survey found. Complete Step 1 first.",
      });
      return;
    }

    const lat = Number(form.latitude);
    const lng = Number(form.longitude);

    // const surveyData = {
    //   latitude: lat,
    //   longitude: lng,
    // };
    const surveyData = {
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    console.log("STEP 2 PAYLOAD:", {
      surveyId,
      surveyData,
    });

    dispatch(updateSurveyAction({ id: surveyId, surveyData }));
  };

  // SUCCESS HANDLER
  useEffect(() => {
    if (success) {
      const lat = Number(form.latitude);
      const lng = Number(form.longitude);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: successMessage || "Survey updated successfully",
      }).then(() => {
        dispatch(resetSuccessAction());

        // IMPORTANT: Pass data forward (THIS FIXES YOUR STEP 3 ISSUE)
        // onNext?.({
        //   latitude: lat,
        //   longitude: lng,
        // });
        onNext?.(); // go to step 3
      });
    }
  }, [success, successMessage, dispatch, onNext, form]);

  // ERROR HANDLER
  useEffect(() => {
    if (reduxError) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: reduxError,
      }).then(() => {
        dispatch(resetErrAction());
      });
    }
  }, [reduxError, dispatch]);

  return (
    <div className="w-full py-14">
      {profileLoading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-center font-medium">
            Loading profile...
          </p>
        </div>
      )}

      {surveyLoading && (
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-700 text-center font-medium">
            Processing your survey...
          </p>
        </div>
      )}

      <SecondSurveyContent
        secondSurveyForm={form}
        error={error}
        handleSecondSurveyChange={handleSecondSurveyChange}
        handleSubmit={handleSecondSurveySubmit}
        title="Survey Recommendation"
        survey={steps}
        SecondTitle="Survey Area Definition"
        isLoading={surveyLoading}
      />
    </div>
  );
};

export default SecondSurveyConnectivity;