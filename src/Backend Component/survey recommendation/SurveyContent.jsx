import save from "../image/Save.png"

const SurveyContent = ({ title, survey, handleSaveToDraft }) => {
    return ( 
        <>
        <div clasdsName="flex">
            <div className="w-full flex justify-between items-center ">
                <div className="w-[456px] text-[#364153] pb-10">
                    <h1 class="font-bold w-[370px] text-[30px] leading-[36px] tracking-[0.4px] capitalize ">{title}</h1>
                    <p className="w-[72px] py-4">Step 1 of 6</p>
                </div>
                <div className="w-[159px]">
                    <button type="button" className="rounded-[10px] border-[2px] border-[#DADCE0] w-[#ffffff]"
                     onClick={handleSaveToDraft}
                     >
                        <div className="flex gap-4 p-4">
                            <img src={save} alt="Save" className="w-[16px]" />
                            <p class="font-medium text-[16px] leading-6 tracking-[-0.31px] text-center w-[94px] text-[#364153]">Save as Draft</p>
                        </div>

                    </button>
                </div>
            </div>
            <div className="flex w-[967px] items-center rounded-[10px] px-[25px] border-[1px] border-[#DADCE0] py-[10px]">
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
            </div>
        </div>
      
        </>
     );
}
 
export default SurveyContent;