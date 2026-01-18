import React, { useState, useEffect } from "react";
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
  Terminal,
  Menu,
  X
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
  isMobile?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isActive, onClick, expanded, isMobile = false }) => {
  const Icon = item.icon;
  
  // For mobile bottom navigation (WhatsApp style)
  if (isMobile) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-2 flex-1 min-w-0 transition-all duration-200 ${
          isActive
            ? "text-blue-600"
            : "text-slate-500 hover:text-blue-600"
        }`}
        title={item.label}
      >
        <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-current"}`} />
        <span className={`text-xs mt-1 truncate max-w-full ${
          isActive ? "text-blue-600 font-medium" : "text-slate-500"
        }`}>
          {item.label}
        </span>
      </button>
    );
  }
  
  // For desktop sidebar (original style)
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  // Detect mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      if (window.innerWidth < 768) {
        setExpanded(false); // Auto-collapse on mobile
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Tech Team specific navigation items
  const techTeamNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Home },
    { id: "profile", label: "profile", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "tasks", label: "Tasks", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  // Top 4 items for mobile bottom navigation (like WhatsApp)
  const mobileBottomNavItems = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "messages", label: "Chats", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: Users },
    { id: "tasks", label: "Tasks", icon: FileText },
  ];

  // All items for mobile drawer menu
  const mobileMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Home },
    { id: "profile", label: "Profile", icon: Users },
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

  // WhatsApp-style mobile bottom navigation
  if (isMobile) {
    return (
      <>
        {/* Mobile Drawer Menu (when hamburger is clicked) */}
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Drawer Menu */}
            <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 animate-slide-in-left">
              {/* Drawer Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-md p-1.5">
                      <img 
                        src={teksoftLogo} 
                        alt="Teksoft Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold text-slate-800">Teksoft Team</h1>
                      <p className="text-xs text-slate-500">Tech Community</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* User Profile in Drawer */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800 block">Tech Lead</span>
                    <span className="text-xs text-slate-500">@dev_lead</span>
                  </div>
                  <Bell className="w-5 h-5 text-slate-500" />
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2 overflow-y-auto h-[calc(100vh-200px)]">
                {mobileMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full p-3 rounded-lg mb-1 ${
                      activeNav === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 p-2 text-slate-600 hover:text-red-500">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                  <span className="text-xs text-slate-500">v2.4.1</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* WhatsApp-style Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 md:hidden">
          <div className="flex items-center justify-between px-2 py-1">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col items-center justify-center p-2 flex-1 min-w-0"
            >
              <Menu className="w-5 h-5 text-slate-600" />
              <span className="text-xs mt-1 text-slate-500">Menu</span>
            </button>

            {/* Main Navigation Tabs */}
            {mobileBottomNavItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={activeNav === item.id}
                onClick={() => onNavChange(item.id)}
                expanded={false}
                isMobile={true}
              />
            ))}
          </div>
        </nav>

        {/* Spacer for bottom navigation */}
        <div className="h-16 md:hidden" />
      </>
    );
  }

  // Desktop Sidebar (Original)
  return (
    <nav className={`hidden md:flex h-screen bg-gradient-to-b from-white to-blue-50 border-r border-slate-200/60 flex-col transition-all duration-300 shadow-sm ${
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