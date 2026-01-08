import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

interface ChatPartner {
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url?: string;
}

interface ChatWindowProps {
  currentUserId: string;
  partner: ChatPartner;
  onClose: () => void;
}

const ChatWindow = ({ currentUserId, partner, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initials = `${partner.first_name?.[0] || ''}${partner.last_name?.[0] || ''}`.toUpperCase();

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${partner.user_id}),and(sender_id.eq.${partner.user_id},receiver_id.eq.${currentUserId})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }
      setMessages(data || []);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const msg = payload.new as Message;
          // Only add if relevant to this chat
          if (
            (msg.sender_id === currentUserId && msg.receiver_id === partner.user_id) ||
            (msg.sender_id === partner.user_id && msg.receiver_id === currentUserId)
          ) {
            setMessages(prev => [...prev, msg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, partner.user_id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Mark messages as read
  useEffect(() => {
    const markAsRead = async () => {
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_id', partner.user_id)
        .eq('receiver_id', currentUserId)
        .eq('read', false);
    };
    markAsRead();
  }, [currentUserId, partner.user_id, messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const { error } = await supabase.from('messages').insert({
      sender_id: currentUserId,
      receiver_id: partner.user_id,
      content: newMessage.trim(),
    });

    if (error) {
      toast.error('Failed to send message');
      console.error(error);
    } else {
      setNewMessage('');
    }
    setSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/50 rounded-t-2xl">
        <Avatar className="h-10 w-10 border border-primary/20">
          <AvatarImage src={partner.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/20 text-primary text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{partner.first_name} {partner.last_name}</h4>
          <p className="text-xs text-muted-foreground">@{partner.username}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-8">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg) => {
              const isOwn = msg.sender_id === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      isOwn
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                    <div className={`text-[10px] mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
            disabled={sending}
          />
          <Button onClick={handleSend} disabled={sending || !newMessage.trim()} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
