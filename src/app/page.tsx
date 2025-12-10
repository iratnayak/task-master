import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* 1. Sidebar Section */}
      <Sidebar />

      {/* 2. Main Content Area (Board) */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-slate-800">Project Alpha</h2>
          <button className="bg-orange-300 text-black px-4 py-2 rounded-lg hover:bg-orange-500 font-medium">
            + New Task
          </button>
        </header>

        {/* Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: To Do */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-4 flex justify-between">
              Next <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-sm">3</span>
            </h3>
            {/* Sample Card */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3 shadow-sm cursor-pointer hover:border-blue-400">
              <p className="text-sm font-medium text-slate-800">Design Homepage UI</p>
              <span className="text-xs text-slate-400 mt-2 block">High Priority</span>
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-blue-600 mb-4 flex justify-between">
              In Progress <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-sm">1</span>
            </h3>
             {/* Sample Card */}
             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3 shadow-sm">
              <p className="text-sm font-medium text-slate-800">Setup Prisma Database</p>
              <span className="text-xs text-slate-400 mt-2 block">Isuru R.</span>
            </div>
          </div>

          {/* Column 3: Done */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-green-600 mb-4 flex justify-between">
              Done <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-sm">5</span>
            </h3>
             {/* Sample Card */}
             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3 shadow-sm opacity-70">
              <p className="text-sm font-medium text-slate-800">Initial Requirements</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}