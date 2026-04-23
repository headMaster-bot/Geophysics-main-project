import { useDispatch, useSelector } from "react-redux";
import search from "../../Backend Component/image/Search.png"
import { fetchDraftsAction } from "../../redux/slice/survey/surveySlice";
import { useEffect } from "react";

export default function MyProject({ projectData, handlePath, handleStatusUpdate }) {
    // dispatch
    const dispatch = useDispatch();
    // const { profile } = useSelector(state => state?.users)
    // const surveydata = profile?.message?.survey;
    const { drafts, loading } = useSelector((state) => state.surveys);
    console.log(drafts, "survey");

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

            <div className="grid grid-cols-3 gap-4">
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
                                    onClick={() => handlePath(project.linking)}
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