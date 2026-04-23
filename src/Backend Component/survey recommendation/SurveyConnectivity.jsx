import { useState } from "react";
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import SurveyContent from "./SurveyContent";

import number1 from "../image/num1.png";
import number2 from "../image/num2.png";
import number3 from "../image/num3.png";
import number4 from "../image/num4.png";
import number5 from "../image/num5.png";
import number6 from "../image/num6.png";
import range from "../image/range.png";

import { saveDraftAction } from "../../redux/slice/survey/surveySlice";

const SurveyConnectivity = ({ surveyId, setSurveyId }) => {
    const dispatch = useDispatch();

    // if (!surveyForm || Object.keys(surveyForm).length === 0) {
    //     return <p>Loading survey data...</p>;
    // }

    // ✅ FIXED: REMOVE LOCAL EMPTY STATE (this was your bug)
    // const [formData, setFormData] = useState({}); ❌ REMOVE THIS

    // const handleSaveToDraft = async () => {
    //     try {
    //         console.log("🧪 RAW SURVEY FORM:", surveyForm);

    //         // clean empty values
    //         const cleanData = Object.fromEntries(
    //             Object.entries(surveyForm).filter(
    //                 ([_, v]) => v !== "" && v !== null && v !== undefined
    //             )
    //         );

    //         // const payload = {
    //         //     ...cleanData,
    //         //     status: "draft",
    //         //     surveyId,
    //         // };

    //         const payload = {
    //             ...cleanData,
    //             status: "draft",
    //             ...(surveyId && { surveyId }) // ✅ important fix
    //         };

    //         console.log("📦 DRAFT PAYLOAD:", payload);

    //         const res = await dispatch(saveDraftAction(payload));

    //         console.log("📥 DRAFT RESPONSE:", res);

    //         if (res.payload?._id) {
    //             setSurveyId(res.payload._id); // prevents duplicates
    //         }

    //         Swal.fire({
    //             icon: "success",
    //             title: "Saved",
    //             text: "Draft saved successfully",
    //             timer: 1200,
    //             showConfirmButton: false,
    //         });
    //     } catch (error) {
    //         console.log("❌ SAVE DRAFT ERROR:", error);
    //     }
    // };

    const [surveyForm, setSurveyForm] = useState({
        // surveyName: "",
        // description: "",
        // surveyObjective: "",
        // latitude: "",
        // longitude: "",
        // vegetationDensity: "",
        // ambientNoise: "",
        // layoutPattern: "",
        // stationSpacing: "",
        // lineSpacing: "",
        // clientName: "",
        // clientEmail: "",
        // targetCompletionDate: "",
        // minDepth: "",
        // maxDepth: "",
        // geologicalSetting: "",
        // recommendedMethods: [],
    });

    // const handleSaveToDraft = async () => {
    //     try {
    //         console.log("🧪 SURVEY FORM:", surveyForm);

    //         if (!surveyForm || Object.keys(surveyForm).length === 0) {
    //             console.log("❌ surveyForm is empty or undefined");
    //             return;
    //         }

    //         const cleanData = Object.entries(surveyForm).reduce((acc, [key, value]) => {
    //             if (value !== "" && value !== null && value !== undefined) {
    //                 acc[key] = value;
    //             }
    //             return acc;
    //         }, {});

    //         const payload = {
    //             ...cleanData,
    //             status: "draft",
    //             ...(surveyId && { surveyId }),
    //         };

    //         const res = await dispatch(saveDraftAction(payload));

    //         const draft = res.payload?.data || res.payload;

    //         if (draft?._id) {
    //             setSurveyId(draft._id);
    //         }

    //         Swal.fire({
    //             icon: "success",
    //             title: "Saved",
    //             text: "Draft saved successfully",
    //             timer: 1200,
    //             showConfirmButton: false,
    //         });

    //     } catch (err) {
    //         console.log("❌ SAVE DRAFT ERROR:", err);
    //     }
    // };


    const handleSurveyChange = (e) => {
        const { name, value } = e.target;

        setSurveyForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveToDraft = async () => {
        try {
            console.log("🧪 SURVEY FORM:", surveyForm);

            const hasData = Object.values(surveyForm).some(
                (val) => val !== "" && val !== null && val !== undefined
            );

            if (!hasData) {
                console.log("❌ No form data to save");
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

            console.log("📦 FINAL PAYLOAD:", payload);

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
    const [survey] = useState([
        { id: 1, name: "project setup", range, photo: number1 },
        { id: 2, name: "survey area", range, photo: number2 },
        { id: 3, name: "site characterisation", range, photo: number3, paddingBottom: "2px" },
        { id: 4, name: "method recommendation", range, photo: number4, paddingBottom: "2px" },
        { id: 5, name: "survey design", range, photo: number5 },
        { id: 6, name: "review and report", range, photo: number6 },
    ]);

    return (
        <div className="pey-12">
            {/* <SurveyContent
                title="survey recommendation"
                survey={survey}
            handleSaveToDraft={handleSaveToDraft}
            /> */}

            {/* <SurveyContent
                title={title}
                survey={content}
                handleSaveToDraft={handleSaveToDraft}
            /> */}

            {/* <SurveyContent
                title="survey recommendation"
                survey={survey}
                handleSaveToDraft={handleSaveToDraft}
            /> */}
        </div>
    );
};

export default SurveyConnectivity;