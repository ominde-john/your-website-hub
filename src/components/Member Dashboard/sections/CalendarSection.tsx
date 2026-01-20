import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Loader2, ChevronLeft, ChevronRight, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  start_time: string;
  end_time: string | null;
  all_day: boolean;
  location: string | null;
  color: string;
  created_at: string;
}

interface CalendarSectionProps {
  userId: string;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ userId }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "meeting",
    start_time: "",
    end_time: "",
    all_day: false,
    location: "",
    color: "#3b82f6"
  });

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("member_calendar_events")
        .select("*")
        .eq("user_id", userId)
        .order("start_time", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Real-time subscription
    const channel = supabase
      .channel("calendar-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "member_calendar_events" }, () => {
        fetchEvents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        const { error } = await supabase
          .from("member_calendar_events")
          .update({
            title: formData.title,
            description: formData.description || null,
            event_type: formData.event_type,
            start_time: formData.start_time,
            end_time: formData.end_time || null,
            all_day: formData.all_day,
            location: formData.location || null,
            color: formData.color
          })
          .eq("id", editingEvent.id);

        if (error) throw error;
        toast.success("Event updated!");
      } else {
        const { error } = await supabase
          .from("member_calendar_events")
          .insert({
            user_id: userId,
            title: formData.title,
            description: formData.description || null,
            event_type: formData.event_type,
            start_time: formData.start_time,
            end_time: formData.end_time || null,
            all_day: formData.all_day,
            location: formData.location || null,
            color: formData.color
          });

        if (error) throw error;
        toast.success("Event created!");
      }

      setDialogOpen(false);
      setEditingEvent(null);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Failed to save event");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      event_type: "meeting",
      start_time: "",
      end_time: "",
      all_day: false,
      location: "",
      color: "#3b82f6"
    });
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || "",
      event_type: event.event_type,
      start_time: event.start_time.slice(0, 16),
      end_time: event.end_time?.slice(0, 16) || "",
      all_day: event.all_day,
      location: event.location || "",
      color: event.color
    });
    setDialogOpen(true);
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    
    try {
      const { error } = await supabase
        .from("member_calendar_events")
        .delete()
        .eq("id", eventId);

      if (error) throw error;
      toast.success("Event deleted!");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-100 text-blue-700 border-blue-200";
      case "deadline": return "bg-red-100 text-red-700 border-red-200";
      case "reminder": return "bg-amber-100 text-amber-700 border-amber-200";
      case "event": return "bg-purple-100 text-purple-700 border-purple-200";
      case "task": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // Get days in current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty slots for days before first day
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start_time);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  // Get upcoming events (next 7 days)
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.start_time);
      const now = new Date();
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return eventDate >= now && eventDate <= weekFromNow;
    })
    .slice(0, 5);

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
            <p className="text-slate-500">Manage your schedule and events</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingEvent(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Event title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Event description"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Type</label>
                    <Select value={formData.event_type} onValueChange={(value) => setFormData({ ...formData, event_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Color</label>
                    <Input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Start Time</label>
                    <Input
                      type="datetime-local"
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">End Time</label>
                    <Input
                      type="datetime-local"
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Event location (optional)"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.all_day}
                    onChange={(e) => setFormData({ ...formData, all_day: e.target.checked })}
                    className="rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">All day event</span>
                </label>
                <Button type="submit" className="w-full">
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-slate-900">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth().map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-20" />;
                }

                const dayEvents = getEventsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={index}
                    className={`h-20 p-1 border rounded-lg ${
                      isToday ? "border-primary bg-primary/5" : "border-slate-100"
                    }`}
                  >
                    <div className={`text-xs font-medium mb-1 ${isToday ? "text-primary" : "text-slate-600"}`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="text-xs px-1 py-0.5 rounded truncate"
                          style={{ backgroundColor: `${event.color}20`, color: event.color }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-slate-500 px-1">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Upcoming Events</h3>
            
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No upcoming events</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-3 rounded-xl border ${getEventTypeColor(event.event_type)}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 hover:bg-white/50 rounded">
                            <MoreVertical className="w-3 h-3" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(event)}>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(event.id)} className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-1 text-xs opacity-80">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(event.start_time).toLocaleDateString()} at{" "}
                        {new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1 text-xs opacity-80 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
