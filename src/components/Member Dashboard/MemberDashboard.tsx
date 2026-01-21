import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import { useOnlinePresence } from "@/hooks/useOnlinePresence";
import { useNotificationSound } from "@/hooks/useNotificationSound";
import { Sidebar } from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import MessagePanel from "./MessagePanel";
import Chat from "./Chat";
import ProjectsSection from "./sections/ProjectsSection";
import CalendarSection from "./sections/CalendarSection";
import TasksSection from "./sections/TasksSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import NotificationsSection from "./sections/NotificationsSection";
import SettingsSection from "./sections/SettingsSection";
import EnhancedProfileSection from "./sections/EnhancedProfileSection";
import { Message, StatCard, Conversation, User } from "./types";
import { Loader2, Users } from "lucide-react";
import { toast } from "sonner";

interface DBMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

interface DBProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar_url: string | null;
  last_seen: string | null;
  is_verified: boolean | null;
  member_label: string | null;
}

const MemberDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<DBProfile | null>(null);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [profiles, setProfiles] = useState<Map<string, DBProfile>>(new Map());
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const { getUnreadCount } = useUnreadMessages(user?.id);
  const { isUserOnline } = useOnlinePresence(user?.id);
  const { playNotification } = useNotificationSound();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch current user profile
  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data && !error) {
        setCurrentUserProfile(data);
      }
    };

    fetchCurrentUserProfile();
  }, [user]);

  // Fetch all profiles for mapping
  const fetchProfiles = useCallback(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*");

    if (data && !error) {
      const profileMap = new Map<string, DBProfile>();
      data.forEach((p) => profileMap.set(p.user_id, p));
      setProfiles(profileMap);
    }
  }, []);

  // Fetch conversations (unique chat partners with last message)
  const fetchConversations = useCallback(async () => {
    if (!user) return;

    try {
      setLoadingConversations(true);

      // Fetch all messages involving current user
      const { data: allMessages, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Group by conversation partner
      const conversationMap = new Map<string, { 
        partnerId: string; 
        lastMessage: string; 
        timestamp: string;
        unreadCount: number;
      }>();

      allMessages?.forEach((msg) => {
        const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
        
        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            partnerId,
            lastMessage: msg.content,
            timestamp: msg.created_at,
            unreadCount: 0,
          });
        }
        
        // Count unread messages from this partner
        if (msg.sender_id === partnerId && !msg.read) {
          const conv = conversationMap.get(partnerId)!;
          conv.unreadCount++;
        }
      });

      // Build conversation list with profile data
      const convList: Conversation[] = [];
      conversationMap.forEach((conv) => {
        const profile = profiles.get(conv.partnerId);
        if (profile) {
          convList.push({
            id: conv.partnerId,
            name: `${profile.first_name} ${profile.last_name}`.trim() || profile.username,
            avatar: profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.first_name}`,
            lastMessage: conv.lastMessage,
            unreadCount: conv.unreadCount,
            isOnline: isUserOnline(conv.partnerId),
          });
        }
      });

      // Sort by timestamp (most recent first)
      setConversations(convList);

      // Auto-select first conversation if none selected
      if (!selectedConversationId && convList.length > 0) {
        setSelectedConversationId(convList[0].id);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoadingConversations(false);
    }
  }, [user, profiles, isUserOnline, selectedConversationId]);

  // Fetch messages for selected conversation
  const fetchMessages = useCallback(async () => {
    if (!user || !selectedConversationId) return;

    try {
      setLoadingMessages(true);

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${selectedConversationId}),and(sender_id.eq.${selectedConversationId},receiver_id.eq.${user.id})`
        )
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Transform DB messages to component Message format
      const transformedMessages: Message[] = (data || []).map((msg) => {
        const senderProfile = profiles.get(msg.sender_id);
        return {
          id: msg.id,
          senderId: msg.sender_id,
          senderName: senderProfile 
            ? `${senderProfile.first_name} ${senderProfile.last_name}`.trim() 
            : "Unknown",
          text: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          read: msg.read,
        };
      });

      setMessages(transformedMessages);

      // Mark messages as read
      await supabase
        .from("messages")
        .update({ read: true })
        .eq("sender_id", selectedConversationId)
        .eq("receiver_id", user.id)
        .eq("read", false);

    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  }, [user, selectedConversationId, profiles]);

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user, fetchProfiles]);

  // Fetch conversations when profiles are loaded
  useEffect(() => {
    if (profiles.size > 0) {
      fetchConversations();
    }
  }, [profiles, fetchConversations]);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages();
    }
  }, [selectedConversationId, fetchMessages]);

  // Real-time subscription for new messages
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("dashboard-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMsg = payload.new as DBMessage;
          
          // Check if message is relevant to current user
          if (newMsg.sender_id === user.id || newMsg.receiver_id === user.id) {
            // If it's in the current conversation, add to messages
            if (
              selectedConversationId &&
              (newMsg.sender_id === selectedConversationId || newMsg.receiver_id === selectedConversationId)
            ) {
              const senderProfile = profiles.get(newMsg.sender_id);
              const transformedMessage: Message = {
                id: newMsg.id,
                senderId: newMsg.sender_id,
                senderName: senderProfile
                  ? `${senderProfile.first_name} ${senderProfile.last_name}`.trim()
                  : "Unknown",
                text: newMsg.content,
                timestamp: new Date(newMsg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                read: newMsg.read,
              };
              
              setMessages((prev) => [...prev, transformedMessage]);
              
              // Play sound for incoming messages
              if (newMsg.sender_id !== user.id) {
                playNotification();
              }
            }
            
            // Refresh conversations list
            fetchConversations();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, selectedConversationId, profiles, fetchConversations, playNotification]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!messageText.trim() || !user || !selectedConversationId) return;

    try {
      const { error } = await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: selectedConversationId,
        content: messageText.trim(),
      });

      if (error) {
        toast.error("Failed to send message");
        console.error(error);
        return;
      }

      setMessageText("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    }
  };

  // Get current user for MessagePanel
  const currentUser: User = currentUserProfile
    ? {
        id: currentUserProfile.user_id,
        name: `${currentUserProfile.first_name} ${currentUserProfile.last_name}`.trim() || currentUserProfile.username,
        role: currentUserProfile.member_label || "Member",
        avatar: currentUserProfile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUserProfile.first_name}`,
        online: true,
        unreadCount: 0,
      }
    : {
        id: user?.id || "",
        name: "Loading...",
        role: "Member",
        avatar: "",
        online: true,
        unreadCount: 0,
      };

  // Get selected conversation details
  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  // Stats for dashboard
  const stats: StatCard[] = [
    {
      id: "conversations",
      value: conversations.length,
      label: "Conversations",
      color: "cyan",
      icon: "message",
    },
    {
      id: "members",
      value: profiles.size,
      label: "Members",
      color: "emerald",
      icon: "users",
    },
    {
      id: "unread",
      value: conversations.reduce((acc, c) => acc + c.unreadCount, 0),
      label: "Unread",
      color: "orange",
      icon: "bell",
    },
  ];

  if (authLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <DashboardHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <div className="flex-1 min-h-0 overflow-y-auto">
              <DashboardContent stats={stats} bookings={[]} />
            </div>
          </main>
        );
      
      case "projects":
        return <ProjectsSection userId={user.id} />;
      
      case "messages":
        return (
          <div className="flex flex-1 min-h-0 overflow-hidden relative">
            {loadingConversations ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <MessagePanel
                  conversations={conversations}
                  selectedConversationId={selectedConversationId || ""}
                  onConversationSelect={setSelectedConversationId}
                  currentUser={currentUser}
                  isMobileOpen={isMobilePanelOpen}
                  onMobileClose={() => setIsMobilePanelOpen(false)}
                />
                {selectedConversationId ? (
                  <Chat
                    messages={messages}
                    currentUserId={user.id}
                    messageText={messageText}
                    onMessageChange={setMessageText}
                    onSendMessage={handleSendMessage}
                    conversationName={selectedConversation?.name || "Messages"}
                    onMobileMenuOpen={() => setIsMobilePanelOpen(true)}
                  />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center bg-white px-4">
                    {/* Mobile button to open conversations list */}
                    <button
                      onClick={() => setIsMobilePanelOpen(true)}
                      className="md:hidden mb-6 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Users className="w-5 h-5" />
                      View Conversations
                    </button>
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-semibold text-slate-700 mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-slate-500 text-sm md:text-base">
                        Choose a conversation from the list to start chatting
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      
      case "calendar":
        return <CalendarSection userId={user.id} />;
      
      case "tasks":
        return <TasksSection userId={user.id} />;
      
      case "analytics":
        return <AnalyticsSection userId={user.id} />;
      
      case "profile":
        return <EnhancedProfileSection userId={user.id} />;
      
      case "notifications":
        return <NotificationsSection userId={user.id} />;
      
      case "settings":
        return (
          <SettingsSection
            userId={user.id}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );
      
      default:
        return (
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
              </h2>
              <p className="text-slate-500">This section is coming soon</p>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} darkMode={darkMode} setDarkMode={setDarkMode} userProfile={currentUserProfile} />

      {/* CONTENT WRAPPER */}
      <div className="flex-1 flex min-h-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default MemberDashboard;
