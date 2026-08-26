import React, { useState, useEffect } from "react";
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

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  hasLinkedIn: boolean;
  linkedinUrl: string;
  resumeFile: ResumeFile | null;
  communications: {
    channels: { email: boolean; sms: boolean };
    opportunityTypes: { fullTime: boolean; partTime: boolean; referral: boolean };
    general: { jobOpportunities: boolean; workUpdates: boolean; unsubscribeAll: boolean };
  };
  account: {
    avatar: string;
    generativeProfile: boolean;
    payoutMethod: string;
    referredBy: string;
  };
  workAuthorization: {
    domainInterests: string[];
    otherDomain: string;
    fullTimeCompensation: string;
    partTimeCompensation: string;
    country: string;
    stateProvince: string;
    city: string;
    postalCode: string;
    sameAsWorkLocation: boolean;
    dateOfBirth: string;
    legallyAuthorized: boolean;
    agreeToNotify: boolean;
  };
}

const Profile = ({ profile, onUpdate }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("resume");
  const [formData, setFormData] = useState<FormData>({
    fullName: profile?.fullName || "Jeremy Bravoge",
    email: profile?.email || "jeremy.bravoge@company.com",
    phone: profile?.phone || "700 000 000",
    hasLinkedIn: profile?.hasLinkedIn ?? true,
    linkedinUrl: profile?.linkedinUrl || "linkedin.com/in/jeremybravoge",
    resumeFile: profile?.resumeFile || null,
    communications: {
      channels: { email: true, sms: true },
      opportunityTypes: { fullTime: true, partTime: true, referral: true },
      general: { jobOpportunities: true, workUpdates: true, unsubscribeAll: false }
    },
    account: {
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
      generativeProfile: true,
      payoutMethod: "standard",
      referredBy: "Gladys Ayuma"
    },
    workAuthorization: {
      domainInterests: [],
      otherDomain: "",
      fullTimeCompensation: "",
      partTimeCompensation: "",
      country: "Kenya",
      stateProvince: "",
      city: "",
      postalCode: "",
      sameAsWorkLocation: true,
      dateOfBirth: "",
      legallyAuthorized: false,
      agreeToNotify: false
    }
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when profile prop changes
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        fullName: profile.fullName || prev.fullName,
        email: profile.email || prev.email,
        phone: profile.phone || prev.phone,
        hasLinkedIn: profile.hasLinkedIn ?? prev.hasLinkedIn,
        linkedinUrl: profile.linkedinUrl || prev.linkedinUrl,
        resumeFile: profile.resumeFile || prev.resumeFile
      }));
    }
  }, [profile]);

  const tabs = [
    { id: "resume", label: "Resume & Contact", icon: <FileText className="w-4 h-4" />, color: "indigo" },
    { id: "location", label: "Work Authorization", icon: <MapPin className="w-4 h-4" />, color: "emerald" },
    { id: "availability", label: "Availability", icon: <Clock className="w-4 h-4" />, color: "amber" },
    { id: "communications", label: "Communications", icon: <Bell className="w-4 h-4" />, color: "violet" },
    { id: "account", label: "Account Settings", icon: <Settings className="w-4 h-4" />, color: "slate" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, avatar: "File size must be less than 2MB" });
        return;
      }
      
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
      onUpdate?.(formData);
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

  const toggleDomain = (domainId: string) => {
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
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-amber-50/20 min-h-screen">
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-techgold via-amber-500 to-amber-600 pt-8 pb-20">
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
                      src={formData.account.avatar} 
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
                            <div className="p-2.5 bg-gradient-to-br from-techgold to-amber-600 rounded-xl text-white shadow-lg shadow-techgold/25">
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
                              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.fullName}
                              </p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                              <Mail className="w-3.5 h-3.5 text-indigo-500" />
                              Email Address
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                setErrors({ ...errors, email: "" });
                              }}
                              className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                                errors.email ? "border-red-300" : "border-slate-200 focus:border-indigo-500"
                              }`}
                              placeholder="Enter your email"
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.email}
                              </p>
                            )}
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                              <Phone className="w-3.5 h-3.5 text-indigo-500" />
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                              placeholder="Enter your phone number"
                            />
                          </div>

                          {/* LinkedIn */}
                          <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                              <Linkedin className="w-3.5 h-3.5 text-indigo-500" />
                              LinkedIn Profile
                            </label>
                            <input
                              type="url"
                              value={formData.linkedinUrl}
                              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                              placeholder="linkedin.com/in/yourprofile"
                            />
                          </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 border-t border-slate-100">
                          <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSave}
                            className="px-6 py-3 bg-gradient-to-r from-techgold to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-techgold/25 hover:shadow-xl transition-all flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Save Changes
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "location" && (
                  <motion.div
                    key="location"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                      <h2 className="text-xl font-bold text-slate-900 mb-6">Work Authorization</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-semibold text-slate-700 mb-3 block">
                            Domain Interests
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {domainOptions.map((domain) => (
                              <button
                                key={domain.id}
                                onClick={() => toggleDomain(domain.id)}
                                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                                  formData.workAuthorization.domainInterests.includes(domain.id)
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                    : "border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                {domain.icon}
                                <span className="text-sm font-medium">{domain.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-slate-700 mb-2 block">Country</label>
                            <input
                              type="text"
                              value={formData.workAuthorization.country}
                              onChange={(e) => setFormData({
                                ...formData,
                                workAuthorization: { ...formData.workAuthorization, country: e.target.value }
                              })}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-slate-700 mb-2 block">City</label>
                            <input
                              type="text"
                              value={formData.workAuthorization.city}
                              onChange={(e) => setFormData({
                                ...formData,
                                workAuthorization: { ...formData.workAuthorization, city: e.target.value }
                              })}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "availability" && (
                  <motion.div
                    key="availability"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                      <h2 className="text-xl font-bold text-slate-900 mb-6">Availability Settings</h2>
                      <p className="text-slate-500">Configure your availability preferences here.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "communications" && (
                  <motion.div
                    key="communications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                      <h2 className="text-xl font-bold text-slate-900 mb-6">Communication Preferences</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-700 mb-3">Notification Channels</h3>
                          <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                              <input
                                type="checkbox"
                                checked={formData.communications.channels.email}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    channels: { ...formData.communications.channels, email: e.target.checked }
                                  }
                                })}
                                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="text-sm font-medium text-slate-700">Email notifications</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                              <input
                                type="checkbox"
                                checked={formData.communications.channels.sms}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  communications: {
                                    ...formData.communications,
                                    channels: { ...formData.communications.channels, sms: e.target.checked }
                                  }
                                })}
                                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="text-sm font-medium text-slate-700">SMS notifications</span>
                            </label>
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
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                      <h2 className="text-xl font-bold text-slate-900 mb-6">Account Settings</h2>
                      
                      <div className="space-y-6">
                        {/* Avatar */}
                        <div>
                          <label className="text-sm font-semibold text-slate-700 mb-3 block">Profile Picture</label>
                          <div className="flex items-center gap-4">
                            <img
                              src={formData.account.avatar}
                              alt="Avatar"
                              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200"
                            />
                            <div>
                              <label className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-slate-200 transition-all inline-flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Upload New
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleAvatarUpload}
                                  className="hidden"
                                />
                              </label>
                              {errors.avatar && (
                                <p className="mt-2 text-sm text-red-500">{errors.avatar}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="pt-6 border-t border-slate-200">
                          <h3 className="text-sm font-semibold text-red-600 mb-3">Danger Zone</h3>
                          <button
                            onClick={() => setShowDeleteModal(true)}
                            className="px-4 py-2 border-2 border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-all"
                          >
                            Delete Account
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
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Account</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
