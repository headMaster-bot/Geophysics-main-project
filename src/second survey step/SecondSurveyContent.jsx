import React from 'react'
import save from "../Backend Component/image/Save.png"
import right from "../Backend Component/image/ChevronRight.png";
import left from "../Backend Component/image/ChevronLeft.png";

export default function SecondSurveyContent({
  title,
  survey,
  error,
  SecondTitle,
  secondSurveyForm = {},   // ✅ DEFAULT VALUE FIX
  handleSubmit,
  handleSecondSurveyChange,
  isLoading = false
}) {
  return (
    <form className='w-[967px] mx-auto ' onSubmit={handleSubmit}>

        <div className="flex">
            {/* <div className="w-full flex justify-between items-center ">
                <div className="w-[456px] text-[#364153] py-10">
                    <h1 class="font-bold w-[370px] text-[30px] leading-[36px] tracking-[0.4px] capitalize ">{title}</h1>
                    <p className="w-[72px]">Step 1 of 6</p>
                </div>
                <div className="w-[159px]">
                    <button type="button" className="rounded-[10px] border-[2px] border-[#DADCE0] w-[#ffffff]">
                        <div className="flex gap-4 p-4">
                            <img src={save} alt="Save" className="w-[16px]" />
                            <p class="font-medium text-[16px] leading-6 tracking-[-0.31px] text-center w-[94px] text-[#364153]">Save as Draft</p>
                        </div>

                    </button>
                </div>
            </div> */}
            {/* <div className="flex w-[967px] bg-yellow-600 items-center rounded-[10px] border-[1px] border-[#DADCE0] py-[10px]">
                {survey.map(item => (
                
                    <div className=" py-5" style={{paddingTop: item.paddingTop, paddingBottom: item.paddingBottom}} id={item.id}>
                        <div className="rounded-full justify-center w-[159px] flex items-center space-x-4 py-4">
                            <div>
                                <img src={item.photo} alt={item.name} className="w-[50px]" />
                            </div>
                            <div>
                                {item.id !== 6 && (<img src={item.range} alt="range" className="w-[70px]" />)}
                            </div>    
                        </div>
                        <div>

                        <p className="w-[98px] font-medium text-[12px] leading-4 tracking-normal text-center pt-10">{item.name}</p>
                        </div>
                    </div>
                ))}
            </div> */}

            <div className=' pb-8'>
                <div className="w-full">
                    <p className=" capitalize w-full font-instrument font-semibold text-[20px] leading-[28px] tracking-[-0.45px]">{SecondTitle}</p>
                </div>

                <div className=' my-12 border rounded-md'>
                    <div className="mx-auto w-[917px] py-10">
                        <label className="uppercase font-medium text-[14px] text-[#364153]">
                        latitude of survey area *
                        </label>

                        <input
                            type="number" value={secondSurveyForm?.latitude || ""} onChange={handleSecondSurveyChange} name="latitude" placeholder='length of survey area(000 mm) '
                            className="w-full rounded-[10px]  border border-[#DADCE0] py-[10px] px-[15px] mt-2 focus:outline-none focus:ring-2 focus:ring-[#DADCE0]"
                        />
                        <p className="text-red-500 text-[12px]">
                          {error.latName}
                        </p>
                    </div>

                    <div className="mx-auto w-[917px] py-10">
                        <label className=" uppercase font-medium text-[14px] text-[#364153]">
                        longitude of survey area *
                        </label>

                        <input
                            type="number" onChange={handleSecondSurveyChange} value={secondSurveyForm?.longitude || ""} name="longitude" placeholder='breath of survey area(000 mm) '
                            className="w-full rounded-[10px] border border-[#DADCE0] py-[10px] px-[15px] mt-2 focus:outline-none focus:ring-2 focus:ring-[#DADCE0]"
                        />
                        <p className="text-red-500 text-[12px]">
                           {error.longName}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between py-8">
            
                    <button  type="button"
                        onClick={() => window.history.back()} className="flex gap-2 items-center justify-center w-[120px] py-[10px] px-[15px] rounded-[10px] border border-[#DADCE0] text-[#364153] font-medium text-[14px]">
                        <img src={left} alt="" />
                        Cancel
                    </button>
            
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`flex gap-2 justify-center items-center w-[120px] py-[10px] px-[15px] rounded-[10px] font-medium text-[14px] ${
                          isLoading 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-[#364153] text-white'
                        }`}
                    >
                        {isLoading ? 'Loading...' : 'Next'}
                        <img src={right} alt="" />
                    </button>
            
                </div>
            </div>

        </div>
    </form>
)
}
