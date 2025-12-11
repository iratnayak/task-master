import Sidebar from "@/components/Sidebar";
import KanbanBoard from "@/components/KanbanBoard";
import { db } from "@/lib/db";
import { createTask } from "@/actions/createTask";

export default async function Home() {
  // Database eken data gannawa
  const tasks = await db.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-slate-800">Project Alpha</h2>

          <form action={createTask} className="flex gap-2">
            <input
              name="title"
              type="text"
              placeholder="Enter new task..."
              className="px-4 py-2 rounded-lg border border-slate-700 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition"
            >
              + Add Task
            </button>
          </form>
        </header>
        <KanbanBoard initialTasks={tasks} />
      </main>
    </div>
  );
}
