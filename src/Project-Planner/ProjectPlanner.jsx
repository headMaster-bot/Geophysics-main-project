import plusIcon from "../Backend Component/image/Plus.jpg";
import left from "../Backend Component/image/ChevronLeft.png";
import right from "../Backend Component/image/ChevronRight.png";
// import ProjectSaveDraftValidation from "./ProjectSaveDraftValidation";
import ProjectSaveDraftContent from "./ProjectSaveDraftContent";

export default function ProjectPlanner({
  error = {},
  HandleSubmit = () => {},
  handleChange = () => {},
  projectDetails = { projectName: "" },
  onSelectTeamMember = () => {},
  onAddTeamMember = () => {},
  onNext = () => {},
  handleSaveToDraft = () => {},
}) {
  return (
    <form onSubmit={HandleSubmit}>
      <div className="flex flex-col w-[967px] mt-[41px] px-12 gap-[22px]">

        {/* Save Draft Section */}
        <ProjectSaveDraftContent
          handleSaveToDraft={handleSaveToDraft}
        />

        {/* FORM BODY */}
        <div className="py-6 rounded-[10px] w-[917px] border border-[#DADCEO] shadow-sm">
          <div className="flex flex-col w-[768px] mx-auto gap-[16px]">

            <h2 className="text-[20px] font-semibold text-[#101828]">
              Project Setup
            </h2>

            {/* PROJECT NAME */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-medium">
                Project Name <span className="text-red-500">*</span>
              </label>

              <input
                name="projectName"
                className="w-full rounded-[10px] border border-[#DADCEO] py-4 px-[14px]"
                value={projectDetails?.projectName ?? ""}
                onChange={handleChange}
                placeholder="e.g, Lagos Survey Execution"
              />

              <p className="text-red-600">{error.projectName}</p>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-medium">
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                name="description"
                className="w-full px-[14px] py-3 rounded-[10px] border border-[#DADCEO] resize-none outline-none"
                placeholder="Provide a brief description of the project..."
                value={projectDetails?.description ?? ""}
                onChange={handleChange}
              />

              <p className="text-red-600">{error.description}</p>
            </div>

            {/* DATES */}
            <div className="grid grid-cols-2 gap-[16px]">

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium">
                  Start Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="startDate"
                  className="py-4 rounded-[10px] border border-[#DADCEO] px-2"
                  value={projectDetails?.startDate ?? ""}
                  onChange={handleChange}
                />

                <p className="text-red-600 text-sm">{error.startDate}</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium">
                  End Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="endDate"
                  className="py-4 rounded-[10px] border border-[#DADCEO] px-2"
                  value={projectDetails?.endDate ?? ""}
                  onChange={handleChange}
                />

                <p className="text-red-600 text-sm">{error.endDate}</p>
              </div>
            </div>

            {/* SPRINT */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-medium">
                Sprint Duration (days)
              </label>

              <input
                name="sprint"
                className="w-full py-4 rounded-[10px] border border-[#DADCEO] px-[16px]"
                placeholder="14"
                onChange={handleChange}
              />
            </div>

            {/* TEAM */}
            <div className="flex justify-between items-center">
              <label className="text-[14px] font-medium">
                Team Members
              </label>

              <button
                type="button"
                onClick={() => {
                  onAddTeamMember();
                  onNext(2);
                }}
                className="flex items-center gap-2 px-4 py-2 border rounded-[10px]"
              >
                <img src={plusIcon} alt="plus" className="w-[16px]" />
                Add Member
              </button>
            </div>

            {/* EMPTY STATE */}
            <div className="py-6 border rounded-[10px] flex flex-col items-center gap-4">
              <p className="text-[#6A7282]">
                No team member added yet
              </p>

              <button className="flex items-center gap-2 border px-4 py-2 rounded-[10px]">
                <img src={plusIcon} alt="plus" className="w-[16px]" />
                Add First Member
              </button>
            </div>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between w-[917px] py-8">

          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex gap-2 items-center border px-4 py-2 rounded-[10px]"
          >
            <img src={left} alt="back" />
            Cancel
          </button>

          <button
            type="submit"
            className="flex gap-2 items-center px-4 py-2 rounded-[10px] bg-[#364153] text-white"
          >
            Create Project
            <img src={right} alt="next" />
          </button>

        </div>
      </div>
    </form>
  );
}