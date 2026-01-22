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
import { useLanguage, languageNames, Language } from "@/i18n";

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
  const { language, setLanguage, t } = useLanguage();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("appearance");

  const sections = [
    { id: "appearance", label: t.settings.appearance, icon: Moon },
    { id: "notifications", label: t.settings.notifications, icon: Bell },
    { id: "privacy", label: t.settings.privacy, icon: Eye },
    { id: "security", label: t.settings.security, icon: Shield },
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
      toast.error(t.settings.failedToLoad);
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
      toast.success(t.settings.settingUpdated);
    } catch (error) {
      console.error("Error updating setting:", error);
      toast.error(t.settings.failedToUpdate);
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Note: setLanguage already handles database persistence
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
        enabled ? "bg-techgold" : "bg-slate-300"
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
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-techgold" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t.settings.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {t.settings.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                    activeSection === section.id
                      ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-l-4 border-techgold"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border-l-4 border-transparent"
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
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                  {t.settings.appearance}
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      {t.settings.theme}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "light", label: t.settings.light, icon: Sun },
                        { id: "dark", label: t.settings.dark, icon: Moon },
                        { id: "system", label: t.settings.system, icon: Monitor },
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
                              ? "border-techgold bg-amber-50 dark:bg-amber-900/30"
                              : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                          }`}
                        >
                          <theme.icon className={`w-6 h-6 ${settings?.theme === theme.id ? "text-techgold" : "text-slate-600 dark:text-slate-400"}`} />
                          <span className={`text-sm font-medium ${settings?.theme === theme.id ? "text-techgold" : "text-slate-700 dark:text-slate-300"}`}>
                            {theme.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      {t.settings.language}
                    </h3>
                    <select
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value as Language)}
                      className="w-full max-w-xs px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-techgold focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      {(Object.keys(languageNames) as Language[]).map((lang) => (
                        <option key={lang} value={lang}>
                          {languageNames[lang]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                  {t.notificationSettings.title}
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                      {t.notificationSettings.channels}
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "email_notifications",
                          label: t.notificationSettings.emailNotifications,
                          desc: t.notificationSettings.emailNotificationsDesc,
                          icon: Mail,
                        },
                        {
                          key: "push_notifications",
                          label: t.notificationSettings.pushNotifications,
                          desc: t.notificationSettings.pushNotificationsDesc,
                          icon: Bell,
                        },
                        {
                          key: "sms_notifications",
                          label: t.notificationSettings.smsNotifications,
                          desc: t.notificationSettings.smsNotificationsDesc,
                          icon: Smartphone,
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white dark:bg-slate-600 rounded-lg flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-slate-100">
                                {item.label}
                              </p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
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

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                      {t.notificationSettings.activityNotifications}
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "message_notifications",
                          label: t.notificationSettings.messages,
                          desc: t.notificationSettings.messagesDesc,
                        },
                        {
                          key: "task_reminders",
                          label: t.notificationSettings.taskReminders,
                          desc: t.notificationSettings.taskRemindersDesc,
                        },
                        {
                          key: "calendar_reminders",
                          label: t.notificationSettings.calendarReminders,
                          desc: t.notificationSettings.calendarRemindersDesc,
                        },
                        {
                          key: "weekly_digest",
                          label: t.notificationSettings.weeklyDigest,
                          desc: t.notificationSettings.weeklyDigestDesc,
                        },
                        {
                          key: "marketing_emails",
                          label: t.notificationSettings.marketingEmails,
                          desc: t.notificationSettings.marketingEmailsDesc,
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between py-3"
                        >
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                              {item.label}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
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
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                  {t.privacySettings.title}
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                      {t.privacySettings.profileVisibility}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "public", label: t.privacySettings.public, desc: t.privacySettings.publicDesc },
                        {
                          id: "members",
                          label: t.privacySettings.membersOnly,
                          desc: t.privacySettings.membersOnlyDesc,
                        },
                        { id: "private", label: t.privacySettings.private, desc: t.privacySettings.privateDesc },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateSetting("profile_visibility", option.id)
                          }
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            settings?.profile_visibility === option.id
                              ? "border-techgold bg-amber-50 dark:bg-amber-900/30"
                              : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                          }`}
                        >
                          <p className={`font-medium ${settings?.profile_visibility === option.id ? "text-techgold" : "text-slate-900 dark:text-slate-100"}`}>
                            {option.label}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {option.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                      {t.privacySettings.activityStatus}
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "show_online_status",
                          label: t.privacySettings.showOnlineStatus,
                          desc: t.privacySettings.showOnlineStatusDesc,
                        },
                        {
                          key: "show_read_receipts",
                          label: t.privacySettings.readReceipts,
                          desc: t.privacySettings.readReceiptsDesc,
                        },
                        {
                          key: "show_typing_indicator",
                          label: t.privacySettings.typingIndicator,
                          desc: t.privacySettings.typingIndicatorDesc,
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between py-3"
                        >
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                              {item.label}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
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
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                    {t.securitySettings.title}
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white dark:bg-slate-600 rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {t.securitySettings.twoFactorAuth}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t.securitySettings.twoFactorAuthDesc}
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

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {t.securitySettings.sessionTimeout}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {t.securitySettings.sessionTimeoutDesc}
                        </p>
                      </div>
                      <select
                        value={settings?.session_timeout || 30}
                        onChange={(e) =>
                          updateSetting("session_timeout", parseInt(e.target.value))
                        }
                        className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      >
                        <option value={15}>15 {t.securitySettings.minutes}</option>
                        <option value={30}>30 {t.securitySettings.minutes}</option>
                        <option value={60}>1 {t.securitySettings.hour}</option>
                        <option value={120}>2 {t.securitySettings.hours}</option>
                        <option value={0}>{t.securitySettings.never}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-900/50 p-6">
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                    {t.securitySettings.dangerZone}
                  </h3>
                  <div className="space-y-3">
                    <button className="flex items-center gap-3 w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-left">
                      <LogOut className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {t.securitySettings.signOutAllDevices}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {t.securitySettings.signOutAllDevicesDesc}
                        </p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 w-full p-4 border border-red-200 dark:border-red-900/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-all text-left">
                      <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <div>
                        <p className="font-medium text-red-600 dark:text-red-400">{t.securitySettings.deleteAccount}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {t.securitySettings.deleteAccountDesc}
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
