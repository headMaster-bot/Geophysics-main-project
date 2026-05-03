import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoriesByEpicIdAction } from "../../redux/slice/story/storySlice";

const UseStoryTable = ({ epicId }) => {
  const dispatch = useDispatch();
  const { storiesByEpic } = useSelector((state) => state.stories);

  console.log("EPIC ID:", epicId);
  console.log("STORIES:", storiesByEpic);

  useEffect(() => {
    if (epicId) {
      dispatch(fetchStoriesByEpicIdAction(epicId));
    }
  }, [dispatch, epicId]);

  // const stories = storiesByEpic?.[epicId] || [];
  const stories = storiesByEpic?.[String(epicId)] || [];

  console.log(storiesByEpic);
  console.log("CURRENT EPIC:", String(epicId));

  return (
    <div className="px-6">
      <table className="w-full border border-[#DADCE0] rounded-[10px] font-instrument mb-5">

        <thead>
          <tr className="border-b border-[#DADCE0]">
            <th className="border-r">S/N</th>
            <th className="border-r">Title</th>
            <th className="border-r">Description</th>
            <th className="border-r">Status</th>
            <th className="border-r">Point</th>
            <th>Priority</th>
          </tr>
        </thead>

        <tbody>
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <tr key={story._id} className="border">
                <td className="text-center border-r">{index + 1}</td>
                <td className="text-center border-r">{story?.title}</td>
                <td className="text-center border-r">{story?.description}</td>
                <td className="text-center border-r">{story?.status}</td>
                <td className="text-center border-r">{story?.points}</td>
                <td className="text-center">{story?.priority}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No stories found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default UseStoryTable;