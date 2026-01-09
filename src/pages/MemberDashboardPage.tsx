import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageCircle, Search, Loader2 } from "lucide-react";
import MemberCard from "@/components/members/MemberCard";
import ChatWindow from "@/components/members/ChatWindow";
import PageHeader from "@/components/PageHeader";

interface MemberWithRole {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url?: string;
  role: 'admin' | 'moderator' | 'user';
}

interface ChatPartner {
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url?: string;
}

const MemberDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState<MemberWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChatPartner, setActiveChatPartner] = useState<ChatPartner | null>(null);
  const { getUnreadCount } = useUnreadMessages(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!user) return;

      try {
        // Fetch profiles
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select("id, user_id, first_name, last_name, username, avatar_url");

        if (profilesError) throw profilesError;

        // Fetch roles
        const { data: roles, error: rolesError } = await supabase
          .from("user_roles")
          .select("user_id, role");

        if (rolesError) throw rolesError;

        // Merge profiles with roles
        const membersWithRoles: MemberWithRole[] = (profiles || []).map((profile) => {
          const userRole = roles?.find((r) => r.user_id === profile.user_id);
          return {
            ...profile,
            role: (userRole?.role as 'admin' | 'moderator' | 'user') || 'user',
          };
        });

        // Sort: admins first, then moderators, then users
        const roleOrder = { admin: 0, moderator: 1, user: 2 };
        membersWithRoles.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

        setMembers(membersWithRoles);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMembers();
    }
  }, [user]);

  const handleStartChat = (memberId: string) => {
    const member = members.find((m) => m.user_id === memberId);
    if (member) {
      setActiveChatPartner({
        user_id: member.user_id,
        first_name: member.first_name,
        last_name: member.last_name,
        username: member.username,
        avatar_url: member.avatar_url,
      });
    }
  };

  const filteredMembers = members.filter((member) => {
    const query = searchQuery.toLowerCase();
    return (
      member.first_name?.toLowerCase().includes(query) ||
      member.last_name?.toLowerCase().includes(query) ||
      member.username?.toLowerCase().includes(query)
    );
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Member Dashboard"
        description="Connect with fellow developers, view member roles, and start conversations"
      />

      <div className="container-custom py-12">
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="mb-8 bg-muted/50">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              My Chats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            {/* Search */}
            <div className="relative mb-8 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Members Grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? "No members found matching your search." : "No members yet."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    currentUserId={user.id}
                    onStartChat={handleStartChat}
                    unreadCount={getUnreadCount(member.user_id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages">
            <ChatHistorySection currentUserId={user.id} onOpenChat={handleStartChat} members={members} getUnreadCount={getUnreadCount} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Window */}
      {activeChatPartner && user && (
        <ChatWindow
          currentUserId={user.id}
          partner={activeChatPartner}
          onClose={() => setActiveChatPartner(null)}
        />
      )}
    </div>
  );
};

// Chat history component
interface ChatHistorySectionProps {
  currentUserId: string;
  onOpenChat: (memberId: string) => void;
  members: MemberWithRole[];
  getUnreadCount: (senderId: string) => number;
}

const ChatHistorySection = ({ currentUserId, onOpenChat, members, getUnreadCount }: ChatHistorySectionProps) => {
  const [conversations, setConversations] = useState<{ partnerId: string; lastMessage: string; timestamp: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        setLoading(false);
        return;
      }

      // Group by conversation partner and get last message
      const convMap = new Map<string, { lastMessage: string; timestamp: string }>();
      data?.forEach((msg) => {
        const partnerId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;
        if (!convMap.has(partnerId)) {
          convMap.set(partnerId, { lastMessage: msg.content, timestamp: msg.created_at });
        }
      });

      const convList = Array.from(convMap.entries()).map(([partnerId, info]) => ({
        partnerId,
        ...info,
      }));

      setConversations(convList);
      setLoading(false);
    };

    fetchConversations();
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No conversations yet. Start chatting with a member!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {conversations.map((conv) => {
        const partner = members.find((m) => m.user_id === conv.partnerId);
        if (!partner) return null;
        const initials = `${partner.first_name?.[0] || ''}${partner.last_name?.[0] || ''}`.toUpperCase();
        const unreadCount = getUnreadCount(conv.partnerId);

        return (
          <div
            key={conv.partnerId}
            onClick={() => onOpenChat(conv.partnerId)}
            className="flex items-center gap-4 p-4 bg-card/50 border border-border/50 rounded-xl cursor-pointer hover:border-primary/30 transition-all"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                {initials}
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold">{partner.first_name} {partner.last_name}</h4>
              <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(conv.timestamp).toLocaleDateString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MemberDashboardPage;
