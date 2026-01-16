import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Info,
  Upload,
  FileText,
  Globe,
  MapPin,
  Clock,
  Bell,
  Settings,
  X
} from "lucide-react";

const Profile = ({ profile, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("resume");
  const [formData, setFormData] = useState(profile);

  const tabs = [
    { id: "resume", label: "Resume", icon: <FileText className="w-4 h-4" /> },
    { id: "location", label: "Work Authorization", icon: <MapPin className="w-4 h-4" /> },
    { id: "availability", label: "Availability", icon: <Clock className="w-4 h-4" /> },
    { id: "communications", label: "Communications", icon: <Bell className="w-4 h-4" /> },
    { id: "account", label: "Account Settings", icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen w-full">
      {/* FULL WIDTH WRAPPER (NO mx-auto, NO max-w) */}
      <div className="w-full px-6 py-12">
        
        {/* Optional inner constraint (keeps UI clean without causing sidebar gap) */}
        <div className="max-w-7xl">
          
          {/* Page Title Area */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Profile Settings
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Manage your professional identity and job preferences.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Navigation Sidebar */}
            <aside className="lg:w-72 w-full space-y-2 shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1"
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden min-w-0">
              <AnimatePresence mode="wait">
                {activeTab === "resume" && (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-10 lg:p-14"
                  >
                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                      <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          Resume & Contact
                        </h2>
                        <p className="text-slate-500 text-sm">
                          Update your public profile details.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* Full Name */}
                      <div className="group">
                        <label className="block text-sm font-bold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all"
                          placeholder="Jeremy Bravoge"
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                            Work Email <Info size={14} className="text-slate-400" />
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all"
                          />
                        </div>

                        <div className="group">
                          <label className="block text-sm font-bold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                            Phone Number
                          </label>
                          <div className="flex gap-3">
                            <div className="flex items-center justify-center px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xl">
                              🇰🇪
                            </div>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value
                                })
                              }
                              className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Professional Socials
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Globe className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="url"
                            disabled={!formData.hasLinkedIn}
                            value={formData.linkedinUrl}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                linkedinUrl: e.target.value
                              })
                            }
                            className={`w-full pl-11 pr-5 py-4 border rounded-2xl transition-all ${
                              formData.hasLinkedIn
                                ? "bg-white border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                : "bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed"
                            }`}
                            placeholder="linkedin.com/in/username"
                          />
                        </div>

                        <label className="flex items-center gap-3 mt-4 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={!formData.hasLinkedIn}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  hasLinkedIn: !e.target.checked
                                })
                              }
                            />
                            <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4"></div>
                          </div>
                          <span className="text-sm font-medium text-slate-500">
                            I don't have a LinkedIn profile
                          </span>
                        </label>
                      </div>

                      {/* Resume Upload */}
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">
                          Resume Document
                        </label>

                        {formData.resumeFile ? (
                          <div className="flex items-center justify-between p-5 bg-emerald-50 border border-emerald-100 rounded-2xl group">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-emerald-500 text-white rounded-xl">
                                <Check size={20} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-emerald-900">
                                  {formData.resumeFile.name}
                                </p>
                                <p className="text-xs text-emerald-600">
                                  Uploaded {formData.resumeFile.uploadedDate}
                                </p>
                              </div>
                            </div>
                            <button className="p-2 text-emerald-400 hover:text-red-500 transition-colors">
                              <X size={20} />
                            </button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center justify-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group cursor-pointer">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all duration-300">
                              <Upload size={28} />
                            </div>
                            <p className="font-bold text-slate-800">
                              Drop your resume here
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              PDF, DOCX up to 10MB
                            </p>
                            <button className="mt-6 px-6 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 shadow-sm hover:shadow-md transition-all">
                              Browse Files
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="pt-8 flex justify-end">
                        <button
                          onClick={() => onUpdate?.(formData)}
                          className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Other Tabs */}
                {activeTab !== "resume" && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-20 text-center"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      {tabs.find((t) => t.id === activeTab)?.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {tabs.find((t) => t.id === activeTab)?.label}
                    </h3>
                    <p className="text-slate-500 mt-2">
                      We're still setting this up. Check back soon!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
