"use client";

import { motion } from "framer-motion";
import { deleteTask } from "@/actions/deleteTask";
import { updateTaskStatus } from "@/actions/updateTaskStatus";
import test from "node:test";

type TaskProps = {
  task: {
    id: string;
    title: string;
    status: string;
    createdAt: Date;
  };
};

const TaskCard = ({ task }: TaskProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`p-3 rounded-lg border mb-3 shadow-sm group relative transition-all ${
        task.status === "DONE"
          ? "bg-slate-50 border-slate-100 opacity-75"
          : "bg-white border-slate-200 hover:border-amber-500"
      }`}
    >
      <div className="flex justify-between items-start">
        <p
          className={`text-sm font-medium ${
            task.status === "DONE"
              ? "text-slate-500 line-through"
              : "text-slate-800"
          }`}
        >
          {task.title}
        </p>

        {/* Delete Button */}
        <form action={deleteTask}>
          <input type="hidden" name="id" value={task.id} />
          <button
            type="submit"
            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition text-xs font-bold px-2"
          >
            X
          </button>
        </form>
      </div>

      {/* Buttons based on Status */}
      <div className="mt-3 flex justify-end">
        {/* TODO -> IN_PROGRESS */}
        {task.status === "TODO" && (
          <form action={updateTaskStatus}>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="newStatus" value="IN_PROGRESS" />
            <button className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition">
              Start →
            </button>
          </form>
        )}

        {/* IN_PROGRESS -> DONE */}
        {task.status === "IN_PROGRESS" && (
          <form action={updateTaskStatus}>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="newStatus" value="DONE" />
            <button className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition">
              Done ✓
            </button>
          </form>
        )}

        {/* DONE Status Text */}
        {task.status === "DONE" && (
          <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Completed
          </span>
        )}
      </div>

      <span className="text-[10px] text-slate-400 mt-2 block">
        {new Date(task.createdAt).toLocaleDateString("en-GB")}
      </span>
    </motion.div>
  );
};

export default TaskCard;
