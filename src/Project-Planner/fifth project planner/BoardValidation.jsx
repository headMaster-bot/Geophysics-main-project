import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { getUserProfileAction } from "../../redux/slice/user/usersSlice";
import BoardContent from "./BoardContent";
import { updateStoryStatusAction } from "../../redux/slice/story/storySlice";

const getInitials = (fullName = "") => {
  const names = fullName.trim().split(" ").filter(Boolean);
  if (!names.length) return "";

  const firstInitial = names[0]?.charAt(0).toUpperCase() || "";
  const lastInitial = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};

const defaultTodo = (aka) => [
  {
    id: "todo-1",
    subject: "Collect ground truth samples",
    details: "Take soil samples at marked locations",
    points: 3,
    aka,
  },
  {
    id: "todo-2",
    subject: "Process raw GPR data",
    details: "Clean and filter GPR scan data",
    points: 8,
    aka,
  },
  {
    id: "todo-3",
    subject: "Generate 2D profiles",
    details: "Create 2D subsurface profiles from filtered data",
    points: 5,
    aka,
  },
];

const defaultProgress = (aka) => [
  {
    id: "progress-1",
    subject: "Conduct Line 1-5 surveys",
    details: "Complete GPR scans along survey lines 1-5",
    points: 8,
    aka,
  },
];

const defaultComplete = (aka) => [
  {
    id: "complete-1",
    subject: "Setup equipment at site",
    details: "Deploy GPR equipment and calibrate sensors",
    points: 5,
    aka,
  },
];

export default function BoardValidation({currentProjectId}) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);
  const [columns, setColumns] = useState({
    todo: { name: "Todo", items: defaultTodo("ME") },
    progress: { name: "In progress", items: defaultProgress("ME") },
    complete: { name: "Completed", items: defaultComplete("ME") },
  });
  const [loading, setLoading] = useState(true);

  const profileFullName = profile?.message?.fullName || profile?.message?.firstName || "";
  const profileInitials = profile?.message?.initials || getInitials(profileFullName) || "ME";

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/stories/all-story`);
        const stories = Array.isArray(data?.message) ? data.message : [];

        const mappedContent = stories.map((story, index) => ({
          id: story._id || `story-${index}`,
          subject: story.title,
          details: story.description || "",
          points: story.points || 0,
          aka: profileInitials,
        }));

        setColumns((prev) => ({
          ...prev,
          todo: {
            ...prev.todo,
            items: mappedContent.length ? mappedContent : defaultTodo(profileInitials),
          },
          progress: { ...prev.progress, items: defaultProgress(profileInitials) },
          complete: { ...prev.complete, items: defaultComplete(profileInitials) },
        }));
      } catch (error) {
        console.error("Failed to load stories:", error);
        setColumns((prev) => ({
          ...prev,
          todo: { ...prev.todo, items: defaultTodo(profileInitials) },
          progress: { ...prev.progress, items: defaultProgress(profileInitials) },
          complete: { ...prev.complete, items: defaultComplete(profileInitials) },
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [profileInitials]);

  // const handleDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const { source, destination } = result;
  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   ) {
  //     return;
  //   }

  //   setColumns((prev) => {
  //     const sourceColumn = prev[source.droppableId];
  //     const destinationColumn = prev[destination.droppableId];
  //     const sourceItems = [...sourceColumn.items];
  //     const [movedItem] = sourceItems.splice(source.index, 1);

  //     if (source.droppableId === destination.droppableId) {
  //       sourceItems.splice(destination.index, 0, movedItem);
  //       return {
  //         ...prev,
  //         [source.droppableId]: {
  //           ...sourceColumn,
  //           items: sourceItems,
  //         },
  //       };
  //     }

  //     const destinationItems = [...destinationColumn.items];
  //     destinationItems.splice(destination.index, 0, movedItem);

  //     return {
  //       ...prev,
  //       [source.droppableId]: {
  //         ...sourceColumn,
  //         items: sourceItems,
  //       },
  //       [destination.droppableId]: {
  //         ...destinationColumn,
  //         items: destinationItems,
  //       },
  //     };
  //   });
  // };


  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // no movement
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;

    try {
      await dispatch(
        updateStoryStatusAction({
          storyId: draggableId,
          status: newStatus,
        })
      );

      // 🔥 refresh data
      // dispatch(fetchStoriesByProjectAction(currentProjectId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // <DragDropContext onDragEnd={handleDragEnd}>
    //   <DragDropContext onDragEnd={handleDragEnd}>
    //     <BoardContent columns={columns} currentProjectId={currentProjectId} />
    //   </DragDropContext>
    //   <>
    //     <BoardContent columns={columns} />
    //     {loading && (
    //       <p className="text-sm text-[#4A5565] mt-3">
    //         Loading board stories...
    //       </p>
    //     )}
    //   </>
    // </DragDropContext>

    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardContent columns={columns} currentProjectId={currentProjectId} />

      {loading && (
        <p className="text-sm text-[#4A5565] mt-3">
          Loading board stories...
        </p>
      )}
    </DragDropContext>
  );
}