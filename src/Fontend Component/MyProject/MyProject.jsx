import { useDispatch, useSelector } from "react-redux";
import search from "../../Backend Component/image/Search.png"
import { fetchCompleteAction, fetchDraftsAction, fetchSurveyByStatusAction } from "../../redux/slice/survey/surveySlice";
import { useEffect } from "react";
import { fetchProjectCompletesAction, fetchProjectDraftsAction } from "../../redux/slice/project/projectSlice";

export default function MyProject({ handleOpenDraft, handleStatusUpdate, surveyId, handleOpenPlannerDraft }) {
    // dispatch
    const dispatch = useDispatch();
    // const { profile } = useSelector(state => state?.users)
    // const surveydata = profile?.message?.survey;
    // const { drafts, loading } = useSelector((state) => state.surveys);
    // const { projectDrafts, loadingProject } = useSelector((state) => state?.projects);

    const { drafts = [], loading } = useSelector((state) => state.surveys);
    const { projectDrafts = [], loadingProject } = useSelector((state) => state.projects);
    // complete project
    const { completeProjects} = useSelector((state) => state.projects);
    const { surveys} = useSelector((state) => state.surveys);

    console.log(completeProjects, "Project");
    console.log(surveys, "Survey");
    // console.log(drafts?.data, "CHECK THIS");

    // combineData
    const combinedData = [
        ...(drafts || []),
        ...(projectDrafts || [])
    ];
    // mappping combine data
    const projectData = combinedData.map((item) => ({
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
    // console.log(drafts, "survey");
    useEffect(() => {
        dispatch(fetchProjectDraftsAction());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchDraftsAction());
    }, [dispatch]);
    return (
        <div className=" flex-1 flex flex-col w-[967px] gap-[8px] mx-auto pb-4">
            {/* Title */}
            <div className="flex flex-col max-w-[967px] gap-[8px]">
                <div className="flex h-[36px] pt-[15px]">
                    <h1 className="font-instrument font-bold text-[30px] leading-[36px] tracking-[0.4px] text-[#101828]">
                        My Project
                    </h1>
                </div>
                <div className="max-w-[967px] h-[24px] mt-[8px]">
                    <p className="font-instrument font-normal text-base pt-[10px] leading-[24px] tracking-[-0.31px] text-[#4A5565]">
                        Manage all your survey and project plans
                    </p>
                </div>
            </div>

            {/* Search + Filters */}
            <div className="flex max-w-full justify-between mt-[18px] items-center h-[68px] border border-[#DADCE0] rounded-[10px] px-[24px] py-[8px] bg-white">
                {/* Search Input */}
                <div className="relative w-[850px] h-[42px]">
                    <img
                        src={search}
                        alt="search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                    />
                    <input
                        placeholder="Search Project..."
                        className="w-full h-full pl-[40px] pr-[16px] py-[8px] rounded-[10px] border outline-none"
                    />
                </div>

                {/* Select Buttons */}
                <div className="flex gap-[12px]">
                    <select className="w-[149px] h-[42px] rounded-[10px] border pl-[17px] text-[#0A0A0A]">
                        <option>All types</option>
                    </select>
                    <select className="w-[149px] h-[42px] rounded-[10px] border pl-[17px] text-[#0A0A0A] ">
                        <option className="text-[#0A0A0A]">Status</option>
                    </select>
                </div>
            </div>

            <div className="md:container font-instrument w-[147px] h-[20px] mt-[8px] font-normal text-[14px] leading-[14px] tracking-[-0.15px] text-[#4A5565]">
                <p>Showing 4 of 4 projects</p>
            </div>

            {/* <div className="grid grid-cols-3 gap-4">
                {loading ? (
                    <p>Loading drafts...</p>
                ) : (
                    (drafts || []).map((project) => (
                        <div className="rounded-[10px] border px-[24px] pt-[24px] pb-[14px] border-[#DADCE0] font-instrument" key={project.id}>
                            <div className="flex justify-between items-center">
                                <div className="bg-[#ECECEC] rounded-[16px] py-2 px-3">{project.status}</div>
                                <div className="bg-[#ECECEC] rounded-[16px] py-2 px-3">{project.action}</div>

                            </div>
                            <div>
                                <div className="flex flex-col capitalize pt-4 pb-[24px]" >
                                    <p className="font-instrument font-semibold text-[18px] leading-[28px] tracking-[-0.44px] text-[#101828]">{project.surveyName}</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <p className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">{project.description}</p>
                                    <div className="flex justify-between">
                                        <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">Objective</div>
                                        <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">{project.surveyObjective}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">Created</div>
                                        <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">{project.targetCompletionDate}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex mt-[24px] items-center">
                                <button
                                    // onClick={ handlePath}
                                    onClick={() => handleOpenDraft(project._id)}
                                    className="w-full py-[7px] flex justify-center items-center bg-[#585858] rounded-[10px] font-instrument text-[#ffffff]">
                                    Open Project
                                </button>
                            </div>
                        </div>
                    ))
                )}
            
            </div> */}

            {/* <h1>Project Drafts</h1> */}
            <div className="grid grid-cols-3 gap-4">
                {loading ? (
                    <p>Loading drafts...</p>
                ) : (
                    (projectData || []).map((item) => (
                        <div className="rounded-[10px] border px-[24px] pt-[24px] pb-[14px] border-[#DADCE0] font-instrument" key={item.id}>
                            <div className="flex justify-between items-center">
                                <div className="bg-[#ECECEC] rounded-[16px] py-2 px-3">{item.type}</div>
                                <div className="bg-[#ECECEC] rounded-[16px] py-2 px-3">{item.status}</div>

                            </div>
                            <div>
                                <div className="flex flex-col capitalize pt-4 pb-[24px]" >
                                    <p className="font-instrument font-semibold text-[18px] leading-[28px] tracking-[-0.44px] text-[#101828]">{item.title}</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <p className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">{item.description}</p>
                                    <div className="flex justify-between">
                                        {/* <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">Objective</div>
                                        <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">{item.objective}</div> */}
                                        {item.type === "survey" && (
                                            <div className="flex justify-between">
                                                <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">
                                                    Objective
                                                </div>
                                                <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">
                                                    {item.objective}
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                    <div className="flex justify-between">
                                        <div className="font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px] text-[#4A5565]">Created</div>
                                        <div className="font-instrument font-bold text-[14px] leading-[20px] tracking-[-0.15px] text-[#101828]">
                                            {new Date(item.date).toLocaleString("en-GB", {
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
                                <button
                                    // onClick={ handlePath}
                                    // onClick={() => handleOpenPlannerDraft(item._id)}
                                    onClick={() => handleOpenDraft(item.id, item.type, item.status)}
                                    className="w-full py-[7px] flex justify-center items-center bg-[#585858] rounded-[10px] font-instrument text-[#ffffff]">
                                    Open Project
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}