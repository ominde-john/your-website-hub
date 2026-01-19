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
  ChevronRight,
  AlertCircle
} from "lucide-react";

interface ResumeFile {
  name: string;
  size?: string;
  uploadedDate: string;
  url?: string;
}

interface ProfileProps {
  profile?: {
    fullName?: string;
    email?: string;
    phone?: string;
    linkedinUrl?: string;
    hasLinkedIn?: boolean;
    resumeFile?: ResumeFile | null;
  };
  onUpdate?: (updatedProfile: any) => void;
}

const Profile = ({ profile, onUpdate }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("resume");
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    hasLinkedIn: boolean;
    linkedinUrl: string;
    resumeFile: ResumeFile | null;
  }>({
    fullName: profile?.fullName || "Jeremy Bravoge",
    email: profile?.email || "jeremy.bravoge@company.com",
    phone: profile?.phone || "700 000 000",
    hasLinkedIn: profile?.hasLinkedIn ?? true,
    linkedinUrl: profile?.linkedinUrl || "linkedin.com/in/jeremybravoge",
    resumeFile: profile?.resumeFile || null
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ ...errors, resume: "File size must be less than 10MB" });
        return;
      }

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
          setTimeout(() => setUploadProgress(0), 500);
        }
      }, 100);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saving profile:", formData);
      // Show success message
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 min-h-screen">
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 pt-8 pb-20">
          <div className="px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
                  <User className="w-4 h-4 text-white" />
                  <span className="text-white/90 text-sm font-medium">Profile Settings</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Personal Profile
                </h1>
                <p className="text-white/80 mt-2 max-w-2xl">
                  Manage your professional identity and job preferences
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                    <span className="text-lg font-bold text-white">JB</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-indigo-700 rounded-full"></div>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{formData.fullName}</p>
                  <p className="text-white/70 text-xs">85% complete</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-white/80 text-xs mb-2">
                <span className="font-medium">Profile Completion</span>
                <span className="font-semibold">85%</span>
              </div>
              <div className="h-2 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 lg:px-8 -mt-12 pb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 w-full shrink-0">
              <div className="lg:sticky lg:top-6 space-y-4">
                <nav className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-all ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500"
                            : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${isActive ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {tab.icon}
                          </div>
                          <span className="font-medium text-sm">{tab.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4" />}
                      </motion.button>
                    );
                  })}
                </nav>
                
                {/* Stats Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 text-sm">
                    <Info className="w-4 h-4 text-indigo-500" />
                    Quick Stats
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600">Last Updated</span>
                      <span className="text-xs font-medium text-slate-900">2 days ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600">Profile Views</span>
                      <span className="text-xs font-semibold text-emerald-600">1,245</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600">Status</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {activeTab === "resume" && (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
                      
                      {/* Card Header */}
                      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white shadow-lg shadow-indigo-500/25">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <h2 className="text-xl font-bold text-slate-900">
                                Resume & Contact
                              </h2>
                              <p className="text-slate-500 text-sm">
                                Professional details and contact information
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <motion.button 
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Preview
                            </motion.button>
                            <motion.button 
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Export
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-8">
                        
                        {/* Personal Information */}
                        <div className="space-y-5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <h3 className="text-base font-bold text-slate-900">
                              Personal Information
                            </h3>
                          </div>

                          {/* Full Name */}
                          <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                              <User className="w-3.5 h-3.5 text-indigo-500" />
                              Full Name
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => {
                                setFormData({ ...formData, fullName: e.target.value });
                                setErrors({ ...errors, fullName: "" });
                              }}
                              className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                                errors.fullName ? "border-red-300" : "border-slate-200 focus:border-indigo-500"
                              }`}
                              placeholder="Enter your full name"
                            />
                            {errors.fullName && (
                              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.fullName}
                              </p>
                            )}
                          </div>

                          {/* Contact Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <Mail className="w-3.5 h-3.5 text-blue-500" />
                                Email Address
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    setErrors({ ...errors, email: "" });
                                  }}
                                  className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                                    errors.email ? "border-red-300" : "border-slate-200 focus:border-blue-500"
                                  }`}
                                  placeholder="name@company.com"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              </div>
                              {errors.email && (
                                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  {errors.email}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                                Phone Number
                              </label>
                              <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                                  <span className="text-lg">🇰🇪</span>
                                  <span className="text-slate-500 text-sm font-medium">+254</span>
                                </div>
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                  }
                                  className="w-full pl-20 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                  placeholder="700 000 000"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Social Profile */}
                        <div className="space-y-5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <h3 className="text-base font-bold text-slate-900">
                              Social Profile
                            </h3>
                          </div>

                          <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl border border-blue-100 p-5">
                            <div className="flex items-center justify-between mb-4">
                              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <Linkedin className="w-4 h-4 text-blue-600" />
                                LinkedIn Profile
                              </label>
                              <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2.5 py-1 rounded-full">
                                Optional
                              </span>
                            </div>
                            
                            <div className="relative mb-4">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type="url"
                                disabled={!formData.hasLinkedIn}
                                value={formData.linkedinUrl}
                                onChange={(e) =>
                                  setFormData({ ...formData, linkedinUrl: e.target.value })
                                }
                                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all ${
                                  formData.hasLinkedIn
                                    ? "bg-white border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    : "bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed"
                                }`}
                                placeholder="linkedin.com/in/username"
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <label className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                                  checked={!formData.hasLinkedIn}
                                  onChange={(e) =>
                                    setFormData({ ...formData, hasLinkedIn: !e.target.checked })
                                  }
                                />
                                <span className="text-sm text-slate-600">
                                  I don't have LinkedIn
                                </span>
                              </label>
                              
                              {formData.linkedinUrl && formData.hasLinkedIn && (
                                <a 
                                  href={formData.linkedinUrl.startsWith('http') ? formData.linkedinUrl : `https://${formData.linkedinUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
                                >
                                  Visit Profile
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Resume Upload */}
                        <div className="space-y-5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <h3 className="text-base font-bold text-slate-900">
                              Resume Upload
                            </h3>
                          </div>

                          {formData.resumeFile ? (
                            <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/50 rounded-xl border-2 border-emerald-200 p-5">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-500/25">
                                    <Check className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-emerald-900">
                                      {formData.resumeFile.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                        {formData.resumeFile.size}
                                      </span>
                                      <span className="text-xs text-emerald-600">
                                        {formData.resumeFile.uploadedDate}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all text-sm flex items-center gap-1.5">
                                    <Eye className="w-4 h-4" />
                                    View
                                  </button>
                                  <button 
                                    onClick={() => setFormData({...formData, resumeFile: null})}
                                    className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-all text-sm flex items-center gap-1.5"
                                  >
                                    <X className="w-4 h-4" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
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
                                <div className="bg-gradient-to-br from-white to-indigo-50/20 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/30 p-8 text-center transition-all">
                                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
                                    <FileUp className="w-8 h-8 text-white" />
                                  </div>
                                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                                    Upload Your Resume
                                  </h4>
                                  <p className="text-slate-500 text-sm mb-4 max-w-sm mx-auto">
                                    Drag & drop or click to browse
                                  </p>
                                  <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-indigo-200 rounded-lg text-sm font-medium text-indigo-700 shadow-sm">
                                    <Upload className="w-4 h-4" />
                                    Browse Files
                                  </div>
                                  <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
                                    <span className="px-2 py-0.5 bg-slate-100 rounded">PDF</span>
                                    <span className="px-2 py-0.5 bg-slate-100 rounded">DOC</span>
                                    <span className="px-2 py-0.5 bg-slate-100 rounded">DOCX</span>
                                    <span>• Max 10MB</span>
                                  </p>
                                </div>
                              </label>
                              
                              {uploadProgress > 0 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4">
                                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                                    <span>Uploading...</span>
                                    <span className="font-semibold">{uploadProgress}%</span>
                                  </div>
                                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${uploadProgress}%` }}
                                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-slate-100">
                          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Info className="w-4 h-4" />
                              <span>Changes auto-save</span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button className="px-6 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all">
                                Cancel
                              </button>
                              <motion.button
                                onClick={handleSave}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all flex items-center gap-2"
                              >
                                <Check className="w-4 h-4" />
                                Save Changes
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Coming Soon Tabs */}
                {activeTab !== "resume" && (
                  <motion.div
                    key="coming-soon"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-100"
                  >
                    <div className="p-12 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                          {tabs.find((t) => t.id === activeTab)?.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {tabs.find((t) => t.id === activeTab)?.label}
                      </h3>
                      <p className="text-slate-500 max-w-md mx-auto mb-6">
                        This feature is coming soon. We're working hard to bring you the best experience!
                      </p>
                      <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg">
                        <Clock className="w-4 h-4" />
                        Launching Soon
                      </div>
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