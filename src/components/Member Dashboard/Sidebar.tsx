import React, { useState, useEffect } from "react";
import { LogOut, ChevronLeft, ChevronRight, User, Bell, Settings, Home, Users, MessageSquare, Calendar, FileText, BarChart3, ShoppingBag, LayoutDashboard, Menu, X, Moon, Sun, BadgeCheck, Sparkles, Zap, TrendingUp, Award, Target } from "lucide-react";

const userData = {
  name: "Alex Johnson",
  role: "Senior Developer",
  avatar: "https://i.pravatar.cc/150?img=32",
  status: "active",
  joinDate: "Jan 2023",
  department: "Engineering",
  notifications: 5,
  stats: { projects: 12, tasks: 47, teams: 3 }
};

const SidebarItem = ({ item, isActive, onClick, expanded, isMobile = false }) => {
  const Icon = item.icon;
  
  if (isMobile) {
    return (
      <button onClick={onClick} className={`relative flex flex-col items-center justify-center p-2 flex-1 min-w-0 transition-all duration-300 group ${isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-600"}`}>
        <div className="relative">
          <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-blue-600 scale-110" : "group-hover:scale-110"}`} />
          {item.badge > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">{item.badge > 9 ? '9+' : item.badge}</span>}
        </div>
        <span className={`text-xs mt-1 truncate max-w-full font-medium ${isActive ? "text-blue-600" : "text-slate-500"}`}>{item.label}</span>
        {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg"></div>}
      </button>
    );
  }
  
  return (
    <button onClick={onClick} className={`relative flex items-center transition-all duration-300 rounded-2xl group overflow-hidden ${expanded ? "w-full px-4 py-3.5 justify-start" : "w-14 h-14 justify-center mx-auto"} ${isActive ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-500/30" : "text-slate-600 hover:bg-white/60 hover:shadow-lg hover:text-blue-600"}`}>
      {isActive && <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>}
      <div className="relative z-10 flex items-center w-full">
        <div className="relative">
          <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-white scale-110" : "group-hover:scale-125 group-hover:rotate-12"}`} />
          {item.badge > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">{item.badge > 9 ? '9+' : item.badge}</span>}
        </div>
        {expanded && (
          <>
            <span className={`ml-3 font-semibold text-sm ${isActive ? "text-white" : "text-slate-700 group-hover:text-blue-600"}`}>{item.label}</span>
            {isActive && <div className="ml-auto flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full animate-pulse"></div></div>}
          </>
        )}
      </div>
    </button>
  );
};

const Sidebar = ({ activeNav, onNavChange, darkMode, setDarkMode }) => {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setExpanded(false);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: 0 },
    { id: "projects", label: "Projects", icon: Home, badge: 3 },
    { id: "team", label: "Team", icon: Users, badge: 0 },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 7 },
    { id: "calendar", label: "Calendar", icon: Calendar, badge: 2 },
    { id: "tasks", label: "Tasks", icon: FileText, badge: 5 },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: 0 },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag, badge: 0 },
  ];

  const mobileBottomNavItems = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard, badge: 0 },
    { id: "messages", label: "Chats", icon: MessageSquare, badge: 7 },
    { id: "tasks", label: "Tasks", icon: FileText, badge: 5 },
    { id: "team", label: "Team", icon: Users, badge: 0 },
  ];

  if (isMobile) {
    return (
      <>
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/50 to-indigo-900/80 backdrop-blur-md z-40" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br shadow-2xl z-50 border-r overflow-y-auto transition-colors duration-300" style={{
              background: darkMode ? 'linear-gradient(to bottom right, rgb(15 23 42), rgb(30 41 59))' : 'linear-gradient(to bottom right, white, rgba(219, 234, 254, 0.3), rgba(224, 231, 255, 0.5))',
              borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
            }}>
              <div className={`p-6 border-b backdrop-blur-xl sticky top-0 z-20 transition-colors duration-300 ${darkMode ? 'bg-slate-800/40 border-white/10' : 'bg-white/40 border-white/20'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className={`font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>Teksoft Team</h1>
                      <p className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Tech Community</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-white/60 rounded-xl transition-all">
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative z-10 flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img src={userData.avatar} alt={userData.name} className="w-14 h-14 rounded-2xl border-2 border-white/30 shadow-xl" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">{userData.name}</h3>
                        <BadgeCheck className="w-4 h-4 text-yellow-300" />
                      </div>
                      <p className="text-sm text-blue-100">{userData.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-medium">{userData.department}</span>
                    <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-medium">{userData.status}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-b border-white/20 bg-white/30">
                <div className="grid grid-cols-3 gap-2">
                  {[{l:"Projects",v:userData.stats.projects,i:Target},{l:"Tasks",v:userData.stats.tasks,i:TrendingUp},{l:"Teams",v:userData.stats.teams,i:Award}].map((s,i) => (
                    <div key={i} className="bg-white/60 rounded-xl p-3 text-center shadow-lg hover:scale-105 transition-all">
                      <s.i className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-2xl font-bold text-slate-800">{s.v}</p>
                      <p className="text-xs text-slate-600 font-medium">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3">
                {navItems.map(item => (
                  <button key={item.id} onClick={() => { onNavChange(item.id); setMobileMenuOpen(false); }} className={`flex items-center w-full p-3 rounded-2xl mb-2 transition-all ${activeNav === item.id ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl" : "text-slate-700 hover:bg-white/60"}`}>
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-semibold flex-1 text-left">{item.label}</span>
                    {item.badge > 0 && <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
                  </button>
                ))}
              </div>
              <div className="sticky bottom-0 p-4 border-t border-white/20 bg-white/40 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/60">
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span className="text-sm font-medium">Theme</span>
                  </button>
                  <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-white/20 shadow-2xl z-30 md:hidden">
          <div className="flex items-center px-1 py-2">
            <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center p-2 flex-1">
              <div className="relative">
                <Menu className="w-5 h-5 text-slate-600" />
                {userData.notifications > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{userData.notifications}</span>}
              </div>
              <span className="text-xs mt-1 text-slate-500 font-medium">Menu</span>
            </button>
            {mobileBottomNavItems.map(item => <SidebarItem key={item.id} item={item} isActive={activeNav === item.id} onClick={() => onNavChange(item.id)} expanded={false} isMobile={true} />)}
          </div>
        </nav>
        <div className="h-20 md:hidden" />
      </>
    );
  }

  return (
    <>
      <nav className={`hidden md:flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 border-r border-white/20 flex-col transition-all duration-500 shadow-2xl relative ${expanded ? "w-80" : "w-20"}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative p-6 border-b border-white/20 bg-white/40 backdrop-blur-xl z-10">
          <div className="flex items-center justify-between">
            {expanded ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Teksoft Team</h1>
                  <p className="text-xs text-slate-600 font-medium">Tech Community</p>
                </div>
              </div>
            ) : (
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            )}
            <button onClick={() => setExpanded(!expanded)} className="p-2 hover:bg-white/60 rounded-xl transition-all">
              {expanded ? <ChevronLeft className="w-4 h-4 text-blue-600" /> : <ChevronRight className="w-4 h-4 text-blue-600" />}
            </button>
          </div>
        </div>
        {expanded && (
          <div className="relative p-4 border-b border-white/20 z-10">
            <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl p-4 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <img src={userData.avatar} alt={userData.name} className="w-14 h-14 rounded-2xl border-2 border-white/30 shadow-xl" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm truncate">{userData.name}</h3>
                      <BadgeCheck className="w-4 h-4 text-yellow-300" />
                    </div>
                    <p className="text-xs text-blue-100 truncate">{userData.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-medium">{userData.department}</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-medium">{userData.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="relative flex-1 px-3 py-6 space-y-2 overflow-y-auto z-10">
          {navItems.map(item => (
            <div key={item.id} className={expanded ? "px-2" : "px-0"}>
              <SidebarItem item={item} isActive={activeNav === item.id} onClick={() => onNavChange(item.id)} expanded={expanded} />
            </div>
          ))}
        </div>
        <div className="relative p-4 border-t border-white/20 space-y-3 bg-white/30 backdrop-blur-xl z-10">
          <div className={`flex gap-2 ${expanded ? "justify-between" : "justify-center"}`}>
            <button onClick={() => onNavChange("notifications")} className="p-2.5 hover:bg-white/60 rounded-xl relative transition-all group">
              <Bell className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
              {userData.notifications > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{userData.notifications}</span>}
            </button>
            {expanded && (
              <>
                <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 hover:bg-white/60 rounded-xl transition-all">
                  {darkMode ? <Sun className="w-5 h-5 text-slate-600" /> : <Moon className="w-5 h-5 text-slate-600" />}
                </button>
                <button onClick={() => onNavChange("settings")} className="p-2.5 hover:bg-white/60 rounded-xl transition-all">
                  <Settings className="w-5 h-5 text-slate-600" />
                </button>
              </>
            )}
          </div>
          <div onClick={() => onNavChange("profile")} className={`flex items-center ${expanded ? "justify-between p-3 bg-white/60 rounded-2xl shadow-lg" : "justify-center p-2"} hover:bg-white/80 transition-all cursor-pointer group`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              {expanded && (
                <div>
                  <p className="font-semibold text-sm text-slate-800">{userData.name}</p>
                  <p className="text-xs text-slate-500">{userData.role}</p>
                </div>
              )}
            </div>
            {expanded && (
              <button onClick={(e) => { e.stopPropagation(); setShowLogoutConfirm(true); }} className="p-2 hover:bg-red-50 rounded-xl transition-all">
                <LogOut className="w-4 h-4 text-slate-500 hover:text-red-500" />
              </button>
            )}
          </div>
          {expanded && <div className="pt-3 border-t border-white/20"><p className="text-xs text-slate-500 text-center">✨ Teksoft Team v3.0</p></div>}
        </div>
      </nav>
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 to-indigo-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <LogOut className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Logout Confirmation</h3>
              <p className="text-slate-600 mb-6">Are you sure you want to log out?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Cancel</button>
                <button onClick={() => { console.log("Logged out"); setShowLogoutConfirm(false); }} className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl">Yes, Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Sidebar };
