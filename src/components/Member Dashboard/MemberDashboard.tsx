import React, { useState } from 'react';
import {
  Video, Users, BarChart3, MessageSquare, Settings, Mic, MicOff, Phone,
  Grid3x3, Bell, Search, LayoutDashboard, Calendar,
  CheckSquare, Monitor, Camera, CameraOff, Paperclip, Send
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import TaskCard from './TaskCard';
import Chat from './Chat';

export default function MembersDashboard() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState('meetings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'meetings', icon: Video, label: 'Meetings' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const participants = [
    { id: 1, name: 'Sarah Chen', color: 'bg-pink-100 text-pink-600', initial: 'SC' },
    { id: 2, name: 'Alex Kim', color: 'bg-purple-100 text-purple-600', initial: 'AK' },
    { id: 3, name: 'Jordan Lee', color: 'bg-amber-100 text-amber-600', initial: 'JL' },
    { id: 4, name: 'Taylor Ross', color: 'bg-emerald-100 text-emerald-600', initial: 'TR' },
  ];

  const tasks = [
    { title: 'Earthy Color', items: ['Design Thinking', 'Problem Solving'], members: ['EC', 'MK', 'JD'], time: '1h ago' },
    { title: 'Google Project', items: ['Week Plan', 'Problem Solving'], members: ['SC', 'AK', 'TR'], time: '2h ago' },
    { title: 'System Audit', items: ['Security Check', 'Load Test'], members: ['KN', 'JJ', 'KR'], time: '4h ago' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-24 bg-white border-r border-slate-200 flex flex-col items-center py-8 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-blue-200">
          <Video className="w-6 h-6 text-white" />
        </div>
        <nav className="flex-1 flex flex-col space-y-6">
          {sidebarItems.map((item) => (
            <SidebarItem 
              key={item.id} 
              item={item} 
              active={activeSidebar} 
              onClick={(id) => { setActiveSidebar(id); setIsSidebarOpen(false); }} 
            />
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 mr-4 hover:bg-slate-100 rounded-xl">
              <Grid3x3 className="w-6 h-6 text-slate-600" />
            </button>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search projects or meetings..." className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold">Mrinmoy K.</p>
                <p className="text-[11px] text-slate-500 font-medium">Senior Designer</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-inner">MK</div>
            </div>
          </div>
        </header>

        {/* Dynamic Body */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeSidebar === 'chat' ? (
            <Chat />
          ) : (
            <div className="grid grid-cols-12 gap-8">

              {/* Left Column: Video and Tasks */}
              <div className="col-span-12 xl:col-span-8 space-y-8">

                {/* Video Interface */}
                <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video min-h-[350px]">
                  {/* Overlay UI */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center space-x-2 border border-white/10">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-white text-xs font-mono">00:13:16</span>
                      </div>
                      <div className="flex -space-x-2">
                         {participants.map(p => (
                           <div key={p.id} className={`w-10 h-10 rounded-xl border-2 border-slate-900 ${p.color} flex items-center justify-center text-xs font-bold`}>
                             {p.initial}
                           </div>
                         ))}
                      </div>
                    </div>

                    <div className="flex justify-center items-center space-x-4">
                      <div className="flex bg-black/30 backdrop-blur-xl p-3 rounded-[2rem] border border-white/10 space-x-3">
                        <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-2xl transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                        <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-4 rounded-2xl transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                          {isVideoOff ? <CameraOff size={20} /> : <Camera size={20} />}
                        </button>
                        <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20"><Monitor size={20} /></button>
                        <button className="p-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 shadow-lg shadow-red-900/20"><Phone size={20} className="rotate-[135deg]" /></button>
                        <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20"><Settings size={20} /></button>
                      </div>
                    </div>
                  </div>

                  {/* Main Video Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    {isVideoOff ? (
                      <div className="text-center">
                        <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-600">
                          <Users className="text-slate-500" size={40} />
                        </div>
                        <p className="text-slate-400 font-medium">Camera is turned off</p>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-60" />
                    )}
                  </div>
                </div>

                {/* Tasks Grid */}
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Active Tasks</h3>
                    <button className="text-blue-600 text-sm font-bold flex items-center hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                      View All <Calendar className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task, i) => <TaskCard key={i} task={task} />)}
                  </div>
                </section>
              </div>

              {/* Right Column: Placeholder for other sections */}
              <div className="col-span-12 xl:col-span-4 space-y-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 flex flex-col h-[700px] shadow-sm overflow-hidden">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {(() => {
                          const activeItem = sidebarItems.find((item) => item.id === activeSidebar);
                          const Icon = activeItem?.icon;
                          return Icon ? <Icon className="w-8 h-8 text-slate-400" /> : null;
                        })()}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{sidebarItems.find(item => item.id === activeSidebar)?.label}</h3>
                      <p className="text-slate-500">Content for {sidebarItems.find(item => item.id === activeSidebar)?.label} section</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}