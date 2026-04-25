import save from "../Backend Component/image/Save.png";
const ProjectSaveDraftContent = ({ handleSaveToDraft }) => {
    return ( 
        <>
         <div className="flex w-[917px] justify-between">
                  <div className="flex flex-col w-[314px] font-instrument font-bold text-[30px] text-[#101828]">
                    <h1>Agile Project Planner</h1>
                    <p className="font-normal text-[16px] text-[#4A5565]">
                      Step 1 of 3
                    </p>
                  </div>
        
                  <div className="px-4 rounded-[10px] border-2 border-[#DADCEO] flex gap-2 items-center">
                    <img src={save} alt="save" />
                    <button type="button" onClick={ handleSaveToDraft} className="front-instrument font-medium text-[16px]">
                      Save as Draft
                    </button>
                  </div>
                </div>
         <div className="flex flex-col w-[917px] rounded-[10px] border py-[28px] border-[#DADCEO]">
          <div className="flex w-full justify-between px-4">
            
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className="flex w-[60px] h-[60px] rounded-full bg-[#585858] items-center justify-center text-white">
                  {step}
                </div>
                <span className="text-[12px] text-[#585858] mt-2">
                  {step === 1 && "Project Setup"}
                  {step === 2 && "Project Management"}
                  {step === 3 && "Completion"}
                </span>
              </div>
            ))}

          </div>
        </div>
        </>
     );
}
 
export default ProjectSaveDraftContent;