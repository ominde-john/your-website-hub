import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  MessageSquare,
  Calendar,
  FileText,
  Users,
  AlertCircle,
  Info,
  Star,
  Settings,
  Loader2,
  BellOff,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  action_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

interface NotificationsSectionProps {
  userId: string;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-5 h-5" />;
      case "calendar":
        return <Calendar className="w-5 h-5" />;
      case "task":
        return <FileText className="w-5 h-5" />;
      case "team":
        return <Users className="w-5 h-5" />;
      case "alert":
        return <AlertCircle className="w-5 h-5" />;
      case "system":
        return <Settings className="w-5 h-5" />;
      case "achievement":
        return <Star className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-600";
      case "calendar":
        return "bg-purple-100 text-purple-600";
      case "task":
        return "bg-amber-100 text-amber-600";
      case "team":
        return "bg-emerald-100 text-emerald-600";
      case "alert":
        return "bg-red-100 text-red-600";
      case "achievement":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotifications((data as Notification[]) || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Real-time subscription
    const channel = supabase
      .channel("notifications-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", id);

      if (error) throw error;

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", userId)
        .eq("read", false);

      if (error) throw error;

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to mark all as read");
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setNotifications((prev) => prev.filter((n) => n.id !== id));
      toast.success("Notification deleted");
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const clearAll = async () => {
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("user_id", userId);

      if (error) throw error;

      setNotifications([]);
      toast.success("All notifications cleared");
    } catch (error) {
      console.error("Error clearing notifications:", error);
      toast.error("Failed to clear notifications");
    }
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
            <p className="text-slate-500 mt-1">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "You're all caught up!"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filter === "unread"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Unread
              </button>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellOff className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              {filter === "unread" ? "No unread notifications" : "No notifications yet"}
            </h3>
            <p className="text-slate-500">
              {filter === "unread"
                ? "You've read all your notifications"
                : "When you get notifications, they'll show up here"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  layout
                  className={`bg-white rounded-xl border ${
                    notification.read
                      ? "border-slate-200"
                      : "border-blue-200 bg-blue-50/30"
                  } p-4 hover:shadow-md transition-all group`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getNotificationColor(
                        notification.type
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1.5 hover:bg-slate-100 rounded-lg transition-all"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4 text-slate-500" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0 mt-2" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsSection;
