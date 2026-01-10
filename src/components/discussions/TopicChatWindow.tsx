import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Send, X, Users, ArrowLeft } from "lucide-react";
import { useNotificationSound } from "@/hooks/useNotificationSound";
import { formatDistanceToNow } from "date-fns";

interface TopicMessage {
  id: string;
  topic_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender?: {
    first_name: string;
    last_name: string;
    username: string;
    avatar_url?: string;
  };
}

interface Topic {
  id: string;
  title: string;
  description?: string;
  category: string;
  created_by: string;
  created_at: string;
}

interface TopicChatWindowProps {
  topic: Topic;
  currentUserId: string;
  onClose: () => void;
}

const TopicChatWindow = ({ topic, currentUserId, onClose }: TopicChatWindowProps) => {
  const [messages, setMessages] = useState<TopicMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { playNotification } = useNotificationSound();

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data: messagesData, error } = await supabase
          .from("topic_messages")
          .select("*")
          .eq("topic_id", topic.id)
          .order("created_at", { ascending: true });

        if (error) throw error;

        // Fetch sender profiles
        const senderIds = [...new Set(messagesData?.map((m) => m.sender_id) || [])];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, first_name, last_name, username, avatar_url")
          .in("user_id", senderIds);

        const messagesWithSenders = (messagesData || []).map((msg) => ({
          ...msg,
          sender: profiles?.find((p) => p.user_id === msg.sender_id),
        }));

        setMessages(messagesWithSenders);
        setParticipantCount(senderIds.length);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [topic.id]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`topic-${topic.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "topic_messages",
          filter: `topic_id=eq.${topic.id}`,
        },
        async (payload) => {
          const newMsg = payload.new as TopicMessage;
          
          // Fetch sender profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("user_id, first_name, last_name, username, avatar_url")
            .eq("user_id", newMsg.sender_id)
            .maybeSingle();

          const msgWithSender = { ...newMsg, sender: profile || undefined };
          
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, msgWithSender];
          });

          // Play notification for messages from others
          if (newMsg.sender_id !== currentUserId) {
            playNotification();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [topic.id, currentUserId, playNotification]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const { error } = await supabase.from("topic_messages").insert({
        topic_id: topic.id,
        sender_id: currentUserId,
        content: newMessage.trim(),
      });

      if (error) throw error;
      setNewMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      general: "General",
      "ai-ml": "AI & ML",
      "web-dev": "Web Dev",
      mobile: "Mobile",
      career: "Career",
      projects: "Projects",
      help: "Help",
    };
    return labels[category] || category;
  };

  return (
    <>
      {/* Semi-transparent backdrop on mobile for dismissing */}
      <div 
        className="fixed inset-0 bg-black/50 md:hidden z-[99]" 
        onClick={onClose}
      />
      
      {/* Chat window - 3/4 height on mobile, positioned at bottom */}
      <div className="fixed bottom-0 left-0 right-0 md:inset-auto md:bottom-4 md:right-4 w-full md:w-[450px] h-[75vh] md:h-[600px] bg-background border-t md:border border-border rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col z-[100]">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-muted rounded-t-2xl relative">
          {/* Drag handle indicator for mobile */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-muted-foreground/30 rounded-full md:hidden" />
          
          <div className="flex-1 min-w-0 pt-2 md:pt-0">
            <h3 className="font-semibold text-foreground truncate">{topic.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                {getCategoryLabel(topic.category)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {participantCount} participants
              </span>
            </div>
          </div>
          
          {/* Close button - visible on all screens */}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-background" ref={scrollRef}>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isOwn = msg.sender_id === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={msg.sender?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {msg.sender?.first_name?.[0] || "?"}
                        {msg.sender?.last_name?.[0] || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
                      {!isOwn && (
                        <p className="text-xs text-muted-foreground mb-1">
                          {msg.sender?.first_name} {msg.sender?.last_name}
                        </p>
                      )}
                      <div
                        className={`px-3 py-2 rounded-2xl ${
                          isOwn
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${isOwn ? "text-right" : ""}`}>
                        {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-border bg-background rounded-b-2xl">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              disabled={sending}
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim() || sending}>
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TopicChatWindow;
