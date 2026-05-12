import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";

import ThirdSurveyContent from './ThirdSurveyContent';

// Redux actions
import { getUserProfileAction } from '../../redux/slice/user/usersSlice';
import { updateSurveyAction } from '../../redux/slice/survey/surveySlice';
import { resetSuccessAction, resetErrAction } from '../../redux/slice/globalActions/globalActions';

export default function ThirdSurveyValidation({ secondSurveyData, onNext }) {
    const dispatch = useDispatch();

    const { surveys, survey, success, successMessage, error: reduxError } =
        useSelector((state) => state.surveys);

    useEffect(() => {
        dispatch(getUserProfileAction()); // optional only if needed elsewhere
    }, [dispatch]);

    // ✅ ALWAYS use redux surveys
    const currentSurvey =
        surveys?.length ? surveys[surveys.length - 1] : null;

    const lengthValue =
        secondSurveyData?.latitude ??
        currentSurvey?.latitude ??
        "";

    const breadthValue =
        secondSurveyData?.longitude ??
        currentSurvey?.longitude ??
        "";

    const [userInput, setUserInput] = useState({
        vegetation: "",
        geologicalSetting: "",
        minDepth: "",
        maxDepth: "",
        checker: []
    });

    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChanges = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setUserInput((prev) => ({
                ...prev,
                checker: checked
                    ? [...prev.checker, value]
                    : prev.checker.filter((i) => i !== value)
            }));
        } else {
            setUserInput((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmitSurvey = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!userInput.vegetation) newErrors.veg = "Required";
        if (!userInput.geologicalSetting) newErrors.geo = "Required";

        if (!userInput.minDepth || !userInput.maxDepth)
            newErrors.dept = "Depth required";

        if (!userInput.checker.length)
            newErrors.check = "Select constraints";

        setError(newErrors);

        if (Object.keys(newErrors).length) return;

        const surveyId = currentSurvey?._id;

        const surveyData = {
            surveyObjective: currentSurvey?.surveyObjective,
            latitude: Number(lengthValue),
            longitude: Number(breadthValue),
            vegetationDensity: userInput.vegetation,
            geologicalSetting: userInput.geologicalSetting,
            minDepth: Number(userInput.minDepth),
            maxDepth: Number(userInput.maxDepth),
            siteConstraints: userInput.checker,
        };

        dispatch(updateSurveyAction({ id: surveyId, surveyData }));
        setSubmitted(true);
    };

    useEffect(() => {
        if (submitted && success) {
            Swal.fire("Success", successMessage || "Saved", "success").then(() => {
                setSubmitted(false);
                dispatch(resetSuccessAction());
                onNext?.(4);
            });
        }
    }, [submitted, success]);

    useEffect(() => {
        if (reduxError) {
            Swal.fire("Error", reduxError, "error");
            dispatch(resetErrAction());
        }
    }, [reduxError]);

    if (!currentSurvey) {
        return <p>Loading...</p>;
    }

    return (
        <ThirdSurveyContent
            HandleSubmit={handleSubmitSurvey}
            SurveyChange={handleChanges}
            error={error}
            userInput={userInput}
            length={lengthValue}
            breadth={breadthValue}
        />
    );
}