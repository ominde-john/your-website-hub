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
  X,
  User,
  Mail,
  Phone,
  Linkedin,
  FileUp,
  Shield,
  Calendar,
  MessageSquare,
  Download,
  Eye,
  ExternalLink,
  ChevronRight
} from "lucide-react";

const Profile = ({ profile, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("resume");
  const [formData, setFormData] = useState(profile);
  const [uploadProgress, setUploadProgress] = useState(0);

  const tabs = [
    { id: "resume", label: "Resume & Contact", icon: <FileText className="w-4 h-4" />, color: "indigo" },
    { id: "location", label: "Work Authorization", icon: <MapPin className="w-4 h-4" />, color: "emerald" },
    { id: "availability", label: "Availability", icon: <Clock className="w-4 h-4" />, color: "amber" },
    { id: "communications", label: "Communications", icon: <Bell className="w-4 h-4" />, color: "violet" },
    { id: "account", label: "Account Settings", icon: <Settings className="w-4 h-4" />, color: "slate" }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resumeFile: {
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          uploadedDate: new Date().toLocaleDateString(),
          url: URL.createObjectURL(file)
        }
      });
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setUploadProgress(0);
        }
      }, 100);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen overflow-y-auto">
      {/* NO outer padding - content starts right at sidebar */}
      <div className="w-full">
        
        {/* Header with gradient background - NO horizontal padding */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 pt-8 pb-20">
          <div className="px-8"> {/* Padding only inside content */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/90 text-sm font-medium">Profile Settings</span>
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  Personal Profile
                </h1>
                <p className="text-white/70 mt-3 max-w-2xl text-lg">
                  Manage your professional identity, contact information, and job preferences
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-xl font-bold text-white">JB</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-indigo-700 rounded-full"></div>
                </div>
                <div>
                  <p className="text-white font-semibold">{formData.fullName}</p>
                  <p className="text-white/60 text-sm">Profile 85% complete</p>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex justify-between text-white/80 text-sm mb-2">
                <span>Profile Completion</span>
                <span>85%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - NO horizontal padding */}
        <div className="px-8 -mt-12"> {/* Content padding starts here */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Navigation Sidebar - Sticky */}
            <aside className="lg:w-72 w-full shrink-0">
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-200 ${
                          isActive
                            ? `bg-gradient-to-r from-indigo-50 to-white text-indigo-700 border-l-4 border-indigo-500`
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isActive ? "bg-indigo-500" : "bg-slate-100"}`}>
                            <div className={isActive ? "text-white" : "text-slate-500"}>
                              {tab.icon}
                            </div>
                          </div>
                          <span className="font-medium">{tab.label}</span>
                        </div>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-current" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                
                {/* Quick Stats */}
                <div className="mt-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-5">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Profile Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Last Updated</span>
                      <span className="text-sm font-medium">2 days ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Views</span>
                      <span className="text-sm font-medium text-emerald-600">1,245</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Visibility</span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                        Public
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area - Takes remaining space */}
            <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {activeTab === "resume" && (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full"
                  >
                    {/* Enhanced Card Container with Glass Effect */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100/80 overflow-hidden h-full">
                      
                      {/* Enhanced Card Header with Gradient */}
                      <div className="px-8 pt-8 pb-6 border-b border-slate-100 bg-gradient-to-r from-white to-blue-50/50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <motion.div 
                              whileHover={{ rotate: 5, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="p-3 bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/30 relative overflow-hidden group"
                            >
                              <FileText size={28} />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </motion.div>
                            <div>
                              <h2 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Resume & Contact Information
                              </h2>
                              <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                                <span>Update your professional details</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>Contact information</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <motion.button 
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 hover:border-slate-300 flex items-center gap-2 group shadow-sm"
                            >
                              <Eye className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
                              <span>Preview</span>
                            </motion.button>
                            <motion.button 
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-5 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-slate-900/20 transition-all duration-200 flex items-center gap-2 group"
                            >
                              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                              <span>Export</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Card Content with Better Spacing */}
                      <div className="p-8">
                        <div className="space-y-10">
                          
                          {/* Personal Information Section - Enhanced */}
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-7"
                          >
                            <div className="flex items-center gap-3">
                              <motion.div 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                              ></motion.div>
                              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                Personal Information
                                <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                  Required Fields
                                </span>
                              </h3>
                            </div>

                            {/* Full Name - Enhanced */}
                            <div className="group relative">
                              <div className="flex items-center justify-between mb-3">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-800 transition-colors group-focus-within:text-indigo-600">
                                  <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                                    <User className="w-3.5 h-3.5" />
                                  </div>
                                  Full Name
                                </label>
                                <span className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                                  Required
                                </span>
                              </div>
                              <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) =>
                                  setFormData({ ...formData, fullName: e.target.value })
                                }
                                className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 shadow-sm"
                                placeholder="Jeremy Bravoge"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                <Check className="w-5 h-5 text-emerald-500" />
                              </div>
                            </div>

                            {/* Contact Grid - Enhanced */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                              <div className="group relative">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3 transition-colors group-focus-within:text-blue-600">
                                  <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                                    <Mail className="w-3.5 h-3.5" />
                                  </div>
                                  Work Email
                                </label>
                                <div className="relative">
                                  <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                      setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full pl-12 pr-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 shadow-sm"
                                    placeholder="name@company.com"
                                  />
                                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                              </div>

                              <div className="group relative">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3 transition-colors group-focus-within:text-emerald-600">
                                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                                    <Phone className="w-3.5 h-3.5" />
                                  </div>
                                  Phone Number
                                </label>
                                <div className="relative">
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                    <motion.div 
                                      whileHover={{ scale: 1.1 }}
                                      className="text-2xl cursor-help"
                                      title="Kenya (+254)"
                                    >
                                      🇰🇪
                                    </motion.div>
                                    <span className="text-slate-500 font-medium">+254</span>
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
                                    className="w-full pl-24 pr-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 shadow-sm"
                                    placeholder="700 000 000"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Social Profile Section - Enhanced */}
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-7"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                              <h3 className="text-lg font-bold text-slate-900">
                                Social Profiles
                              </h3>
                            </div>

                            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl border-2 border-blue-100 p-7 shadow-sm">
                              <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                  <div className="p-1.5 bg-blue-100 rounded-lg text-blue-700">
                                    <Linkedin className="w-4 h-4" />
                                  </div>
                                  LinkedIn Profile
                                </label>
                                <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                                  Professional Network
                                </span>
                              </div>
                              
                              <div className="relative mb-6 group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <Globe className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
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
                                  className={`w-full pl-12 pr-5 py-4 border-2 rounded-2xl transition-all duration-200 ${
                                    formData.hasLinkedIn
                                      ? "bg-white border-blue-100 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 hover:border-blue-200"
                                      : "bg-slate-50/80 border-slate-100 opacity-50 cursor-not-allowed"
                                  }`}
                                  placeholder="linkedin.com/in/username"
                                />
                                {formData.hasLinkedIn && formData.linkedinUrl && (
                                  <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                  >
                                    <Check className="w-5 h-5 text-emerald-500" />
                                  </motion.div>
                                )}
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
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
                                    <div className="w-14 h-7 bg-slate-300 rounded-full peer peer-checked:bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-7 after:shadow-md"></div>
                                  </div>
                                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                                    I don't have a LinkedIn profile
                                  </span>
                                </label>
                                
                                {formData.linkedinUrl && formData.hasLinkedIn && (
                                  <motion.a 
                                    href={formData.linkedinUrl.startsWith('http') ? formData.linkedinUrl : `https://${formData.linkedinUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ x: 5 }}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
                                  >
                                    <span>Visit Profile</span>
                                    <ExternalLink className="w-4 h-4" />
                                  </motion.a>
                                )}
                              </div>
                            </div>
                          </motion.div>

                          {/* Resume Upload Section - Enhanced */}
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-7"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
                              <h3 className="text-lg font-bold text-slate-900">
                                Resume & Documents
                              </h3>
                            </div>

                            {formData.resumeFile ? (
                              <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-gradient-to-br from-emerald-50/80 to-teal-50/60 rounded-3xl border-2 border-emerald-200 p-7 shadow-sm"
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                  <div className="flex items-center gap-5">
                                    <div className="p-3.5 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl shadow-lg shadow-emerald-500/30">
                                      <Check size={28} />
                                    </div>
                                    <div>
                                      <p className="font-bold text-emerald-900 text-lg">
                                        {formData.resumeFile.name}
                                      </p>
                                      <div className="flex flex-wrap items-center gap-3 mt-2">
                                        <span className="text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                                          {formData.resumeFile.size}
                                        </span>
                                        <span className="text-xs text-emerald-500">
                                          Uploaded {formData.resumeFile.uploadedDate}
                                        </span>
                                        <span className="text-xs text-emerald-400 bg-emerald-50 px-2 py-1 rounded-full">
                                          ✓ Verified
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-3">
                                    <motion.button 
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="px-5 py-2.5 bg-white border border-emerald-200 text-emerald-700 font-medium rounded-xl hover:bg-emerald-50 transition-all duration-200 flex items-center gap-2"
                                    >
                                      <Eye className="w-4 h-4" />
                                      Preview
                                    </motion.button>
                                    <motion.button 
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => setFormData({...formData, resumeFile: null})}
                                      className="px-5 py-2.5 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-all duration-200 flex items-center gap-2"
                                    >
                                      <X className="w-4 h-4" />
                                      Remove
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="relative group"
                              >
                                <input
                                  type="file"
                                  id="resume-upload"
                                  className="hidden"
                                  onChange={handleFileUpload}
                                  accept=".pdf,.doc,.docx"
                                />
                                <label
                                  htmlFor="resume-upload"
                                  className="block cursor-pointer"
                                >
                                  <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-3xl border-3 border-dashed border-indigo-100 group-hover:border-indigo-300 group-hover:bg-indigo-50/50 p-12 text-center transition-all duration-300 shadow-sm hover:shadow-md">
                                    <motion.div 
                                      animate={{ y: [0, -5, 0] }}
                                      transition={{ repeat: Infinity, duration: 2 }}
                                      className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all"
                                    >
                                      <FileUp className="w-10 h-10 text-white" />
                                    </motion.div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-3">
                                      Upload Your Resume
                                    </h4>
                                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                      Drag & drop your resume or click to browse. Ensure it's up-to-date with your latest experience.
                                    </p>
                                    <motion.div 
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="inline-flex items-center gap-3 px-8 py-3.5 bg-white border-2 border-indigo-200 rounded-full text-sm font-bold text-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                      <Upload className="w-5 h-5" />
                                      <span>Browse Files</span>
                                    </motion.div>
                                    <p className="text-xs text-slate-400 mt-6 flex items-center justify-center gap-3">
                                      <span className="px-3 py-1 bg-slate-100 rounded-full">PDF</span>
                                      <span className="px-3 py-1 bg-slate-100 rounded-full">DOC</span>
                                      <span className="px-3 py-1 bg-slate-100 rounded-full">DOCX</span>
                                      <span className="text-slate-500">Max 10MB</span>
                                    </p>
                                  </div>
                                </label>
                                
                                {uploadProgress > 0 && (
                                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4">
                                    <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                                      <span>Uploading...</span>
                                      <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="h-2.5 bg-white/90 rounded-full overflow-hidden shadow-inner">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full relative"
                                      >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                      </motion.div>
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </motion.div>

                          {/* Enhanced Action Buttons */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="pt-10 border-t border-slate-100"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                              <div className="flex items-center gap-3 text-sm text-slate-500">
                                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                  <Info className="w-4 h-4" />
                                </div>
                                <span>All changes are saved automatically</span>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button 
                                  whileHover={{ x: -5 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-10 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center gap-3"
                                >
                                  <X className="w-5 h-5" />
                                  Cancel
                                </motion.button>
                                <motion.button
                                  onClick={() => onUpdate?.(formData)}
                                  whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)"
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all duration-200 flex items-center gap-3 group"
                                >
                                  <Check className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                  <span>Save All Changes</span>
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Coming Soon Tab */}
                {activeTab !== "resume" && (
                  <motion.div
                    key="coming-soon"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100/80 overflow-hidden"
                  >
                    <div className="p-16 text-center">
                      <motion.div 
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-32 h-32 bg-gradient-to-br from-slate-100/50 to-blue-100/30 rounded-full flex items-center justify-center mx-auto mb-10 border-2 border-slate-100"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-xl">
                          {tabs.find((t) => t.id === activeTab)?.icon}
                        </div>
                      </motion.div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-6">
                        {tabs.find((t) => t.id === activeTab)?.label}
                      </h3>
                      <p className="text-slate-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                        We're crafting something special here. This feature will be available soon!
                      </p>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-100 to-blue-50 text-slate-700 font-medium rounded-full border border-slate-200"
                      >
                        <Clock className="w-5 h-5" />
                        <span>Launching Soon</span>
                      </motion.div>
                      <p className="text-sm text-slate-400 mt-10">
                        Check back in a few days or subscribe to updates
                      </p>
                    </div>
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