import React, { useState } from "react";
import { Car, LogOut, ChevronLeft, ChevronRight, User, Bell, Settings } from "lucide-react";
import { navItems } from "./navItems";

interface SidebarItemProps {
  item: {
    id: string;
    icon: React.ComponentType<any>;
    label: string;
  };
  isActive: boolean;
  onClick: () => void;
  expanded: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isActive, onClick, expanded }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center transition-all rounded-xl ${
        expanded ? "w-full px-4 py-3.5 justify-start" : "w-14 h-14 justify-center"
      } ${
        isActive
          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20"
          : "text-slate-500 hover:bg-slate-50 hover:text-teal-600"
      }`}
      title={!expanded ? item.label : undefined}
    >
      <Icon className="w-5 h-5" />
      
      {/* Show label only when expanded */}
      {expanded && (
        <span className={`ml-3 font-medium text-sm ${
          isActive ? "text-white" : "text-slate-700"
        }`}>
          {item.label}
        </span>
      )}
    </button>
  );
};

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeNav, onNavChange }) => {
  const [expanded, setExpanded] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className={`h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ${
      expanded ? "w-64" : "w-20"
    }`}>
      {/* Header with Logo and Toggle */}
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {expanded ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-lg">JetSpare</h1>
                <p className="text-xs text-slate-500">Automotive Platform</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
              <Car className="w-6 h-6 text-white" />
            </div>
          )}
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {expanded ? (
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => (
          <div key={item.id} className="flex justify-center">
            <SidebarItem
              item={item}
              isActive={activeNav === item.id}
              onClick={() => onNavChange(item.id)}
              expanded={expanded}
            />
          </div>
        ))}
      </div>

      {/* Bottom Section - User & Actions */}
      <div className="p-4 border-t border-slate-200">
        {/* Quick Actions */}
        <div className={`flex ${expanded ? "justify-between mb-4" : "justify-center mb-3"}`}>
          <button className="p-2 hover:bg-slate-100 rounded-lg relative transition-colors">
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {expanded && (
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>

        {/* User Profile */}
        <div className={`flex items-center ${
          expanded ? "justify-between p-3" : "justify-center p-2"
        } hover:bg-slate-50 rounded-xl transition-colors cursor-pointer`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            
            {expanded && (
              <div className="flex flex-col">
                <span className="font-medium text-slate-800">John Doe</span>
                <span className="text-xs text-slate-500">Admin</span>
              </div>
            )}
          </div>
          
          {expanded && (
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Sidebar, SidebarItem };