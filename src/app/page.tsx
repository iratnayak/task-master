import Sidebar from '@/components/Sidebar';
import { db } from '@/lib/db';
import { createTask } from '@/actions/createTask';
import { deleteTask } from '@/actions/deleteTask';

export default async function Home() {
  // Data (Server Side Fetching)
  const tasks = await db.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-slate-800">Project Alpha</h2>
          
          {/* 2. Server Action connected form */}
          <form action={createTask} className="flex gap-2">
          <input 
              name="title" 
              type="text" 
              placeholder="Enter new task..." 
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:ring-2 focus:ring-amber-500 placeholder:text-gray-400"
              required
            />
            <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-500 font-medium transition">
              + Add Task
            </button>
          </form>
        </header>

        {/* Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: NEXT */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-4">To Do</h3>
            
            {/* 3. Data map */}
            {tasks.filter(t => t.status === 'NEXT').map((task) => (
              <div key={task.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3 shadow-sm hover:border-blue-300 transition group">
                <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-800">{task.title}</p>
                {/* Delete Button From */}
                <form action={deleteTask}>
                 <input type='hidden' name='id' value={task.id}/>
                 <button type="submit" className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition text-xs font-bold px-2">
                      X
                 </button>
                </form>
                </div>
                <span className="text-xs text-slate-400 mt-2 block">
                  {task.createdAt.toLocaleDateString()}
                </span>
              </div>
            ))}
            
            {/* Display in a massage when the tasks becoming empty */}
            {tasks.filter(t => t.status === 'NEXT').length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">No tasks yet</p>
            )}
          </div>

          {/* Column 2: In Progress (Dummy UI for now) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-blue-600 mb-4">In Progress</h3>
             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3 shadow-sm opacity-50">
               <p className="text-sm font-medium text-slate-800">Database Schema Design</p>
             </div>
          </div>
          
          {/* Column 3: Done (Dummy UI for now) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-green-600 mb-4">Done</h3>
             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3 shadow-sm opacity-50">
               <p className="text-sm font-medium text-slate-800 line-through">Initial Setup</p>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}