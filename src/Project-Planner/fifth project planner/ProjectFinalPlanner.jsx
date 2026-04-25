import save from "../../Backend Component/image/Save.png";
import frame from "../../Backend Component/image/Frame.png";
import basil from '../../Backend Component/image/basil_document-solid.png';
import archive from '../../Backend Component/image/archive.png';
import star from '../../Backend Component/image/Star 1.png';
import left from '../../Backend Component/image/ChevronLeft.png';
import right from '../../Backend Component/image/ChevronRight.png';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import { completeProjectAction } from "../../redux/slice/project/projectSlice";



const ProjectFinalPlanner = () => {
    // dispatch and selector
    const dispatch = useDispatch();
    const { id } = useParams();
    const { profile } = useSelector((state) => state.users);
    const backToDashboard = useNavigate()
    const handleBackToDashboard = () => {
        backToDashboard('/dashboard')
    }

    // logic

    const handleCompleteProject = async (id) => {
        console.log("complete button");

        try {
            const res = await dispatch(completeProjectAction(id)).unwrap();
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
        // <form>
        <div className=" flex flex-col w-[967px]  mt-[41px] px-12  gap-[22px]">
            <div className="flex w-[917px]  justify-between">
                <div className="flex flex-col gap-[4px] w-[314px] font-instrument font-bold text-[30px] leading-[36px] tracking-[0.4] text-[#101828]">
                    <h1 className="">Agile Project Planner</h1>
                    <p className="w-[72px] mt-[0.5px] font-instrument font-normal text-[16px] leading-[24px] tracking-[-0.31px] text-[#4A5565]">Step 1 of 3</p>
                </div>
                <div className="relative w-[158px] rounded-[10px] border-[2px] border-[#DADCEO] flex gap-2 items-center justify-center">
                    <img src={save}
                        alt="save"
                        className="absolute left-[18px]  top-1/2 -translate-y-1/2 w-[16px] h-[16px]"
                    />
                    <button className="ml-[44px] font-instrument font-medium text-[16px] leading-[24px] tracking-[-0.31px]">
                        Save as Draft
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-[917px] rounded-[10px] border py-[28px] text-[#FFFFFF] border-[#DADCEO] ">
                <div className="flex items-center">
                    <div className="flex w-[306px]  mt-3">
                        <div className="md:container flex flex-col  gap-[8px] items-center justify-ce nter">
                            <div className="container flex w-[60px] text-[18px] h-[60px] rounded-[16777200px] bg-[#585858] items-center justify-center">
                                <h1 >1</h1>
                            </div>
                            <span className="mt-[1px] ml-[1px] font-instrument font-medium text-[12px] leading-[16px] tracking-[0px] text-[#585858]">
                                Project Setup
                            </span>
                        </div>
                        <div className="w-[345px] h-[4px] mt-[18px] bg-[#E5E7EB] ">

                        </div>
                    </div>


                    <div className="flex min-w-[306px]  mt-3">
                        <div className="md:container flex flex-col  items-center justwify-center">
                            <div className="container flex w-[60px] text-[18px] h-[60px] rounded-[16777200px] bg-[#585858] items-center justify-center">
                                <h1 >2</h1>
                            </div>
                            <span className="mt-[1px] ml-[1px] font-instrument font-medium text-[12px] leading-[16px] tracking-[0px] text-[#585858]">
                                Project Management
                            </span>
                        </div>
                        <div className="w-[345px] h-[4px] mt-[18px] bg-[#E5E7EB] ">

                        </div>
                    </div>


                    <div className="flex min-w-[306px]  mx-4 mt-3 ">
                        <div className="md:container flex flex-col  gap-[8px] items-center justify-center">
                            <div className="container flex w-[60px] text-[18px] h-[60px] rounded-[16777200px] bg-[#585858] items-center justify-center">
                                <h1 >3</h1>
                            </div>
                            <span className="mt-[1px] ml-[1px] font-instrument font-medium text-[12px] leading-[16px] tracking-[0px] text-[#585858]">
                                Completion
                            </span>
                        </div>



                    </div>
                </div>
            </div>

            <div className="rounded-[10px] w-[917px]   border border-[#DADCEO] ">
                <div className=" w-[900px] my-8 mx-auto px- flex space-x-6 justicfy-between">
                    <div className="flex flex-col w-[480px] mx-auto">
                        <div className="w-[480px] rounded-[10px] bg-[#F9FAFB]  py-12">
                            <div className="w-[424px] mx-auto flex flex-col">
                                <div className="flex justify-center items-center">
                                    <img src={frame} alt="frame" className="w-[80px]" />

                                </div>
                                <div className="flex flex-col ">
                                    <div className="pb-8 flex flex-col justify-center text-center w-[378px] items-center">
                                        <p className="text-[#101828] font-instrument font-bold text-[30px] leading-[36px] tracking-[0.4px]">Project Plan Finalized</p>
                                        <p className="text-[#101828] font-instrument font-normal text-[15px] leading-[26px] tracking-[0.4px]">Your Agile program plan is ready for execution
                                            You can now track progress on the board an sprint
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 my-2">
                                        <div>
                                            <button className="flex py-[12px] px-8 items-center rounded-[4px] border bg-[#FFFFFF] border-[#EBEBEB] justify-center font-instrument font-normal text-[16px] leading-[24px] tracking-[-0.31px]">
                                                <img src={basil} alt="" className="pr-4" />
                                                <p className="text-[#101828]">Export Plan (PDF)</p>
                                            </button>
                                        </div>

                                        <div>
                                            <button className="flex  py-[12px] px-8 items-center rounded-[4px] bg-[#FFFFFF] border border-[#EBEBEB] justify-center font-instrument font-normal text-[16px] leading-[24px] tracking-[-0.31px]">
                                                <img src={archive} alt="" className="pr-4" />
                                                <p className="text-[#101828]">archive survey</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="bg-[#F9FAFB] rounded-[10px] border px-10 border-[#D8D8D8] my-6">
                            <p className="text-[#101828] font-instrument font-semibold text-[18px] py-4 leading-[28px] tracking-[-0.44px]">Key Metrics</p>
                            <div className="w-[420px] flex gap-4 mx-sauto items-cxenter ">
                                <div className="w-[315px] py-6 border-[#D8D8D8] rounded-[10px] px-12 border bg-[#F2F2F2] flex flex-col">
                                    <p className="text-[#4A5565] font-instrument font-normal text-[14x] leading-[28px] tracking-[-0.44px]"> Total Stories</p>
                                    <p className="text-[#101828] font-instrument font-bold text-[28px] leading-[28px] tracking-[-0.44px]">{profile?.message?.storyCount || 0}</p>
                                </div>
                                <div className="w-[315px] py-6 border-[#D8D8D8] border rounded-[10px] px-12 bg-[#F2F2F2] flex flex-col ">
                                    <p className="text-[#4A5565] font-instrument font-normal text-[14x] leading-[28px] tracking-[-0.44px]"> Total Points</p>
                                    <p className="text-[#101828] font-instrument font-bold text-[28px] leading-[28px] tracking-[-0.44px]">{profile?.message?.totalPoints || 0}</p>
                                </div>
                            </div>
                            <div className="my-6 py-6 border-[#D8D8D8] border rounded-[10px] px-12 bg-[#F2F2F2] flex flex-col ">
                                <p className="text-[#4A5565] font-instrument font-normal text-[14x] leading-[28px] tracking-[-0.44px]"> Duration</p>
                                <p className="text-[#101828] font-instrument font-bold text-[28px] leading-[28px] tracking-[-0.44px]">{profile?.message?.totalProjectDuration || '6weeks'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[409px] rounded-[10px] bg-[#F9FAFB] py-[16px] pl-10 pr-4 flex flex-col">
                        <p className="text-[#101828]  font-instrument font-semibold text-[18px] leading-[28px] tracking-[-0.44px]">Project Retrospective</p>
                        <div className="my-6">
                            <div className="w-[348px] text-[#364153]">
                                <p className=" font-instrument font-normal text-[16px] leading-[28px] tracking-[-0.44px] ">What went well?</p>
                                <textarea col={3} placeholder="note" rows={4} className=" w-full py-5  text-[16px] rounded-[10px] px-3 border border-[#DADCE0] font-instrument font-normal leading-[28px] tracking-[-0.44px]" />

                            </div>

                            <div className="w-c[409px] rounded-[10px] bg-[#F9FAFB] py-[16px]  flex flex-col">

                                <div className="w-[348px] text-[#364153]">
                                    <p className="text-[#101828] pb- font-instrument font-semibold text-[18px] leading-[28px] tracking-[-0.44px]">Area of improvement</p>
                                    <textarea col={3} placeholder="note" rows={4} className=" w-full py-5  text-[16px] rounded-[10px] px-3 border border-[#DADCE0] font-instrument font-normal leading-[28px] tracking-[-0.44px]" />

                                </div>
                            </div>
                            <div className="flex items-center">
                                <img src={star} alt="star" className="w-[38px] mr-2" />
                                <img src={star} alt="star" className="w-[38px] mr-2 " />
                                <img src={star} alt="star" className="w-[38px] mr-2" />
                                <img src={star} alt="star" className="w-[38px] mr-2" />
                                <img src={star} alt="star" className="w-[38px]" />
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div className="flex justify-between px-6 py-8">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex gap-2 border-2 justify-center items-center w-[120px] py-[10px] px-[15px] rounded-[10px] text-[#364153] font-medium text-[14px]"
                >
                    <img src={left} alt="" />
                    Cancel
                </button>

                <button
                    type="submit"
                    // onClick={(id) => handleCompleteProject(id)}
                    onClick={() => handleCompleteProject(id)}
                    className="flex capitalize gap-2 justify-center items-center  py-[10px] px-[15px] rounded-[10px] bg-[#364153] text-white font-medium text-[14px]"
                >
                    Back to dashboard
                    <img src={right} alt="" />
                </button>
            </div>
        </div>
    )
}

export default ProjectFinalPlanner;