import React from "react";
import { LayoutDashboard, Settings, User, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col fixed left-0 top-0">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-orange-300">TaskMaster</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        <a
          href="#"
          className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg text-blue-400"
        >
          <LayoutDashboard size={20} />
          <span>Board</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 p-3 hover:bg-slate-800 rounded-lg transition text-gray-300"
        >
          <User size={20} />
          <span>My Tasks</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 p-3 hover:bg-slate-800 rounded-lg transition text-gray-300"
        >
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center space-x-3 text-red-400 hover:text-red-300 transition">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
