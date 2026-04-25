import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { completeSurveyAction } from "../../redux/slice/survey/surveySlice";
import { useParams } from "react-router-dom";

const SixSurveyContent = ({
  selectedMethod,
  projectName,
  clientName,
  projectObjective,
  clientEmail,
  primaryMethod = null,
  methods = [],
  onNext,
  handleNavigateToProjectPlan
}) => {
  // dispatch
  const dispatch = useDispatch();
  const { recommendedMethods } = useSelector((state) => state.surveys);
  const {id} = useParams()

  console.log("=== SixSurveyContent Debug ===");
  console.log("Props methods:", methods);
  console.log("Redux recommendedMethods:", recommendedMethods);

  // ✅ SAFE NORMALIZER
  const normalizeMethods = (data) => {
    if (!Array.isArray(data)) return [];

    return data
      .filter(Boolean)
      .map((item, index) => ({
        id: item?.id ?? index,
        name: item?.name || item?.method || "Unknown Method",
        details: item?.details || "Recommended based on survey input",
      }));
  };

  const defaultMethods = [];

  const normalizedRecommended = normalizeMethods(recommendedMethods);
  const normalizedPropsMethods = normalizeMethods(methods);

  const displayMethods =
    normalizedPropsMethods.length > 0
      ? normalizedPropsMethods
      : normalizedRecommended.length > 0
        ? normalizedRecommended
        : defaultMethods;

  // ✅ SAFE PRIMARY METHOD
  const primary =
    primaryMethod ??
    displayMethods?.[0] ?? {
      name: "No recommendation",
      details: "",
    };

  // ✅ SAFE NEXT HANDLER
  // const handleNext = () => {
  //   if (onNext) {
  //     onNext(primary?.name); // always safe
  //   }
  // };

  const handleCompleteProject = async (id) => {
    console.log("complete button");

    try {
      const res = await dispatch(completeSurveyAction(id)).unwrap();
      console.log(res, "response complete");

      Swal.fire({
        icon: "success",
        title: res.message || "Project completed",
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err?.message || "Failed",
      });
    }
  };

  return (
    <div className="w-[967px] my-6 mx-auto border border-[#D7D7D7] rounded-[10px]">
      <div className="w-[917px] text-[#101828] mx-auto">

        {/* HEADER */}
        <p className="font-semibold text-[20px] pt-[14px] pb-[10px]">
          Survey Area Definition
        </p>

        {/* PROJECT INFO */}
        <div className="bg-[#ffffff] px-3 pb-8">
          <p className="font-semibold text-[22px] py-6">
            Project Information
          </p>

          <div className="flex">
            <div className="w-1/2">
              <p>Project Name</p>
              <p className="font-bold">{projectName}</p>
            </div>

            <div className="w-1/2">
              <p>Client Name</p>
              <p className="font-bold">{clientName}</p>
            </div>
          </div>

          <div className="flex mt-4">
            <div className="w-1/2">
              <p>Project Objective</p>
              <p className="font-bold">{projectObjective}</p>
            </div>

            <div className="w-1/2">
              <p>Client Email</p>
              <p className="font-bold">{clientEmail}</p>
            </div>
          </div>
        </div>

        {/* RECOMMENDATION */}
        <div className="bg-[#ffffff] px-3 pb-8 mt-8">
          <p className="font-semibold text-[22px] py-6">
            Recommended Method
          </p>

          <div className="bg-[#F9F9F9] py-10 flex justify-center">
            <p className="font-bold text-[18px]">
              {selectedMethod || primary?.name || "No recommendation"}
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 px-6 py-8">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-[120px] py-[10px] rounded-[10px] bg-[#364153] text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            // onClick={() => handleNavigateToProjectPlan()}
            onClick={() => handleCompleteProject(id)}
            className="py-[10px] px-[15px] rounded-[10px] bg-[#364153] text-white"
          >
            Create Project Planner
          </button>
        </div>

      </div>
    </div>
  );
};

export default SixSurveyContent;