import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThirdSurveyContent from './ThirdSurveyContent';
import Swal from "sweetalert2";
import { getUserProfileAction } from '../../redux/slice/user/usersSlice';
import { updateSurveyAction } from '../../redux/slice/survey/surveySlice';
import { resetSuccessAction, resetErrAction } from '../../redux/slice/globalActions/globalActions';

export default function ThirdSurveyValidation({ secondSurveyData, onNext }) {
    const dispatch = useDispatch();

    const { profile } = useSelector((state) => state.users);
    const { loading, error: reduxError, success, successMessage, recommendedMethods } =
        useSelector((state) => state.surveys);

    // ✅ Fetch profile
    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch]);

    // ✅ Get latest survey
    const surveys = profile?.message?.survey;
    const currentSurvey =
        Array.isArray(surveys) && surveys.length > 0
            ? surveys[surveys.length - 1]
            : null;

    // ✅ FINAL FIX: Reliable fallback (Step2 → DB → default)
    const lengthValue =
        secondSurveyData?.latitude ??
        currentSurvey?.latitude ??
        "";

    const breadthValue =
        secondSurveyData?.longitude ??
        currentSurvey?.longitude ??
        "";

    // ✅ Debug (keep for now)
    useEffect(() => {
        console.log("=== STEP 3 DEBUG ===");
        console.log("SecondSurveyData:", secondSurveyData);
        console.log("CurrentSurvey:", currentSurvey);
        console.log("Length:", lengthValue);
        console.log("Breadth:", breadthValue);
    }, [secondSurveyData, currentSurvey, lengthValue, breadthValue]);

    // ✅ Form state
    const [userInput, setUserInput] = useState({
        vegetation: '',
        geologicalSetting: '',
        minDepth: "",
        maxDepth: "",
        checker: []
    });

    const [error, setError] = useState({
        veg: "",
        geo: "",
        dept: "",
        check: ""
    });

    const [submitted, setSubmitted] = useState(false);

    // ✅ Input handler
    const handleChanges = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setUserInput((prev) => {
                const current = prev.checker || [];

                return {
                    ...prev,
                    checker: checked
                        ? [...current, value]
                        : current.filter((item) => item !== value)
                };
            });
        } else {
            setUserInput((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // ✅ Submit handler
    const handleSubmitSurvey = (e) => {
        console.log(userInput, "Surveycccc");
        
        e.preventDefault();

        let newErrors = {
            veg: "",
            geo: "",
            dept: "",
            check: ""
        };

        if (!userInput.vegetation) {
            newErrors.veg = 'Vegetation field is required';
        }

        if (!userInput.geologicalSetting) {
            newErrors.geo = 'Geological setting field is required';
        }

        if (!userInput.minDepth || !userInput.maxDepth) {
            newErrors.dept = 'Both minimum and maximum depth are required';
        } else if (parseFloat(userInput.minDepth) >= parseFloat(userInput.maxDepth)) {
            newErrors.dept = 'Maximum depth must be greater than minimum depth';
        }

        if (!userInput.checker.length) {
            newErrors.check = 'Pick at least one checked field';
        }

        setError(newErrors);

        if (newErrors.veg || newErrors.geo || newErrors.dept || newErrors.check) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Fill all required fields (*) before continuing",
            });
            return;
        }

        const surveyId = currentSurvey?._id;
        const surveyObjective = currentSurvey?.surveyObjective;

        if (!surveyId) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Survey ID not found.",
            });
            return;
        }

        if (!surveyObjective) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Survey objective missing. Complete step 1.",
            });
            return;
        }

        // ✅ Final payload
        const surveyData = {
            surveyObjective,
            latitude: Number(lengthValue),
            longitude: Number(breadthValue),
            vegetationDensity: userInput.vegetation,
            geologicalSetting: userInput.geologicalSetting,
            minDepth: parseFloat(userInput.minDepth),
            maxDepth: parseFloat(userInput.maxDepth),
            siteConstraints: userInput.checker,
        };

        console.log("🚀 FINAL PAYLOAD:", { surveyId, surveyData });

        dispatch(updateSurveyAction({ id: surveyId, surveyData }));
        setSubmitted(true);
    };

    // ✅ Success handler
    useEffect(() => {
        if (submitted && success) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: successMessage || "Saved successfully",
            }).then(() => {
                setSubmitted(false);
                dispatch(resetSuccessAction());
                if (onNext) onNext(4);
            });
        }
    }, [submitted, success, successMessage, dispatch, onNext]);

    // ✅ Error handler
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

    // ✅ Prevent rendering before data is ready
    if (!currentSurvey && !secondSurveyData) {
        return <p className="text-center py-10">Loading survey data...</p>;
    }

    return (
        <div>
            <ThirdSurveyContent
                HandleSubmit={handleSubmitSurvey}
                SurveyChange={handleChanges}
                error={error}
                length={lengthValue}
                breadth={breadthValue}
            />
        </div>
    );
}