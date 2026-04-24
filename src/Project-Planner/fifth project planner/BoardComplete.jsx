import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function BoardContent({ columns }) {
  return (
    <div className="grid grid-cols-3 gap-4 px-6 mt-4">

      {Object.entries(columns).map(([columnId, column]) => (
        <Droppable key={columnId} droppableId={columnId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`p-4 rounded-[10px] border-2 min-h-[200px] ${
                snapshot.isDraggingOver ? "bg-blue-50" : "bg-[#F3F4F6]"
              }`}
            >
              {/* HEADER */}
              <div className="flex justify-between mb-3">
                <h2 className="font-semibold">{column.name}</h2>
                <span>{column.items.length}</span>
              </div>

              {/* ITEMS */}
              {column.items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      className={`bg-white p-3 mb-3 rounded border ${
                        snapshot.isDragging ? "shadow-lg" : ""
                      }`}
                    >
                      <p className="font-medium">{item.subject}</p>
                      <p className="text-sm text-gray-500">
                        {item.details}
                      </p>
                      <p className="text-xs mt-2">
                        {item.points} points
                      </p>
                    </div>
                  )}
                </Draggable>
              ))}

              {/* 🔥 REQUIRED FOR DROPPABLE */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
}