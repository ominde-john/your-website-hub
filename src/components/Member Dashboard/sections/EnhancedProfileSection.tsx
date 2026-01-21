import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Languages,
  Code,
  Heart,
  ChevronRight,
  Camera,
  Check,
  Loader2,
  Plus,
  X,
  Edit3,
  Save,
  Link,
  FileText,
  Shield,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface ProfileData {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string | null;
  avatar_url: string | null;
  headline: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  skills: string[];
  interests: string[];
  languages: string[];
  company: string | null;
  job_title: string | null;
  date_of_birth: string | null;
  pronouns: string | null;
  timezone: string | null;
  availability_status: string | null;
  is_verified: boolean | null;
  member_label: string | null;
  created_at: string;
}

interface EnhancedProfileSectionProps {
  userId: string;
}

const EnhancedProfileSection: React.FC<EnhancedProfileSectionProps> = ({
  userId,
}) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "social", label: "Social Links", icon: Link },
    { id: "skills", label: "Skills & Interests", icon: Code },
  ];

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      setProfile(data as ProfileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    if (!profile) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("user_id", userId);

      if (error) throw error;

      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      toast.success("Profile updated");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    try {
      setSaving(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      await updateProfile({ avatar_url: urlData.publicUrl });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar");
    } finally {
      setSaving(false);
    }
  };

  const addItem = (type: "skills" | "interests" | "languages", value: string) => {
    if (!value.trim() || !profile) return;

    const currentItems = profile[type] || [];
    if (currentItems.includes(value.trim())) {
      toast.error(`${value} already exists`);
      return;
    }

    const newItems = [...currentItems, value.trim()];
    updateProfile({ [type]: newItems });

    if (type === "skills") setNewSkill("");
    else if (type === "interests") setNewInterest("");
    else setNewLanguage("");
  };

  const removeItem = (type: "skills" | "interests" | "languages", value: string) => {
    if (!profile) return;
    const newItems = (profile[type] || []).filter((item) => item !== value);
    updateProfile({ [type]: newItems });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 min-h-screen overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-48 relative">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10 pb-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={
                    profile.avatar_url ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${profile.first_name}`
                  }
                  alt={profile.first_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
              {profile.is_verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900">
                      {profile.first_name} {profile.last_name}
                    </h1>
                    {profile.pronouns && (
                      <span className="text-sm text-slate-500">
                        ({profile.pronouns})
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 mt-0.5">@{profile.username}</p>
                  {profile.headline && (
                    <p className="text-lg text-slate-700 mt-2">
                      {profile.headline}
                    </p>
                  )}
                  {profile.member_label && (
                    <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      <Sparkles className="w-3 h-3" />
                      {profile.member_label}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all"
                >
                  {editMode ? (
                    <>
                      <Check className="w-4 h-4" />
                      Done Editing
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                {profile.job_title && profile.company && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {profile.job_title} at {profile.company}
                  </span>
                )}
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {(profile.bio || editMode) && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              {editMode ? (
                <textarea
                  value={profile.bio || ""}
                  onChange={(e) =>
                    setProfile((prev) =>
                      prev ? { ...prev, bio: e.target.value } : null
                    )
                  }
                  onBlur={() => updateProfile({ bio: profile.bio })}
                  placeholder="Write a short bio about yourself..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              ) : (
                <p className="text-slate-600">{profile.bio}</p>
              )}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Contact Info */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium text-slate-900">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Phone</p>
                      {editMode ? (
                        <input
                          type="tel"
                          value={profile.phone_number || ""}
                          onChange={(e) =>
                            setProfile((prev) =>
                              prev ? { ...prev, phone_number: e.target.value } : null
                            )
                          }
                          onBlur={() =>
                            updateProfile({ phone_number: profile.phone_number })
                          }
                          className="w-full px-2 py-1 border border-slate-200 rounded-lg"
                          placeholder="Add phone number"
                        />
                      ) : (
                        <p className="font-medium text-slate-900">
                          {profile.phone_number || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Location</p>
                      {editMode ? (
                        <input
                          type="text"
                          value={profile.location || ""}
                          onChange={(e) =>
                            setProfile((prev) =>
                              prev ? { ...prev, location: e.target.value } : null
                            )
                          }
                          onBlur={() => updateProfile({ location: profile.location })}
                          className="w-full px-2 py-1 border border-slate-200 rounded-lg"
                          placeholder="City, Country"
                        />
                      ) : (
                        <p className="font-medium text-slate-900">
                          {profile.location || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Personal Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">First Name</p>
                      {editMode ? (
                        <input
                          type="text"
                          value={profile.first_name}
                          onChange={(e) =>
                            setProfile((prev) =>
                              prev ? { ...prev, first_name: e.target.value } : null
                            )
                          }
                          onBlur={() =>
                            updateProfile({ first_name: profile.first_name })
                          }
                          className="w-full px-2 py-1 border border-slate-200 rounded-lg"
                        />
                      ) : (
                        <p className="font-medium text-slate-900">
                          {profile.first_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Last Name</p>
                      {editMode ? (
                        <input
                          type="text"
                          value={profile.last_name}
                          onChange={(e) =>
                            setProfile((prev) =>
                              prev ? { ...prev, last_name: e.target.value } : null
                            )
                          }
                          onBlur={() =>
                            updateProfile({ last_name: profile.last_name })
                          }
                          className="w-full px-2 py-1 border border-slate-200 rounded-lg"
                        />
                      ) : (
                        <p className="font-medium text-slate-900">
                          {profile.last_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Username</p>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) =>
                          setProfile((prev) =>
                            prev ? { ...prev, username: e.target.value } : null
                          )
                        }
                        onBlur={() => updateProfile({ username: profile.username })}
                        className="w-full px-2 py-1 border border-slate-200 rounded-lg"
                      />
                    ) : (
                      <p className="font-medium text-slate-900">
                        @{profile.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Pronouns</p>
                    {editMode ? (
                      <select
                        value={profile.pronouns || ""}
                        onChange={(e) =>
                          updateProfile({ pronouns: e.target.value || null })
                        }
                        className="w-full px-2 py-1 border border-slate-200 rounded-lg"
                      >
                        <option value="">Prefer not to say</option>
                        <option value="he/him">he/him</option>
                        <option value="she/her">she/her</option>
                        <option value="they/them">they/them</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="font-medium text-slate-900">
                        {profile.pronouns || "Not specified"}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Timezone</p>
                    {editMode ? (
                      <select
                        value={profile.timezone || "Africa/Nairobi"}
                        onChange={(e) => updateProfile({ timezone: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-200 rounded-lg"
                      >
                        <option value="Africa/Nairobi">East Africa Time (EAT)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">GMT/BST</option>
                        <option value="Europe/Paris">Central European Time</option>
                        <option value="Asia/Dubai">Gulf Standard Time</option>
                        <option value="Asia/Kolkata">India Standard Time</option>
                      </select>
                    ) : (
                      <p className="font-medium text-slate-900">
                        {profile.timezone || "Africa/Nairobi"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "professional" && (
            <motion.div
              key="professional"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <h3 className="font-semibold text-slate-900 mb-6">
                Professional Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={profile.headline || ""}
                    onChange={(e) =>
                      setProfile((prev) =>
                        prev ? { ...prev, headline: e.target.value } : null
                      )
                    }
                    onBlur={() => updateProfile({ headline: profile.headline })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Full Stack Developer | Open Source Enthusiast"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={profile.job_title || ""}
                    onChange={(e) =>
                      setProfile((prev) =>
                        prev ? { ...prev, job_title: e.target.value } : null
                      )
                    }
                    onBlur={() => updateProfile({ job_title: profile.job_title })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={profile.company || ""}
                    onChange={(e) =>
                      setProfile((prev) =>
                        prev ? { ...prev, company: e.target.value } : null
                      )
                    }
                    onBlur={() => updateProfile({ company: profile.company })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Teksoft"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Website
                  </label>
                  <input
                    type="url"
                    value={profile.website || ""}
                    onChange={(e) =>
                      setProfile((prev) =>
                        prev ? { ...prev, website: e.target.value } : null
                      )
                    }
                    onBlur={() => updateProfile({ website: profile.website })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Availability Status
                  </label>
                  <select
                    value={profile.availability_status || "available"}
                    onChange={(e) =>
                      updateProfile({ availability_status: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">Available for opportunities</option>
                    <option value="open">Open to networking</option>
                    <option value="busy">Currently busy</option>
                    <option value="not_looking">Not looking</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "social" && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <h3 className="font-semibold text-slate-900 mb-6">Social Links</h3>
              <div className="space-y-4">
                {[
                  {
                    key: "github_url",
                    label: "GitHub",
                    icon: Github,
                    placeholder: "https://github.com/username",
                    color: "bg-slate-900",
                  },
                  {
                    key: "linkedin_url",
                    label: "LinkedIn",
                    icon: Linkedin,
                    placeholder: "https://linkedin.com/in/username",
                    color: "bg-blue-700",
                  },
                  {
                    key: "twitter_url",
                    label: "Twitter / X",
                    icon: Twitter,
                    placeholder: "https://twitter.com/username",
                    color: "bg-sky-500",
                  },
                ].map((social) => (
                  <div
                    key={social.key}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl"
                  >
                    <div
                      className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center`}
                    >
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium text-slate-700 mb-1 block">
                        {social.label}
                      </label>
                      <input
                        type="url"
                        value={
                          (profile[social.key as keyof ProfileData] as string) || ""
                        }
                        onChange={(e) =>
                          setProfile((prev) =>
                            prev ? { ...prev, [social.key]: e.target.value } : null
                          )
                        }
                        onBlur={() =>
                          updateProfile({
                            [social.key]: profile[social.key as keyof ProfileData],
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={social.placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Skills */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Skills</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && addItem("skills", newSkill)
                      }
                      className="px-3 py-1 border border-slate-200 rounded-lg text-sm"
                      placeholder="Add skill..."
                    />
                    <button
                      onClick={() => addItem("skills", newSkill)}
                      className="p-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      <Code className="w-3 h-3" />
                      {skill}
                      <button
                        onClick={() => removeItem("skills", skill)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {(profile.skills || []).length === 0 && (
                    <p className="text-slate-500 text-sm">
                      No skills added yet. Add some to showcase your expertise!
                    </p>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Interests</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && addItem("interests", newInterest)
                      }
                      className="px-3 py-1 border border-slate-200 rounded-lg text-sm"
                      placeholder="Add interest..."
                    />
                    <button
                      onClick={() => addItem("interests", newInterest)}
                      className="p-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile.interests || []).map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      <Heart className="w-3 h-3" />
                      {interest}
                      <button
                        onClick={() => removeItem("interests", interest)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {(profile.interests || []).length === 0 && (
                    <p className="text-slate-500 text-sm">
                      Share your interests with the community!
                    </p>
                  )}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Languages</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && addItem("languages", newLanguage)
                      }
                      className="px-3 py-1 border border-slate-200 rounded-lg text-sm"
                      placeholder="Add language..."
                    />
                    <button
                      onClick={() => addItem("languages", newLanguage)}
                      className="p-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile.languages || []).map((language) => (
                    <span
                      key={language}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      <Languages className="w-3 h-3" />
                      {language}
                      <button
                        onClick={() => removeItem("languages", language)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {(profile.languages || []).length === 0 && (
                    <p className="text-slate-500 text-sm">
                      What languages do you speak?
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedProfileSection;
