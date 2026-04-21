const UseStoryModal = ({
  closeUserStoryModal,
  handlingSubmitStory,
  userInput,
  change,
  error,
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
      onSubmit={handlingSubmitStory}
        
        className=" font-instrument w-[600px] p-[24px] bg-white border rounded-[10px] relative"
      >
        {/* TITLE */}
        <div className="w-[400px] mb-4">
          <p className="text-[#101828] font-semibold text-[24px]">
            Add User Story
          </p>
        </div>

        {/* TITLE INPUT */}
        <div className="flex flex-col pt-[18px] pb-[12px]">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={userInput.title}
            onChange={change}
            className="border p-3 rounded"
          />
          <p className="text-red-600">{error.titleError}</p>
        </div>

        {/* PRIORITY + POINT */}
        <div className="flex gap-4">
          <div className="w-1/2 flex flex-col">
            <label>Priority</label>
            <select
              name="priority"
              value={userInput.priority}
              onChange={change}
              className="border p-3 rounded"
            >
              <option value="">Select priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <p className="text-red-600">{error.priorityError} </p>
          </div>

          <div className="w-1/2 flex flex-col">
            <label>Point</label>
            <input
              type="text"
              name="points"
              value={userInput.points}
              onChange={change}
              className="border p-3 rounded"
            />
            <p className="text-red-600">{error.pointError}</p>
          </div>
        </div>

        {/* ASSIGN */}
        {/* <div className="flex flex-col pt-[18px] pb-[12px]">
          <label>Assign</label>
          <input
            type="text"
            name="assigned"
            value={userInput.assigned}
            onChange={change}
            className="border p-3 rounded"
          />
          <p className="text-red-600">{error.assignError}</p>
        </div> */}

        {/* DESCRIPTION */}
        <div className="flex flex-col pt-[18px] pb-[12px]">
          <label>Description</label>
          <textarea
            name="description"
            value={userInput.description}
            onChange={change}
            className="border p-3 rounded"
          />
          <p className="text-red-600">{error.descriptionError}</p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={closeUserStoryModal}
            className="px-4 py-2 border rounded-[10px] border-[#DADCE0] text-[#585858]"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handlingSubmitStory}
            className="rounded-[10px] px-4 py-2 bg-[#585858]  text-white"
          >
            Add Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default UseStoryModal;