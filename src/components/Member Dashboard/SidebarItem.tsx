import React from 'react';

const SidebarItem = ({ item, active, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`relative p-3 rounded-2xl transition-all duration-300 group
        ${active === item.id ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
      title={item.label}
    >
      <Icon className="w-6 h-6" />
      <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs px-2 py-1 rounded-md pointer-events-none z-50">
        {item.label}
      </span>
    </button>
  );
};

export default SidebarItem;
