import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import BoardContent from "./BoardContent";
import { useDispatch } from "react-redux";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { updateStoryStatusAction } from "../../redux/slice/story/storySlice";

export default function BoardValidation({ currentProjectId }) {
  const dispatch = useDispatch();

  const [columns, setColumns] = useState({
    todo: { name: "Todo", items: [] },
    progress: { name: "In Progress", items: [] },
    complete: { name: "Completed", items: [] },
  });

  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/stories/all-story`);
        const stories = Array.isArray(data?.message) ? data.message : [];

        const todo = [];
        const progress = [];
        const complete = [];

        stories.forEach((story) => {
          const item = {
            id: story._id,
            subject: story.title,
            details: story.description || "",
            points: story.points || 0,
            aka: "ME",
          };

          if (story.status === "progress") progress.push(item);
          else if (story.status === "complete") complete.push(item);
          else todo.push(item);
        });

        setColumns({
          todo: { name: "Todo", items: todo },
          progress: { name: "In Progress", items: progress },
          complete: { name: "Completed", items: complete },
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchStories();
  }, [currentProjectId]);

  // ✅ DRAG FIX (THIS IS CRITICAL)
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceItems = [...sourceCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    const destItems = [...destCol.items];
    destItems.splice(destination.index, 0, movedItem);

    // 🔥 UPDATE UI FIRST
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destCol,
        items: destItems,
      },
    });

    // 🔥 UPDATE BACKEND
    try {
      await dispatch(
        updateStoryStatusAction({
          storyId: draggableId,
          status: destination.droppableId,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardContent columns={columns} />

      {loading && (
        <p className="text-sm text-gray-500 mt-3">
          Loading board...
        </p>
      )}
    </DragDropContext>
  );
}