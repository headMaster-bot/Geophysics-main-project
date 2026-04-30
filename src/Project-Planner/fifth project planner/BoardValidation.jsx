  import React, { useEffect, useState, useMemo } from "react";
  import { DragDropContext } from "@hello-pangea/dnd";
  import BoardContent from "./BoardContent";
  import { useDispatch, useSelector } from "react-redux";

  import {
    fetchStoriesByProjectAction,
    updateStoryStatusAction,
  } from "../../redux/slice/story/storySlice";

  export default function BoardValidation({ currentProjectId: propProjectId }) {
    const dispatch = useDispatch();

    const { storiesByProject, loading } = useSelector(
      (state) => state.stories
    );

    const { projects } = useSelector((state) => state.projects || {});

    // 🚀 Get last created project safely
    const lastProjectId = useMemo(() => {
      if (!projects?.length) return null;

      const sorted = [...projects].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sorted?.[0]?._id || null;
    }, [projects]);

    // 🚀 Final project ID
    const currentProjectId = propProjectId || lastProjectId;

    // 🚀 Safe key
    const projectKey = currentProjectId ? String(currentProjectId) : null;

    const projectStories = useMemo(() => {
      if (!projectKey) return [];
      return storiesByProject?.[projectKey] || [];
    }, [storiesByProject, projectKey]);

    const [columns, setColumns] = useState({
      todo: { name: "Todo", items: [] },
      progress: { name: "In Progress", items: [] },
      complete: { name: "Completed", items: [] },
    });

    // 🚀 FETCH STORIES (ONLY WHEN PROJECT CHANGES)
    useEffect(() => {
      if (!currentProjectId) return;

      dispatch(fetchStoriesByProjectAction(currentProjectId));
    }, [currentProjectId, dispatch]);

    // 🚀 RESET BOARD ON PROJECT CHANGE
    useEffect(() => {
      setColumns({
        todo: { name: "Todo", items: [] },
        progress: { name: "In Progress", items: [] },
        complete: { name: "Completed", items: [] },
      });
    }, [currentProjectId]);

    // 🚀 MAP STORIES TO COLUMNS
    useEffect(() => {
      if (!projectStories.length) return;

      const todo = [];
      const progress = [];
      const complete = [];

      projectStories.forEach((story) => {
        const item = {
          id: story._id,
          subject: story.title,
          details: story.description || "",
          points: story.points || 0,
          aka: story.user?.name || "ME",
        };

        const status = story.status?.toLowerCase();

        if (status === "progress") progress.push(item);
        else if (status === "complete") complete.push(item);
        else todo.push(item);
      });

      setColumns({
        todo: { name: "Todo", items: todo },
        progress: { name: "In Progress", items: progress },
        complete: { name: "Completed", items: complete },
      });
    }, [projectStories]);

    // 🚀 DRAG HANDLER
    const handleDragEnd = async (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) return;

      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];

      const sourceItems = [...sourceCol.items];
      const [movedItem] = sourceItems.splice(source.index, 1);

      const destItems = [...destCol.items];
      destItems.splice(destination.index, 0, movedItem);

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

      dispatch(
        updateStoryStatusAction({
          storyId: draggableId,
          status: destination.droppableId,
        })
      );
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