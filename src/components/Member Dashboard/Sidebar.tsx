import React, { useState } from "react";
import { 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Bell, 
  Settings, 
  Home, 
  Users, 
  MessageSquare, 
  Calendar, 
  FileText, 
  BarChart3, 
  Package, 
  ShoppingBag, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  LayoutDashboard,
  Code2,
  Terminal
} from "lucide-react";
import teksoftLogo from "@/assets/teksoft-logo.png";

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
      className={`flex items-center transition-all duration-200 rounded-lg ${
        expanded ? "w-full px-4 py-3 justify-start" : "w-12 h-12 justify-center mx-auto"
      } ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
      title={!expanded ? item.label : undefined}
    >
      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-current"}`} />
      
      {/* Show label only when expanded */}
      {expanded && (
        <span className={`ml-3 font-medium text-sm ${
          isActive ? "text-white font-semibold" : "text-slate-700"
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

  // Tech Team specific navigation items
  const techTeamNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Home },
    { id: "team", label: "Team", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "tasks", label: "Tasks", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: Users },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    <nav className={`h-screen bg-gradient-to-b from-white to-blue-50 border-r border-slate-200/60 flex flex-col transition-all duration-300 shadow-sm ${
      expanded ? "w-64" : "w-20"
    }`}>
      {/* Header with Logo and Toggle - FIXED LOGO SIZING */}
      <div className="p-5 border-b border-slate-200/60">
        <div className="flex items-center justify-between">
          {expanded ? (
            <div className="flex items-center gap-3">
              {/* Logo Container for EXPANDED mode - larger */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-md p-2">
                <img 
                  src={teksoftLogo} 
                  alt="Teksoft Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-lg bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Teksoft Team
                </h1>
                <p className="text-xs text-slate-500 font-medium">Tech Community</p>
              </div>
            </div>
          ) : (
            /* Logo Container for COLLAPSED mode - smaller and simplified */
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-md p-1.5">
              <img 
                src={teksoftLogo} 
                alt="Teksoft Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? (
              <ChevronLeft className="w-4 h-4 text-blue-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {techTeamNavItems.map((item) => (
          <div key={item.id} className={`${expanded ? "px-2" : "px-1"}`}>
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
      <div className="p-4 border-t border-slate-200/60">
        {/* Quick Actions */}
        <div className={`flex ${expanded ? "justify-between mb-4" : "justify-center mb-3"}`}>
          <button className="p-2 hover:bg-blue-100 rounded-lg relative transition-colors duration-200 group">
            <Bell className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          {expanded && (
            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200 group">
              <Settings className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            </button>
          )}
        </div>

        {/* User Profile */}
        <div className={`flex items-center ${
          expanded ? "justify-between p-3 bg-white/80 rounded-xl shadow-sm" : "justify-center p-2"
        } hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-100`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-white" />
            </div>
            
            {expanded && (
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">Tech Lead</span>
                <span className="text-xs text-slate-500">@dev_lead</span>
              </div>
            )}
          </div>
          
          {expanded && (
            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200">
              <LogOut className="w-4 h-4 text-slate-500 hover:text-red-500" />
            </button>
          )}
        </div>
        
        {/* Version Info (only shown when expanded) */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-200/60">
            <p className="text-xs text-slate-500 text-center">
              Teksoft Team v2.4.1
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Sidebar, SidebarItem };