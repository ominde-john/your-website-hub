import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Check, XIcon, Clock, Video } from "lucide-react";
import { toast } from "sonner";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";
import { formatLastSeen } from "@/hooks/useOnlinePresence";
import { useMessageRequests } from "@/hooks/useMessageRequests";
import { useNotificationSound } from "@/hooks/useNotificationSound";
import VideoCallModal from "./VideoCallModal";

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
  last_seen?: string | null;
}

interface ChatWindowProps {
  currentUserId: string;
  partner: ChatPartner;
  onClose: () => void;
  isPartnerOnline?: boolean;
}

const ChatWindow = ({ currentUserId, partner, onClose, isPartnerOnline = false }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const initials = `${partner.first_name?.[0] || ''}${partner.last_name?.[0] || ''}`.toUpperCase();
  
  // Message requests
  const { getRequestStatus, sendRequest, acceptRequest, declineRequest } = useMessageRequests(currentUserId);
  const { status: requestStatus, isReceiver } = getRequestStatus(partner.user_id);
  
  // Typing indicator
  const { isPartnerTyping, handleTyping, stopTyping } = useTypingIndicator(
    currentUserId,
    partner.user_id
  );
  
  // Notification sound
  const { playNotification } = useNotificationSound();

  // Can send messages only if request is accepted or we haven't started a conversation
  const canSendMessages = requestStatus === 'accepted' || requestStatus === 'none';

  // No need to lock body scroll anymore since chat is a partial overlay

  // Get online status text
  const getStatusText = () => {
    if (isPartnerTyping) {
      return <span className="text-xs text-primary animate-pulse">typing...</span>;
    }
    if (isPartnerOnline) {
      return <span className="text-xs text-green-500">Online</span>;
    }
    return <span className="text-xs text-muted-foreground">{formatLastSeen(partner.last_seen)}</span>;
  };

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
            
            // Play notification sound for incoming messages (not own messages)
            if (msg.sender_id === partner.user_id) {
              playNotification();
            }
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

    // If no request exists, send a request first
    if (requestStatus === 'none') {
      setSending(true);
      const success = await sendRequest(partner.user_id);
      if (!success) {
        toast.error('Failed to send message request');
        setSending(false);
        return;
      }
      // Now send the first message
    }

    // If request is pending and we're the sender, wait for acceptance
    if (requestStatus === 'pending' && !isReceiver) {
      toast.info('Waiting for the other user to accept your message request');
      return;
    }

    setSending(true);
    stopTyping();
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

  const handleAccept = async () => {
    const success = await acceptRequest(partner.user_id);
    if (success) {
      toast.success('Message request accepted');
    } else {
      toast.error('Failed to accept request');
    }
  };

  const handleDecline = async () => {
    const success = await declineRequest(partner.user_id);
    if (success) {
      toast.info('Message request declined');
      onClose();
    } else {
      toast.error('Failed to decline request');
    }
  };

  // Render request status banner
  const renderRequestBanner = () => {
    if (requestStatus === 'pending') {
      if (isReceiver) {
        // Show accept/decline buttons
        return (
          <div className="p-4 bg-primary/10 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{partner.first_name} wants to message you</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleDecline} className="gap-1">
                <XIcon className="w-3 h-3" />
                Decline
              </Button>
              <Button size="sm" onClick={handleAccept} className="gap-1">
                <Check className="w-3 h-3" />
                Accept
              </Button>
            </div>
          </div>
        );
      } else {
        // Show waiting message
        return (
          <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Waiting for {partner.first_name} to accept your message request...</span>
          </div>
        );
      }
    }

    if (requestStatus === 'declined' && !isReceiver) {
      return (
        <div className="p-4 bg-destructive/10 border-b border-border text-sm text-destructive">
          Your message request was declined.
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Semi-transparent backdrop on mobile for dismissing */}
      <div 
        className="fixed inset-0 bg-black/50 md:hidden z-[99]" 
        onClick={onClose}
      />
      
      {/* Chat window container - COMPLETELY OPAQUE */}
      <div 
        className="fixed bottom-0 left-0 right-0 md:inset-auto md:bottom-4 md:right-4 w-full md:w-96 h-[75vh] md:h-[500px] rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col z-[100] overflow-hidden"
        style={{ 
          backgroundColor: '#ffffff',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.3)'
        }}
      >
        {/* Header - OPAQUE */}
        <div 
          className="flex items-center gap-3 p-4 border-b border-gray-200 rounded-t-2xl relative"
          style={{ backgroundColor: '#f1f5f9' }}
        >
          {/* Drag handle indicator for mobile */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-400 rounded-full md:hidden" />
          
          <div className="relative">
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage src={partner.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/20 text-primary text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Online indicator */}
            <span 
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-100 ${
                isPartnerOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-gray-900">{partner.first_name} {partner.last_name}</h4>
            {getStatusText()}
          </div>
          {/* Video call button */}
          <Button variant="ghost" size="icon" onClick={() => setShowVideoCall(true)} title="Video call">
            <Video className="w-4 h-4" />
          </Button>
          {/* Close button - visible on all screens */}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Request Banner */}
        {renderRequestBanner()}

        {/* Messages area - OPAQUE WHITE */}
        <div 
          className="flex-1 overflow-y-auto p-4"
          style={{ backgroundColor: '#ffffff' }}
          ref={scrollRef}
        >
          <div className="space-y-3">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-8">
                {requestStatus === 'none' 
                  ? "Send a message to start chatting!"
                  : requestStatus === 'pending'
                  ? "Waiting for request acceptance..."
                  : "No messages yet. Start the conversation!"}
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
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                      <div className={`text-[10px] mt-1 ${isOwn ? 'text-white/70' : 'text-gray-500'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Input area - OPAQUE WHITE */}
        <div 
          className="p-4 border-t border-gray-200"
          style={{ backgroundColor: '#ffffff' }}
        >
          {requestStatus === 'declined' && !isReceiver ? (
            <p className="text-sm text-muted-foreground text-center">Cannot send messages</p>
          ) : (
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onKeyPress={handleKeyPress}
                onBlur={stopTyping}
                placeholder={
                  requestStatus === 'pending' && !isReceiver
                    ? "Waiting for acceptance..."
                    : "Type a message..."
                }
                className="flex-1"
                disabled={sending || (requestStatus === 'pending' && !isReceiver)}
              />
              <Button 
                onClick={handleSend} 
                disabled={sending || !newMessage.trim() || (requestStatus === 'pending' && !isReceiver)} 
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Video Call Modal */}
        <VideoCallModal
          isOpen={showVideoCall}
          onClose={() => setShowVideoCall(false)}
          currentUserId={currentUserId}
          partnerId={partner.user_id}
          partnerName={`${partner.first_name} ${partner.last_name}`}
        />
      </div>
    </>
  );
};

export default ChatWindow;
