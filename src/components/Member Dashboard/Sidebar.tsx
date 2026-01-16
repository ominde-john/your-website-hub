import React from "react";
import { Car, LogOut } from "lucide-react";
import { navItems } from "./navItems";

interface SidebarItemProps {
  item: {
    id: string;
    icon: React.ComponentType<any>;
    label: string;
  };
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full h-14 flex items-center justify-center rounded-xl transition-all ${
        isActive
          ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
          : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
      }`}
      title={item.label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeNav, onNavChange }) => {
  return (
    <nav className="w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6">
      <div className="mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
          <Car className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 w-full px-3">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeNav === item.id}
            onClick={() => onNavChange(item.id)}
          />
        ))}
      </div>

      <div className="mt-auto">
        <button className="w-14 h-14 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export { Sidebar, SidebarItem };