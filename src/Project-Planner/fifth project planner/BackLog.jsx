import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpicsAction } from "../../redux/slice/epic/epicSlice";
import { fetchStoriesByEpicIdAction } from "../../redux/slice/story/storySlice";

import Right from "../../Backend Component/image/Vector.png";
import down from "../../Backend Component/image/ChevronDown.png";

import BackLogContent from "./BackLogContent";

const BackLog = ({ currentProjectId, openModal }) => {
  const dispatch = useDispatch();

  // get data from store
  const { epics } = useSelector((state) => state.epics);
  const { storiesByEpic } = useSelector((state) => state.stories);
  const { profile } = useSelector((state) => state.users);

  // PROJECTS
  const projects = profile?.message?.projects || [];

  console.log(projects.map(project => project.projectName));

  // const lastProjectName =
  //   projects.length > 0
  //     ? projects[projects.length - 1]?.projectName
  //     : "Unknown Project";

  const lastProjectName =
  projects.length > 0
    ? projects[0]?.projectName
    : "Unknown Project";

console.log(lastProjectName);
console.log(lastProjectName, "last project");

  // TOGGLE STATE
  const [toggledEpics, setToggledEpics] = useState({});

  // TOGGLE EPIC STORIES
  const toggling = (epicId) => {
    setToggledEpics((prev) => ({
      ...prev,
      [epicId]: !prev[epicId],
    }));
  };

  // FETCH EPICS
  useEffect(() => {
    if (currentProjectId) {
      dispatch(fetchEpicsAction(currentProjectId));
    }
  }, [dispatch, currentProjectId]);

  // FILTER EPICS
  const currentProjectEpics = (epics || []).filter((epic) => {
    if (!epic?.project || !currentProjectId) return false;

    const epicProjectId =
      typeof epic.project === "object"
        ? epic.project._id
        : epic.project;

    return String(epicProjectId) === String(currentProjectId);
  });

  // FETCH STORIES FOR EACH EPIC
  useEffect(() => {
    currentProjectEpics.forEach((epic) => {
      dispatch(fetchStoriesByEpicIdAction(epic._id));
    });
  }, [dispatch, currentProjectEpics]);

  return (
    <div>
      {/* ================= BACKLOG CONTAINER ================= */}
      <div className="border mx-8 border-[#DADCE0] rounded-[10px]">
        {currentProjectEpics.length === 0 ? (
          <div className="p-4 text-center">
            <p>No epics found for this project</p>
          </div>
        ) : (
          <div className="mb-4">
            {/* ================= PROJECT HEADER ================= */}
            <div className="px-4 py-2 bg-[#F9FAFB] border-b border-[#DADCE0]">
              <p className="text-[#364153] font-instrument font-semibold text-[16px] leading-[24px] tracking-[-0.31px]">
                {lastProjectName} (Current)
              </p>
            </div>

            {/* ================= EPIC LIST ================= */}
            {currentProjectEpics.map((epic) => {
              const totalStories =
                storiesByEpic?.[String(epic._id)]?.length || 0;

              return (
                <div key={epic._id}>
                  {/* ================= EPIC HEADER ================= */}
                  <div className="px-4 justify-between border items-center rounded-[10px] border-[#DADCE0] bg-[#F9FAFB] flex gap-4 py-2">
                    
                    {/* LEFT SIDE */}
                    <div className="flex">
                      {/* TOGGLE ICON */}
                      <div className="w-[30px] flex justify-center items-center">
                        <img
                          src={toggledEpics[epic._id] ? down : Right}
                          onClick={() => toggling(epic._id)}
                          alt="toggle"
                          className="cursor-pointer"
                        />
                      </div>

                      {/* EPIC INFO */}
                      <div className="flex gap-4">
                        <div className="flex flex-col capitalize">
                          <p className="text-black font-instrument font-semibold text-[16px] leading-[24px] tracking-[-0.31px]">
                            {epic.title || "Epic Title"}
                          </p>

                          <p className="text-[#4A5565] font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px]">
                            {epic.description || "Epic Description"}
                          </p>
                        </div>

                        {/* PRIORITY */}
                        <div className="bg-[#F3F4F6] flex items-center justify-center w-[40px] h-[30px] border text-black rounded-full text-[7px]">
                          {epic.priority || "Priority"}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-4">
                      {/* STORY COUNT */}
                      <div className="flex text-[#4A5565] font-instrument font-normal text-[14px] leading-[20px] justify-end">
                        <p>{totalStories} stories</p>
                      </div>

                      {/* ADD BUTTON */}
                      {/* <button
                        onClick={() => openModal(epic)}
                        className="flex items-center gap-1 bg-white border px-3 py-1 rounded-md"
                      >
                        <img
                          src={Plus}
                          alt="plus"
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Add Story</span>
                      </button> */}
                    </div>
                  </div>

                  {/* ================= STORY CONTENT ================= */}
                  {toggledEpics[epic._id] && (
                    <BackLogContent
                      epicId={epic._id}
                      projectId={
                        typeof epic.project === "object"
                          ? epic.project._id
                          : epic.project
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackLog;