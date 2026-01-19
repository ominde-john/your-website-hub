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
  Calendar,
  MessageSquare,
  Download,
  Eye,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Code,
  Wrench,
  Heart,
  Scale,
  BarChart3,
  DollarSign,
  Briefcase,
  FlaskConical,
  Palette,
  Languages,
  BookOpen,
  Grid3x3
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("resume");
  const [formData, setFormData] = useState({
    fullName: "Jeremy Bravoge",
    email: "jeremy.bravoge@company.com",
    phone: "700 000 000",
    hasLinkedIn: true,
    linkedinUrl: "linkedin.com/in/jeremybravoge",
    resumeFile: null,
    // Communication preferences
    communications: {
      channels: {
        email: true,
        sms: true
      },
      opportunityTypes: {
        fullTime: true,
        partTime: true,
        referral: true
      },
      general: {
        jobOpportunities: true,
        workUpdates: true,
        unsubscribeAll: false
      }
    },
    // Account settings
    account: {
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
      generativeProfile: true,
      payoutMethod: "standard",
      referredBy: "Gladys Ayuma"
    },
    // Work Authorization
    workAuthorization: {
      domainInterests: [],
      otherDomain: "",
      fullTimeCompensation: "",
      partTimeCompensation: "",
      // Location of Residence
      country: "Kenya",
      stateProvince: "",
      city: "",
      postalCode: "",
      sameAsWorkLocation: true,
      // Legal Attestation
      dateOfBirth: "",
      legallyAuthorized: false,
      agreeToNotify: false
    }
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

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

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB for avatar)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, avatar: "File size must be less than 2MB" });
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, avatar: "Please upload an image file" });
        return;
      }

      setFormData({
        ...formData,
        account: {
          ...formData.account,
          avatar: URL.createObjectURL(file)
        }
      });
      setErrors({ ...errors, avatar: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
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

  const domainOptions = [
    { id: "software", label: "Software Engineering", icon: <Code className="w-4 h-4" /> },
    { id: "engineering", label: "Other Engineering", icon: <Wrench className="w-4 h-4" /> },
    { id: "medicine", label: "Medicine", icon: <Heart className="w-4 h-4" /> },
    { id: "law", label: "Law", icon: <Scale className="w-4 h-4" /> },
    { id: "data", label: "Data Analysis", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "finance", label: "Finance", icon: <DollarSign className="w-4 h-4" /> },
    { id: "business", label: "Business Operations", icon: <Briefcase className="w-4 h-4" /> },
    { id: "science", label: "Life, Physical, and Social Science", icon: <FlaskConical className="w-4 h-4" /> },
    { id: "arts", label: "Arts & Design", icon: <Palette className="w-4 h-4" /> },
    { id: "language", label: "Language and Audio", icon: <Languages className="w-4 h-4" /> },
    { id: "humanities", label: "Humanities", icon: <BookOpen className="w-4 h-4" /> },
    { id: "misc", label: "Miscellaneous", icon: <Grid3x3 className="w-4 h-4" /> }
  ];

  const toggleDomain = (domainId) => {
    const current = formData.workAuthorization.domainInterests;
    if (current.includes(domainId)) {
      setFormData({
        ...formData,
        workAuthorization: {
          ...formData.workAuthorization,
          domainInterests: current.filter(id => id !== domainId)
        }
      });
    } else {
      setFormData({
        ...formData,
        workAuthorization: {
          ...formData.workAuthorization,
          domainInterests: [...current, domainId]
        }
      });
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
                <div className="relative group">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" 
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
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
                {activeTab === "communications" && (
                  <motion.div
                    key="communications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
                      
                      {/* Card Header */}
                      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl text-white shadow-lg shadow-violet-500/25">
                            <Bell className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">
                              Communications
                            </h2>
                            <p className="text-slate-500 text-sm">
                              Choose how and where you'd like to receive updates
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-8">
                        
                        {/* Communication Channels */}
                        <div className="space-y-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-slate-900">
                                Communication channels
                              </h3>
                              <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center cursor-help" title="Select how you want to be contacted">
                                <Info className="w-3 h-3 text-slate-500" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {/* Email Toggle */}
                            <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <label className="flex items-center gap-3 cursor-pointer flex-1">
                                <Mail className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-900">Email</span>
                              </label>
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    channels: {
                                      ...formData.communications.channels,
                                      email: !formData.communications.channels.email
                                    }
                                  }
                                })}
                                className="relative"
                              >
                                <div className={`w-12 h-6 rounded-full transition-colors ${
                                  formData.communications.channels.email ? 'bg-indigo-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    formData.communications.channels.email ? 'translate-x-6' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </button>
                            </div>

                            {/* SMS Toggle */}
                            <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <label className="flex items-center gap-3 cursor-pointer flex-1">
                                <MessageSquare className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-900">Text message (SMS)</span>
                              </label>
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    channels: {
                                      ...formData.communications.channels,
                                      sms: !formData.communications.channels.sms
                                    }
                                  }
                                })}
                                className="relative"
                              >
                                <div className={`w-12 h-6 rounded-full transition-colors ${
                                  formData.communications.channels.sms ? 'bg-indigo-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    formData.communications.channels.sms ? 'translate-x-6' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Opportunity Types */}
                        <div className="space-y-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-slate-900">
                                Opportunity types
                              </h3>
                              <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center cursor-help" title="Types of opportunities you're interested in">
                                <Info className="w-3 h-3 text-slate-500" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {/* Full-time */}
                            <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">Full-time opportunities</p>
                                <p className="text-xs text-slate-500 mt-0.5">Contact me about full-time roles</p>
                              </div>
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    opportunityTypes: {
                                      ...formData.communications.opportunityTypes,
                                      fullTime: !formData.communications.opportunityTypes.fullTime
                                    }
                                  }
                                })}
                                className="relative ml-4"
                              >
                                <div className={`w-12 h-6 rounded-full transition-colors ${
                                  formData.communications.opportunityTypes.fullTime ? 'bg-indigo-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    formData.communications.opportunityTypes.fullTime ? 'translate-x-6' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </button>
                            </div>

                            {/* Part-time */}
                            <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">Part-time opportunities</p>
                                <p className="text-xs text-slate-500 mt-0.5">Contact me about part-time roles</p>
                              </div>
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    opportunityTypes: {
                                      ...formData.communications.opportunityTypes,
                                      partTime: !formData.communications.opportunityTypes.partTime
                                    }
                                  }
                                })}
                                className="relative ml-4"
                              >
                                <div className={`w-12 h-6 rounded-full transition-colors ${
                                  formData.communications.opportunityTypes.partTime ? 'bg-indigo-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    formData.communications.opportunityTypes.partTime ? 'translate-x-6' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </button>
                            </div>

                            {/* Referral */}
                            <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">Referral opportunities</p>
                                <p className="text-xs text-slate-500 mt-0.5">Contact me about Mercor referral opportunities</p>
                              </div>
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    opportunityTypes: {
                                      ...formData.communications.opportunityTypes,
                                      referral: !formData.communications.opportunityTypes.referral
                                    }
                                  }
                                })}
                                className="relative ml-4"
                              >
                                <div className={`w-12 h-6 rounded-full transition-colors ${
                                  formData.communications.opportunityTypes.referral ? 'bg-indigo-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    formData.communications.opportunityTypes.referral ? 'translate-x-6' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* General Notifications */}
                        <div className="space-y-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-slate-900">
                                General
                              </h3>
                              <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center cursor-help" title="General notification preferences">
                                <Info className="w-3 h-3 text-slate-500" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {/* Job opportunities */}
                            <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">Job opportunities</p>
                                <p className="text-xs text-slate-500 mt-0.5">Receive notifications about new job openings, interviews, and application invitations.</p>
                              </div>
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    general: {
                                      ...formData.communications.general,
                                      jobOpportunities: !formData.communications.general.jobOpportunities
                                    }
                                  }
                                })}
                                className="relative ml-4"
                              >
                                <div className={`w-12 h-6 rounded-full transition-colors ${
                                  formData.communications.general.jobOpportunities ? 'bg-indigo-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    formData.communications.general.jobOpportunities ? 'translate-x-6' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </button>
                            </div>

                            {/* Work-related updates */}
                            <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">Work-related updates</p>
                                <p className="text-xs text-slate-500 mt-0.5">Get updates about offers, work trials, contracts, and project status changes.</p>
                              </div>
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    general: {
                                      ...formData.communications.general,
                                      workUpdates: !formData.communications.general.workUpdates
                                    }
                                  }
                                })}
                                className="relative ml-4"
                              >
                                <div className={`w-12 h-6 rounded-full transition-colors ${
                                  formData.communications.general.workUpdates ? 'bg-indigo-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    formData.communications.general.workUpdates ? 'translate-x-6' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </button>
                            </div>

                            {/* Unsubscribe from all */}
                            <div className="flex items-center justify-between py-3 px-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-red-900">Unsubscribe from all</p>
                                <p className="text-xs text-red-600 mt-0.5">Turn this on to stop all the outreach.</p>
                              </div>
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    general: {
                                      ...formData.communications.general,
                                      unsubscribeAll: !formData.communications.general.unsubscribeAll
                                    }
                                  }
                                })}
                                className="relative ml-4"
                              >
                                <div className={`w-12 h-6 rounded-full transition-colors ${
                                  formData.communications.general.unsubscribeAll ? 'bg-red-600' : 'bg-slate-300'
                                }`}>
                                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    formData.communications.general.unsubscribeAll ? 'translate-x-6' : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Location of Residence */}
                        <div className="space-y-5">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 mb-1">Location of Residence</h3>
                            <p className="text-sm text-slate-500">
                              Where you're based for most of the year, which can differ from your citizenship
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Country */}
                            <div>
                              <label className="text-sm font-semibold text-slate-700 mb-2 block">Country</label>
                              <input
                                type="text"
                                value={formData.workAuthorization.country}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    workAuthorization: {
                                      ...formData.workAuthorization,
                                      country: e.target.value
                                    }
                                  })
                                }
                                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="Kenya"
                              />
                            </div>

                            {/* State/Province/Region */}
                            <div>
                              <label className="text-sm font-semibold text-slate-700 mb-2 block">State / Province / Region</label>
                              <input
                                type="text"
                                value={formData.workAuthorization.stateProvince}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    workAuthorization: {
                                      ...formData.workAuthorization,
                                      stateProvince: e.target.value
                                    }
                                  })
                                }
                                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="Select State/Province"
                              />
                            </div>

                            {/* City */}
                            <div>
                              <label className="text-sm font-semibold text-slate-700 mb-2 block">City</label>
                              <input
                                type="text"
                                value={formData.workAuthorization.city}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    workAuthorization: {
                                      ...formData.workAuthorization,
                                      city: e.target.value
                                    }
                                  })
                                }
                                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="Enter city"
                              />
                            </div>

                            {/* Postal Code */}
                            <div>
                              <label className="text-sm font-semibold text-slate-700 mb-2 block">Postal Code</label>
                              <input
                                type="text"
                                value={formData.workAuthorization.postalCode}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    workAuthorization: {
                                      ...formData.workAuthorization,
                                      postalCode: e.target.value
                                    }
                                  })
                                }
                                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="Enter postal code"
                              />
                            </div>
                          </div>

                          {/* Same as work location checkbox */}
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.workAuthorization.sameAsWorkLocation}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  workAuthorization: {
                                    ...formData.workAuthorization,
                                    sameAsWorkLocation: e.target.checked
                                  }
                                })
                              }
                              className="w-5 h-5 mt-0.5 rounded border-2 border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                              My location of residence and physical working location are the same.
                            </span>
                          </label>
                        </div>

                        {/* Legal Attestation */}
                        <div className="space-y-5">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 mb-1">Legal Attestation</h3>
                            <p className="text-sm text-slate-500">
                              Confirm your legally authorized work status
                            </p>
                          </div>

                          {/* Date of Birth */}
                          <div>
                            <label className="text-sm font-semibold text-slate-700 mb-2 block">
                              Date of Birth (in MM/DD/YYYY)
                            </label>
                            <input
                              type="text"
                              value={formData.workAuthorization.dateOfBirth}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  workAuthorization: {
                                    ...formData.workAuthorization,
                                    dateOfBirth: e.target.value
                                  }
                                })
                              }
                              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                              placeholder="MM/DD/YYYY"
                            />
                          </div>

                          {/* Legally Authorized Checkbox */}
                          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <label className="flex items-start gap-3 cursor-pointer group mb-4">
                              <input
                                type="checkbox"
                                checked={formData.workAuthorization.legallyAuthorized}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    workAuthorization: {
                                      ...formData.workAuthorization,
                                      legallyAuthorized: e.target.checked
                                    }
                                  })
                                }
                                className="w-5 h-5 mt-0.5 rounded border-2 border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all shrink-0"
                              />
                              <div className="flex-1">
                                <span className="text-sm font-medium text-slate-900 block mb-2">
                                  I confirm that I am legally authorized to work from Kenya.*
                                </span>
                                <div className="text-xs text-slate-600 space-y-1">
                                  <p>By checking this box, you represent and warrant that:</p>
                                  <p>1. You have all necessary visas, permits, and/or legal rights to work from the country you have indicated.</p>
                                  <p>2. You will defend, indemnify, and hold harmless Mercor from any claims, losses, or liabilities arising from your failure to maintain proper work authorization.</p>
                                </div>
                              </div>
                            </label>
                          </div>

                          {/* Agree to Notify Checkbox */}
                          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <label className="flex items-start gap-3 cursor-pointer group mb-4">
                              <input
                                type="checkbox"
                                checked={formData.workAuthorization.agreeToNotify}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    workAuthorization: {
                                      ...formData.workAuthorization,
                                      agreeToNotify: e.target.checked
                                    }
                                  })
                                }
                                className="w-5 h-5 mt-0.5 rounded border-2 border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all shrink-0"
                              />
                              <div className="flex-1">
                                <span className="text-sm font-medium text-slate-900 block mb-2">
                                  I agree to remain working from Kenya, and to notify Mercor in writing prior to any change.*
                                </span>
                                <div className="text-xs text-slate-600 space-y-1">
                                  <p>By checking this box, you agree to:</p>
                                  <p>1. Continue working only from the country specified above unless you have provided Mercor with prior written notice of your intended change of work location.</p>
                                  <p>2. Obtain and maintain proper work authorization for any future country from which you intend to work before beginning work from that country.</p>
                                </div>
                              </div>
                            </label>
                          </div>
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

                {activeTab !== "resume" && activeTab !== "communications" && activeTab !== "location" && activeTab !== "account" && (
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

                {/* Account Settings Tab */}
                {activeTab === "location" && (
                  <motion.div
                    key="location"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
                      
                      {/* Card Header */}
                      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white shadow-lg shadow-emerald-500/25">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">
                              Work Authorization
                            </h2>
                            <p className="text-slate-500 text-sm">
                              Your work preferences and compensation expectations
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-8">
                        
                        {/* Domain Interests */}
                        <div className="space-y-5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900">Domain Interests</h3>
                            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center cursor-help" title="Select domains you're interested in">
                              <Info className="w-3 h-3 text-slate-500" />
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-slate-600 mb-1">What domains are you interested in?</p>
                            <p className="text-xs text-slate-500 mb-4">Select all that apply.</p>
                          </div>

                          {/* Domain Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {domainOptions.map((domain) => {
                              const isSelected = formData.workAuthorization.domainInterests.includes(domain.id);
                              return (
                                <motion.button
                                  key={domain.id}
                                  onClick={() => toggleDomain(domain.id)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                                    isSelected
                                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                  }`}
                                >
                                  <div className={`p-1.5 rounded-lg ${
                                    isSelected ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-600"
                                  }`}>
                                    {domain.icon}
                                  </div>
                                  <span className="text-sm font-medium">{domain.label}</span>
                                </motion.button>
                              );
                            })}
                          </div>

                          {/* Other Domain Input */}
                          <div>
                            <input
                              type="text"
                              value={formData.workAuthorization.otherDomain}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  workAuthorization: {
                                    ...formData.workAuthorization,
                                    otherDomain: e.target.value
                                  }
                                })
                              }
                              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                              placeholder="Others (please specify)"
                            />
                          </div>
                        </div>

                        {/* Minimum Expected Compensation */}
                        <div className="space-y-5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900">Minimum expected compensation</h3>
                            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center cursor-help" title="Your compensation expectations">
                              <Info className="w-3 h-3 text-slate-500" />
                            </div>
                          </div>

                          {/* Full-time */}
                          <div>
                            <label className="text-sm font-semibold text-slate-700 mb-3 block">Full-time</label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                                $
                              </div>
                              <input
                                type="number"
                                value={formData.workAuthorization.fullTimeCompensation}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    workAuthorization: {
                                      ...formData.workAuthorization,
                                      fullTimeCompensation: e.target.value
                                    }
                                  })
                                }
                                className="w-full pl-8 pr-20 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="0"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                / year
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                              We won't reach out about roles below this. This stays private and won't impact your offers.
                            </p>
                          </div>

                          {/* Part-time */}
                          <div>
                            <label className="text-sm font-semibold text-slate-700 mb-3 block">Part-time</label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                                $
                              </div>
                              <input
                                type="number"
                                value={formData.workAuthorization.partTimeCompensation}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    workAuthorization: {
                                      ...formData.workAuthorization,
                                      partTimeCompensation: e.target.value
                                    }
                                  })
                                }
                                className="w-full pl-8 pr-20 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="0"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                / hour
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                              We won't reach out about roles below this. This stays private and won't impact your offers.
                            </p>
                          </div>
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

                {activeTab === "account" && (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
                      
                      {/* Card Header */}
                      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl text-white shadow-lg shadow-slate-500/25">
                            <Settings className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">
                              Account Settings
                            </h2>
                            <p className="text-slate-500 text-sm">
                              Input your preference and delete your account
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-8">
                        
                        {/* Avatar Section */}
                        <div className="space-y-4">
                          <h3 className="text-base font-bold text-slate-900">Account</h3>
                          
                          <div className="flex items-start gap-6">
                            <div className="relative group">
                              <img 
                                src={formData.account.avatar}
                                alt="Profile avatar"
                                className="w-20 h-20 rounded-xl object-cover border-2 border-slate-200"
                              />
                              <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Upload className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                onChange={handleAvatarUpload}
                                accept="image/jpeg,image/png,image/gif"
                              />
                              <label
                                htmlFor="avatar-upload"
                                className="inline-block px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all cursor-pointer text-sm"
                              >
                                Change avatar
                              </label>
                              <p className="text-xs text-slate-500 mt-2">
                                JPG, PNG, or GIF. Max 2 MB. Files over 150KB will be compressed.
                              </p>
                              {errors.avatar && (
                                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  {errors.avatar}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Generative Profile Pictures */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">Generative profile pictures</p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Let Mercor generate a professional photo from your AI interview. Your image will be created once your profile joins our talent pool.
                              </p>
                            </div>
                            <button
                              onClick={() => setFormData({
                                ...formData,
                                account: {
                                  ...formData.account,
                                  generativeProfile: !formData.account.generativeProfile
                                }
                              })}
                              className="relative ml-4 shrink-0"
                            >
                              <div className={`w-12 h-6 rounded-full transition-colors ${
                                formData.account.generativeProfile ? 'bg-indigo-600' : 'bg-slate-300'
                              }`}>
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                  formData.account.generativeProfile ? 'translate-x-6' : 'translate-x-0'
                                }`}></div>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* Payout Preferences */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 mb-1">Payout preferences</h3>
                            <p className="text-sm text-slate-500">Choose how you want to receive your payouts - standard or instant.</p>
                          </div>

                          {/* Info Banner */}
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex gap-3">
                              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-blue-900">Only one payout option available</p>
                                <p className="text-xs text-blue-700 mt-1">This option has been automatically selected for you.</p>
                              </div>
                            </div>
                          </div>

                          {/* Standard Payout Option */}
                          <div className="border-2 border-blue-500 bg-blue-50 rounded-xl p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-5 h-5 rounded-full border-4 border-blue-600 bg-white shrink-0 mt-0.5"></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-bold text-slate-900">Standard Payout</h4>
                                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">Free</span>
                                </div>
                                <p className="text-sm text-slate-600 mb-1">
                                  Funds arrive in your Stripe account quickly, then transfer to your bank within 5 business days
                                </p>
                                <p className="text-xs text-slate-500">Up to 5 business days</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Referral Status */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 mb-1">Referral status</h3>
                            <p className="text-sm text-slate-500">You've been referred by {formData.account.referredBy}</p>
                          </div>

                          <button className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all text-sm">
                            Not your referrer?
                          </button>
                        </div>

                        {/* Change Email */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 mb-1">Change email</h3>
                            <p className="text-sm text-slate-500">Transfer all your data and account-related communications to a new email address.</p>
                          </div>

                          <button 
                            onClick={() => setShowEmailModal(true)}
                            className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all text-sm"
                          >
                            Change email
                          </button>
                        </div>

                        {/* Delete Account */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 mb-1">Delete account</h3>
                            <p className="text-sm text-slate-500">Permanently delete the account and all data from the Mercor platform.</p>
                          </div>

                          <button 
                            onClick={() => setShowDeleteModal(true)}
                            className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-all text-sm"
                          >
                            Delete account
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Delete Account</h3>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed from our platform.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log("Account deleted");
                      setShowDeleteModal(false);
                    }}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Change Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowEmailModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Change Email</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Enter your new email address. We'll send a verification link to confirm the change.
                </p>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">New Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="newemail@example.com"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="flex-1 px-4 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log("Email change requested");
                      setShowEmailModal(false);
                    }}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
                  >
                    Send Verification
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;