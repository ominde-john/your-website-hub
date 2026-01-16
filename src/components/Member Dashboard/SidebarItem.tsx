import React from 'react';
import { motion } from 'framer-motion';

const SidebarItem = ({ item, active, onClick }) => {
  const Icon = item.icon;
  const isActive = active === item.id;

  return (
    <button
      onClick={() => onClick(item.id)}
      className="relative w-12 h-12 flex items-center justify-center transition-all duration-300 group"
      title={item.label}
    >
      {/* Background Active Glow & Slide Animation */}
      {isActive && (
        <motion.div
          layoutId="sidebar-active-bg"
          className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-[0_8px_20px_rgba(79,70,229,0.3)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* The Icon */}
      <div className={`relative z-10 transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'
      }`}>
        <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-300`} />
      </div>

      {/* Floating Tooltip Label */}
      <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none z-[100]">
        <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 whitespace-nowrap border border-white/10 backdrop-blur-md">
          {item.label}
          {isActive && <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />}
        </div>
        
        {/* Tooltip Arrow */}
        <div className="absolute top-1/2 left-[-4px] -translate-y-1/2 w-2 h-2 bg-slate-900 border-l border-b border-white/10 rotate-45" />
      </div>

      {/* Active Indicator Dot (Left Side) */}
      {isActive && (
        <motion.div 
          layoutId="sidebar-dot"
          className="absolute -left-3 w-1.5 h-6 bg-indigo-600 rounded-r-full shadow-[2px_0_10px_rgba(79,70,229,0.5)]"
        />
      )}
    </button>
  );
};

export default SidebarItem;