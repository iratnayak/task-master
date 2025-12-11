"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { updateTaskStatus } from "@/actions/updateTaskStatus";

// Types definition

type Task = {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
};

export default function KanbanBoard({
  initialTasks,
}: {
  initialTasks: Task[];
}) {
  // Local State UI will be immediately change
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Update for the state when the new state coming from DB
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // Drag and Drop logic
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    // Sever action for backend updating
    const formData = new FormData();
    formData.append("id", taskId);
    formData.append("newStatus", newStatus);
    await updateTaskStatus(formData);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create 3 columns */}
        <Column
          id="TODO"
          title="To Do"
          tasks={tasks.filter((t) => t.status === "TODO")}
        />
        <Column
          id="IN_PROGRESS"
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "IN_PROGRESS")}
        />
        <Column
          id="DONE"
          title="Done"
          tasks={tasks.filter((t) => t.status === "DONE")}
        />
      </div>
    </DndContext>
  );
}

function Column({
  id,
  title,
  tasks,
}: {
  id: string;
  title: string;
  tasks: Task[];
}) {
  const { setNodeRef } = useDroppable({ id });

  const colors = {
    TODO: "text-slate-700 bg-slate-100",
    IN_PROGRESS: "text-blue-600 bg-blue-50",
    DONE: "text-green-600 bg-green-50",
  };
  return (
    <div
      ref={setNodeRef}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 min-h-[500px]"
    >
      <h3
        className={`font-semibold mb-4 flex justify-between ${
          id === "IN_PROGRESS"
            ? "text-blue-600"
            : id === "DONE"
            ? "text-green-600"
            : "text-slate-700"
        }`}
      >
        {title}
        <span
          className={`${
            colors[id as keyof typeof colors]
          } px-2 rounded-full text-xs py-1`}
        >
          {tasks.length}
        </span>
      </h3>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="h-20 border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center text-slate-300 text-xs">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}

// --- Helper Component: Draggable Task Wrapper ---
function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab active:cursor-grabbing"
    >
      <TaskCard task={task} />
    </div>
  );
}
