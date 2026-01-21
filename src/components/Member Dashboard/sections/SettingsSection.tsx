import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Settings,
  Bell,
  Shield,
  Eye,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Calendar,
  Lock,
  LogOut,
  Trash2,
  ChevronRight,
  Loader2,
  Check,
  Monitor,
} from "lucide-react";
import { toast } from "sonner";

interface UserSettings {
  id: string;
  user_id: string;
  theme: string;
  language: string;
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  message_notifications: boolean;
  task_reminders: boolean;
  calendar_reminders: boolean;
  weekly_digest: boolean;
  marketing_emails: boolean;
  show_online_status: boolean;
  show_read_receipts: boolean;
  show_typing_indicator: boolean;
  profile_visibility: string;
  two_factor_enabled: boolean;
  session_timeout: number;
}

interface SettingsSectionProps {
  userId: string;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  userId,
  darkMode,
  setDarkMode,
}) => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("appearance");

  const sections = [
    { id: "appearance", label: "Appearance", icon: Moon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Eye },
    { id: "security", label: "Security", icon: Shield },
  ];

  useEffect(() => {
    fetchSettings();
  }, [userId]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No settings found, create default
          const { data: newData, error: insertError } = await supabase
            .from("user_settings")
            .insert({ user_id: userId })
            .select()
            .single();

          if (insertError) throw insertError;
          setSettings(newData as UserSettings);
        } else {
          throw error;
        }
      } else {
        setSettings(data as UserSettings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof UserSettings, value: unknown) => {
    if (!settings) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from("user_settings")
        .update({ [key]: value, updated_at: new Date().toISOString() })
        .eq("user_id", userId);

      if (error) throw error;

      setSettings((prev) => (prev ? { ...prev, [key]: value } : null));
      toast.success("Setting updated");
    } catch (error) {
      console.error("Error updating setting:", error);
      toast.error("Failed to update setting");
    } finally {
      setSaving(false);
    }
  };

  const ToggleSwitch = ({
    enabled,
    onChange,
    disabled = false,
  }: {
    enabled: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
  }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative w-12 h-6 rounded-full transition-all ${
        enabled ? "bg-blue-600" : "bg-slate-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
          enabled ? "left-7" : "left-1"
        }`}
      />
    </button>
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-1">
            Manage your account preferences and privacy
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            {activeSection === "appearance" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                  Appearance
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3">
                      Theme
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "light", label: "Light", icon: Sun },
                        { id: "dark", label: "Dark", icon: Moon },
                        { id: "system", label: "System", icon: Monitor },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => {
                            updateSetting("theme", theme.id);
                            if (theme.id === "dark") setDarkMode(true);
                            else if (theme.id === "light") setDarkMode(false);
                          }}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            settings?.theme === theme.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <theme.icon className="w-6 h-6" />
                          <span className="text-sm font-medium">
                            {theme.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-medium text-slate-700 mb-3">
                      Language
                    </h3>
                    <select
                      value={settings?.language || "en"}
                      onChange={(e) => updateSetting("language", e.target.value)}
                      className="w-full max-w-xs px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="sw">Swahili</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-4">
                      Notification Channels
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "email_notifications",
                          label: "Email Notifications",
                          desc: "Receive notifications via email",
                          icon: Mail,
                        },
                        {
                          key: "push_notifications",
                          label: "Push Notifications",
                          desc: "Browser and mobile push notifications",
                          icon: Bell,
                        },
                        {
                          key: "sms_notifications",
                          label: "SMS Notifications",
                          desc: "Receive text message alerts",
                          icon: Smartphone,
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {item.label}
                              </p>
                              <p className="text-sm text-slate-500">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <ToggleSwitch
                            enabled={
                              settings?.[item.key as keyof UserSettings] as boolean
                            }
                            onChange={(value) =>
                              updateSetting(item.key as keyof UserSettings, value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-medium text-slate-700 mb-4">
                      Activity Notifications
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "message_notifications",
                          label: "Messages",
                          desc: "New messages and chat activity",
                        },
                        {
                          key: "task_reminders",
                          label: "Task Reminders",
                          desc: "Upcoming and overdue tasks",
                        },
                        {
                          key: "calendar_reminders",
                          label: "Calendar Reminders",
                          desc: "Event reminders and updates",
                        },
                        {
                          key: "weekly_digest",
                          label: "Weekly Digest",
                          desc: "Summary of your weekly activity",
                        },
                        {
                          key: "marketing_emails",
                          label: "Marketing Emails",
                          desc: "Product updates and announcements",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between py-3"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {item.label}
                            </p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </div>
                          <ToggleSwitch
                            enabled={
                              settings?.[item.key as keyof UserSettings] as boolean
                            }
                            onChange={(value) =>
                              updateSetting(item.key as keyof UserSettings, value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "privacy" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                  Privacy Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-4">
                      Profile Visibility
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "public", label: "Public", desc: "Anyone can see" },
                        {
                          id: "members",
                          label: "Members Only",
                          desc: "Only members",
                        },
                        { id: "private", label: "Private", desc: "Only you" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateSetting("profile_visibility", option.id)
                          }
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            settings?.profile_visibility === option.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <p className="font-medium text-slate-900">
                            {option.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {option.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-medium text-slate-700 mb-4">
                      Activity Status
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "show_online_status",
                          label: "Show Online Status",
                          desc: "Let others see when you're online",
                        },
                        {
                          key: "show_read_receipts",
                          label: "Read Receipts",
                          desc: "Show when you've read messages",
                        },
                        {
                          key: "show_typing_indicator",
                          label: "Typing Indicator",
                          desc: "Show when you're typing a message",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between py-3"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {item.label}
                            </p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </div>
                          <ToggleSwitch
                            enabled={
                              settings?.[item.key as keyof UserSettings] as boolean
                            }
                            onChange={(value) =>
                              updateSetting(item.key as keyof UserSettings, value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            Two-Factor Authentication
                          </p>
                          <p className="text-sm text-slate-500">
                            Add an extra layer of security
                          </p>
                        </div>
                      </div>
                      <ToggleSwitch
                        enabled={settings?.two_factor_enabled || false}
                        onChange={(value) =>
                          updateSetting("two_factor_enabled", value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">
                          Session Timeout
                        </p>
                        <p className="text-sm text-slate-500">
                          Auto-logout after inactivity
                        </p>
                      </div>
                      <select
                        value={settings?.session_timeout || 30}
                        onChange={(e) =>
                          updateSetting("session_timeout", parseInt(e.target.value))
                        }
                        className="px-3 py-2 border border-slate-200 rounded-lg"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={0}>Never</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-red-200 p-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">
                    Danger Zone
                  </h3>
                  <div className="space-y-3">
                    <button className="flex items-center gap-3 w-full p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left">
                      <LogOut className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">
                          Sign out all devices
                        </p>
                        <p className="text-sm text-slate-500">
                          End all active sessions
                        </p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 w-full p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-all text-left">
                      <Trash2 className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-600">Delete Account</p>
                        <p className="text-sm text-slate-500">
                          Permanently delete your account
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
