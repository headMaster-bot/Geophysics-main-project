import { useDispatch, useSelector } from "react-redux";
import { fetchDraftAndCompleteAction } from "../../redux/slice/project/projectSlice";
import { fetchSurveyByStatusAction } from "../../redux/slice/survey/surveySlice";
import { useEffect } from "react";

const DashboardResentCard = ({ handleDataPath }) => {
    // dispatch
    const dispatch = useDispatch();

    const { completeProjects = [] } = useSelector((state) => state.projects);
    const { draftAndComplete } = useSelector((state) => state.surveys);

    console.log(completeProjects, "Project");
    console.log(draftAndComplete, "Survey");

    // combineData
    const combinedData = [
        ...(draftAndComplete || []),
        ...(completeProjects || [])
    ];
    // mappping combine data
    const DashData = combinedData.map((item) => ({
        id: item._id,
        type: item.type,
        status: item.status,

        title:
            item.type === "survey"
                ? item.surveyName
                : item.projectName,

        description:
            item.description ||
            item.survey?.description ||
            "No description available",
        objective:
            item.type === "survey"
                ? item.surveyObjective
                : "No",

        date:
            item.type === "survey"
                ? item.targetCompletionDate
                : item.startDate,

        buttonText:
            item.type === "survey"
                ? item.status === "draft"
                    ? "Open Survey Draft"
                    : "Open Survey"
                : item.status === "draft"
                    ? "Open Project Draft"
                    : "Open Project",
    }));

    useEffect(() => {
        dispatch(fetchDraftAndCompleteAction(["draft", "completed"]));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSurveyByStatusAction(["draft", "completed"]));
    }, [dispatch]);
    console.log("working");
    

    return (
        <div className="grid grid-cols-3 gap-4 my-4">
            {DashData.slice(0, 3).map((dashboardData) => (
                <div className="rounded-[10px] border px-[24px] pt-[24px] pb-[14px] border-[#DADCE0] font-instrument" key={dashboardData.id}>
                    <div className="flex justify-between items-center">
                        <div className="bg-[#ECECEC] rounded-[16px] py-2 px-3">{dashboardData.type}</div>
                        <div className="bg-[#ECECEC] rounded-[16px] py-2 px-3">{dashboardData.status}</div>

                    </div>
                    <div>
                        <div className="flex flex-col capitalize pt-4 pb-[24px]" >
                            <p className="font-instrument font-semibold text-[18px] leading-[28px] tracking-[-0.44px] text-[#101828]">{dashboardData.title}</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">{dashboardData.description}</p>
                            <div className="flex justify-between">
                                {/* <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">Objective</div>
                                <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">{dashboardData.objective}</div> */}
                                <div className="flex justify-between">
                                    {/* <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">Objective</div>
                                        <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">{item.objective}</div> */}
                                    {dashboardData.type === "survey" && (
                                        <div className="flex justify-between">
                                            <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">
                                                Objective
                                            </div>
                                            <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">
                                                {dashboardData.objective}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">Created</div>
                                {/* <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">{dashboardData.timeStamp}</div> */}
                                <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">
                                    {new Date(dashboardData.date).toLocaleString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        // hour: "2-digit",
                                        // minute: "2-digit",
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-[24px] items-center">
                        <button onClick={() => handleDataPath(dashboardData.linking)} className="w-full py-[7px] flex justify-center items-center bg-[#585858] rounded-[10px] font-instrument text-[#ffffff]">
                            {/* {dashboardData.buttonContent} */}
                            Open Project
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DashboardResentCard;