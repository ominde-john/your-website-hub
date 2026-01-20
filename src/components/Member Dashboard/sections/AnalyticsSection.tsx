import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, MessageSquare, Calendar, FileText, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

interface AnalyticsSectionProps {
  userId: string;
}

interface Stats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalEvents: number;
  upcomingEvents: number;
  totalMessages: number;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ userId }) => {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch projects stats
        const { data: projects } = await supabase
          .from("member_projects")
          .select("status")
          .eq("user_id", userId);

        // Fetch tasks stats
        const { data: tasks } = await supabase
          .from("member_tasks")
          .select("status")
          .eq("user_id", userId);

        // Fetch calendar events stats
        const { data: events } = await supabase
          .from("member_calendar_events")
          .select("start_time")
          .eq("user_id", userId);

        // Fetch messages count
        const { count: messagesCount } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

        const now = new Date();

        setStats({
          totalProjects: projects?.length || 0,
          activeProjects: projects?.filter(p => p.status === "active").length || 0,
          completedProjects: projects?.filter(p => p.status === "completed").length || 0,
          totalTasks: tasks?.length || 0,
          completedTasks: tasks?.filter(t => t.status === "completed").length || 0,
          pendingTasks: tasks?.filter(t => t.status !== "completed").length || 0,
          totalEvents: events?.length || 0,
          upcomingEvents: events?.filter(e => new Date(e.start_time) >= now).length || 0,
          totalMessages: messagesCount || 0
        });

        // Log analytics event
        await supabase.from("member_analytics").insert({
          user_id: userId,
          event_type: "dashboard_view",
          event_data: { timestamp: now.toISOString() }
        });

      } catch (error) {
        console.error("Error fetching analytics:", error);
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId]);

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FileText,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: BarChart3,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "+23%",
      trendUp: true
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: FileText,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      trend: "-8%",
      trendUp: false
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: Calendar,
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      trend: "+15%",
      trendUp: true
    },
    {
      title: "Total Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
      trend: "+45%",
      trendUp: true
    }
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-500">Overview of your activity and progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <card.icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${card.trendUp ? "text-emerald-600" : "text-red-500"}`}>
                  {card.trendUp ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {card.trend}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{card.value}</h3>
              <p className="text-sm text-slate-500">{card.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Projects Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Active</span>
                  <span className="font-medium">{stats.activeProjects}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    style={{ width: stats.totalProjects ? `${(stats.activeProjects / stats.totalProjects) * 100}%` : "0%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Completed</span>
                  <span className="font-medium">{stats.completedProjects}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: stats.totalProjects ? `${(stats.completedProjects / stats.totalProjects) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Tasks Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Completed</span>
                  <span className="font-medium">{stats.completedTasks}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                    style={{ width: stats.totalTasks ? `${(stats.completedTasks / stats.totalTasks) * 100}%` : "0%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Pending</span>
                  <span className="font-medium">{stats.pendingTasks}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    style={{ width: stats.totalTasks ? `${(stats.pendingTasks / stats.totalTasks) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            </div>

            {/* Task Completion Rate */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Completion Rate</span>
                <span className="text-2xl font-bold text-slate-900">
                  {stats.totalTasks ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{stats.totalProjects}</p>
              <p className="text-sm text-slate-500">Total Projects</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{stats.totalTasks}</p>
              <p className="text-sm text-slate-500">Total Tasks</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{stats.totalEvents}</p>
              <p className="text-sm text-slate-500">Calendar Events</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{stats.totalMessages}</p>
              <p className="text-sm text-slate-500">Messages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
