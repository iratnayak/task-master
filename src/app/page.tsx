import Sidebar from '@/components/Sidebar';
import TaskCard from '@/components/TaskCard'; 
import { db } from '@/lib/db';
import { createTask } from '@/actions/createTask';

export default async function Home() {
  const tasks = await db.task.findMany({
    orderBy: { createdAt: 'desc' },
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition">
              + Add Task
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* COLUMN 1: TO DO */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-4 flex justify-between">
              To Do <span className="bg-slate-100 text-slate-600 px-2 rounded-full text-xs py-1">{tasks.filter(t => t.status === 'TODO').length}</span>
            </h3>
            {tasks.filter(t => t.status === 'TODO').map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
             {tasks.filter(t => t.status === 'TODO').length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">No tasks yet</p>
            )}
          </div>

          {/* COLUMN 2: IN PROGRESS */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-blue-600 mb-4 flex justify-between">
              In Progress <span className="bg-blue-50 text-blue-600 px-2 rounded-full text-xs py-1">{tasks.filter(t => t.status === 'IN_PROGRESS').length}</span>
            </h3>
            {tasks.filter(t => t.status === 'IN_PROGRESS').map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          {/* COLUMN 3: DONE */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-green-600 mb-4 flex justify-between">
              Done <span className="bg-green-50 text-green-600 px-2 rounded-full text-xs py-1">{tasks.filter(t => t.status === 'DONE').length}</span>
            </h3>
            {tasks.filter(t => t.status === 'DONE').map((task) => (
               <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </main>
      </div>
  );
}