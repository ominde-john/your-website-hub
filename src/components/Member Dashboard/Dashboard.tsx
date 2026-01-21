import React, { useState } from 'react';
import { Search, Calendar, Mail, FileText, Clock, Settings, Sun, ChevronDown, ChevronRight, Plus, Filter, ExternalLink, Menu, BarChart3, Bell, User, Home, Users, MessageSquare, Package, ShoppingBag, CreditCard, Shield, HelpCircle, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState('Project Board');
  const [expandedProjects, setExpandedProjects] = useState(['Team Project']);
  const [activeNav, setActiveNav] = useState('dashboard');

  const toggleProject = (project) => {
    setExpandedProjects(prev => 
      prev.includes(project) 
        ? prev.filter(p => p !== project)
        : [...prev, project]
    );
  };

  const taskStats = [
    { count: 78, label: 'Active task', color: 'bg-amber-400', icon: '⚙️' },
    { count: 24, label: 'In Progress task', color: 'bg-orange-400', icon: '⚙️' },
    { count: 19, label: 'Complete task', color: 'bg-green-400', icon: '✓' }
  ];

  const teamMembers = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5'
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Home },
    { id: "team", label: "Team", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "tasks", label: "Tasks", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100">
      {/* Top Navigation Bar */}
      

      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span>Projects</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-700 font-medium">SYM website redesign</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">Project Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>‹ Dec, 2024 ›</span>
              </div>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-techgold to-amber-600 text-white rounded-lg flex items-center space-x-2 hover:shadow-lg transition-shadow">
              <Plus className="w-4 h-4" />
              <span>Add task</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {taskStats.map((stat, i) => (
            <div key={i} className={`${stat.color} bg-opacity-20 rounded-2xl p-6 relative overflow-hidden`}>
              <div className="absolute top-4 right-4">
                <button className="px-3 py-1 bg-white rounded-full text-xs">More</button>
              </div>
              <div className="absolute top-4 left-4 text-2xl">{stat.icon}</div>
              <div className="mt-8">
                <p className="text-3xl md:text-4xl font-bold text-gray-800">{stat.count}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* XinoTask Brain */}
            <div className="bg-gradient-to-r from-techgold to-amber-600 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm">⚡</span>
                <span className="font-semibold">XinoTask Brain</span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Use AI for updates, stand-ups, and tasks
              </p>
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition">
                Try for free →
              </button>
            </div>

            {/* Today Task & Analytics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Today Task */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Today Task</h3>
                    <p className="text-xs text-gray-500">24 New Task</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Tasks point</span>
                    <span className="font-semibold">50.0</span>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-techgold rounded flex items-center justify-center text-white text-xs">
                      📦
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Delivery</p>
                      <p className="text-xs text-gray-500">website design</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-800 mb-1">2 <span className="text-lg text-gray-500">/4</span></p>
                  <p className="text-xs text-gray-500">tasks</p>
                </div>
                <div className="flex items-center justify-center mt-4 -space-x-2">
                  {teamMembers.slice(0, 4).map((src, i) => (
                    <img key={i} src={src} alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                  ))}
                </div>
                <button className="w-full mt-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Start Now
                </button>
              </div>

              {/* New Tasks */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">New Tasks</h3>
                <p className="text-4xl font-bold text-gray-800 mb-1">78<span className="text-lg text-gray-400">%</span></p>
                <p className="text-xs text-gray-500 mb-4">24 Dec 2024</p>
                <div className="h-32 mb-4">
                  {/* Simple chart */}
                  <div className="flex items-end h-20 space-x-2">
                    {[40, 60, 80, 60, 90, 70].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-techgold rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Continue
                </button>
              </div>
            </div>

            {/* Last Projects */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Last Projects <span className="text-gray-400 text-sm">3</span></h3>
                <button className="text-sm text-techgold flex items-center space-x-1 hover:text-techgold-dark">
                  <ExternalLink className="w-4 h-4" />
                  <span>View on Figma</span>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">Smart Home UI Ux</p>
              <p className="text-xs text-gray-400 mb-4">5 Member</p>
              <div className="flex items-center space-x-2 mb-6">
                {teamMembers.map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full" />
                ))}
                <span className="text-sm text-gray-400">+4</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-xl p-4 h-32 relative">
                  <span className="absolute top-2 right-2 px-2 py-1 bg-green-100 text-green-600 rounded text-xs">Draft</span>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 h-32"></div>
                <div className="border border-gray-200 rounded-xl p-4 h-32"></div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Tasks Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Tasks Activity</h3>
              <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  <polyline
                    points="0,150 50,140 100,120 150,130 200,100 250,110 300,90"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <polyline
                    points="0,160 50,155 100,145 150,150 200,130 250,140 300,120"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <polyline
                    points="0,170 50,165 100,160 150,165 200,155 250,160 300,150"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                </svg>
                <div className="absolute top-4 right-4 space-y-2">
                  <div className="bg-amber-100 px-2 py-1 rounded text-xs">+ 8 Tasks</div>
                  <div className="bg-green-100 px-2 py-1 rounded text-xs">+ 2 Tasks</div>
                  <div className="bg-purple-100 px-2 py-1 rounded text-xs">4 Tasks</div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>

            {/* Team Insights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">Team Insights</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Filter className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div>
                  <p className="text-3xl font-bold text-gray-800">124</p>
                  <p className="text-xs text-gray-500">Tasks</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">26</p>
                  <p className="text-xs text-gray-500">Day</p>
                </div>
              </div>
              <div className="flex items-end justify-between h-32">
                <div className="w-8 bg-gray-200 rounded-t" style={{height: '40%'}}></div>
                <div className="w-8 bg-gray-200 rounded-t" style={{height: '50%'}}></div>
                <div className="w-8 bg-techgold rounded-t" style={{height: '100%'}}></div>
                <div className="w-8 bg-gray-200 rounded-t" style={{height: '60%'}}></div>
                <div className="w-8 bg-gray-200 rounded-t" style={{height: '70%'}}></div>
                <div className="w-8 bg-gray-200 rounded-t" style={{height: '45%'}}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Team Productivity</span>
                  <span className="text-sm font-semibold">84%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed Tasks</span>
                  <span className="text-sm font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Reviews</span>
                  <span className="text-sm font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Upcoming Deadlines</span>
                  <span className="text-sm font-semibold">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800">Recent tasks <span className="text-gray-400 text-sm">8</span></h3>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 flex items-center space-x-1 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 flex items-center space-x-1 hover:bg-gray-50">
                <span>Sort by</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Tasks Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Task Name</th>
                  <th className="pb-3">Assignee</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Priority</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                          <FileText className="w-4 h-4 text-techgold" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Design homepage layout</p>
                          <p className="text-xs text-gray-500">Project SYM</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <img src={`https://i.pravatar.cc/150?img=${i}`} alt="" className="w-6 h-6 rounded-full" />
                        <span className="text-sm text-gray-700">Team Member {i}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-700">Dec {20 + i}, 2024</span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        i % 3 === 0 ? 'bg-green-100 text-green-700' :
                        i % 3 === 1 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        i === 1 ? 'bg-red-100 text-red-700' :
                        i === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {i === 1 ? 'High' : i === 2 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 text-sm text-techgold hover:text-techgold-dark hover:bg-amber-50 rounded-lg">
              View All Tasks →
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation (WhatsApp Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center p-2 flex-1 ${
                activeNav === item.id ? 'text-techgold' : 'text-gray-500'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1 truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

export default Dashboard;