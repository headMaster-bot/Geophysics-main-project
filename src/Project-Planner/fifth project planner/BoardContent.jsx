import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect } from "react";

// import React, { useEffect } from "react";
import { fetchStoriesByProjectAction } from "../../redux/slice/story/storySlice";
import { useDispatch, useSelector } from "react-redux";

const BoardContent = ({ columns, currentProjectId }) => {
  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentProjectId) {
      dispatch(fetchStoriesByProjectAction(currentProjectId));
    }
  }, [dispatch, currentProjectId]);

  const { storiesByProject } = useSelector(state => state.stories);

  const stories = storiesByProject[currentProjectId] || [];
  return (
    <div className="flex flex-col min-w-[917px]">
      {/* Header */}
      <h3 className="text-[#101828] px-6 font-instrument font-semibold text-[18px] leading-[28px] tracking-[-0.44px]">
        Board
      </h3>
      <p className="font-instrument text-[#4A5565] px-6 leading-5 tracking-[-0.15px] text-[14px]">
        Drag and drop stories between columns
      </p>

      {/* Columns */}
      <div className="grid grid-cols-3 px-6 gap-3 rounded-[10px] mt-4">
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex flex-col bg-[#F3F4F6] rounded-[10px] border-2 p-4 ${
                  snapshot.isDraggingOver ? "bg-blue-50" : "bg-[#F3F4F6]"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[#101828] capitalize font-instrument font-semibold text-[18px] leading-[27px] tracking-[-0.44px]">
                    {column.name}
                  </p>

                  <div className="w-[25px] h-[25px] rounded-full bg-white flex justify-center items-center">
                    <p className="text-[#4A5565] font-instrument font-normal text-[14px] leading-[20px] tracking-[-0.15px]">
                      {column.items.length}
                    </p>
                  </div>
                </div>

                <div className="min-h-[100px]">
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(providedDraggable, snapshotDraggable) => (
                        <div
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          style={providedDraggable.draggableProps.style}
                          className={`bg-white rounded-[10px] border-[2px] border-[#DADCE0] p-3 mb-3 cursor-ew-resize ${
                            snapshotDraggable.isDragging ? "shadow-lg" : ""
                          }`}
                        >
                          <p className="text-[#101828] pb-4 font-medium text-[18px] leading-[24px] tracking-[-0.31px] font-sans">
                            {item.subject}</p>
                          <p className="text-[#4A5565] font-instrument font-normal text-[16px] leading-5 tracking-[-0.15px]">
                            {item.details}
                          </p>

                          <div className="flex justify-between items-center mt-2">
                            <p className="font-medium text-[12px] text-[#4A5565] leading-4 tracking-normal font-instrument">
                              {item.points} points
                            </p>

                            <div className="w-[30px] h-[30px] rounded-full bg-[#585858] flex items-center justify-center text-white text-[14px]">
                              {item.aka}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};

export default BoardContent;