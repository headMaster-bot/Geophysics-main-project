import left from '../image/ChevronLeft.png';
import right from '../image/ChevronRight.png';

const ThirdSurveyContent = ({
    HandleSubmit,
    SurveyChange,
    error = {},
    userInput = {},   // ✅ prevents undefined crash
    length = '0',
    breadth = '0',
}) => {

    const constraints = [
        "power lines",
        "buried pipes",
        "protected area",
        "water bodies",
        "steep slopes",
        "private land"
    ];

    return (
        <form onSubmit={HandleSubmit}>
            <div className="w-full bg my-9 rounded-[10px] border pb-8 border-[#DADCE0] capitalize">

                {/* TITLE */}
                <div className="w-[917px] mx-auto py-4">
                    <p className="text-[20px] font-semibold">
                        Site Characterisation
                    </p>
                </div>

                <div className="flex gap-6 mx-auto w-[917px]">

                    {/* LEFT SIDE */}
                    <div className="w-[480px] border px-5 pb-6 rounded-[10px]">
                        <p className="py-6 font-semibold text-[20px]">
                            Data retrieve (GIS)
                        </p>

                            <div className="bg-gray-200 p-4 rounded mb-4">
                                <p>Length</p>
                                <h2>{length}</h2>
                            </div>

                            <div className="bg-gray-200 p-4 rounded">
                                <p>Breadth</p>
                                <h2>{breadth}</h2>
                            </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-[480px] p-4 border rounded-[10px] bg-[#D7D7D7]">

                        <p className="font-semibold text-[20px] py-4">
                            User Input
                        </p>

                        {/* Vegetation */}
                        <label>Vegetation Density *</label>
                        <p className="text-red-500">{error.veg}</p>
                        <select
                            name="vegetation"
                            value={userInput?.vegetation}
                            onChange={SurveyChange}
                            className="w-full border p-3 rounded-[10px] mb-4 "
                        >
                            <option value="">Select</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        {/* geological setting  */}
                        <label >Geological Setting *</label>
                        <p className="text-red-500">{error.geo}</p>
                        <select
                            name="geologicalSetting"
                            value={userInput?.geologicalSetting}
                            onChange={SurveyChange}
                            className="w-full border p-3 rounded-[10px] mb-4 capitalize"
                        >
                            <option value="">Select</option>
                            <option value="Nigeria Sedimentary Basin">Nigeria Sedimentary Basin</option>
                            <option value="Nigeria Basement Complex">Nigeria Basement Complex</option>
                            
                        </select>

                        {/* Depth */}
                        {/* <label>Target Depth Range (m) *</label>
                        <p className="text-red-500">{error.dept}</p> */}
                       
                       <div className="flex gap-2">
                            <div className='flex flex-col w-full'>
                                <label >Maximum Depth (m)</label>
                                <p className="text-red-500">{error.dept}</p>
                                <input type="text" name='maxDepth' value={userInput?.maxDepth} onChange={SurveyChange} placeholder='max-dept' className="rounded-[10px] w-full border p-3  mb-4" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label >Minimum Depth (m)</label>
                                <p className="text-red-500">{error.dept}</p>
                                <input type="text" name='minDepth' value={userInput?.minDepth} onChange={SurveyChange} placeholder='min-dept' className="rounded-[10px] w-full border p-3  mb-4" />
                            </div>
                       </div>
                    
                        {/* CHECKBOX */}
                        <label>Site Constraints *</label>
                        <p className="text-red-500">{error.check}</p>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {constraints.map((item) => (
                                <label key={item} className="flex gap-2 items-center">
                                    <input
                                        type="checkbox"
                                        name="checker"
                                        value={item}
                                        checked={userInput?.checker?.includes(item)}
                                        onChange={SurveyChange}
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>

                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-between px-6 py-8">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex gap-2 justify-center items-center w-[120px] py-[10px] px-[15px] rounded-[10px] bg-[#364153] text-white font-medium text-[14px]"
                    >
                        <img src={left} alt="" />
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex gap-2 justify-center items-center w-[120px] py-[10px] px-[15px] rounded-[10px] bg-[#364153] text-white font-medium text-[14px]"
                    >
                        Next
                        <img src={right} alt="" />
                    </button>
                </div>

            </div>
        </form>
    );
};

export default ThirdSurveyContent;