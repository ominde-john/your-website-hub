import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useUnreadMessages = (currentUserId: string | undefined) => {
  const [unreadCounts, setUnreadCounts] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (!currentUserId) return;

    const fetchUnreadCounts = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('sender_id')
        .eq('receiver_id', currentUserId)
        .eq('read', false);

      if (error) {
        console.error('Error fetching unread counts:', error);
        return;
      }

      // Count unread messages by sender
      const counts = new Map<string, number>();
      data?.forEach((msg) => {
        const current = counts.get(msg.sender_id) || 0;
        counts.set(msg.sender_id, current + 1);
      });
      setUnreadCounts(counts);
    };

    fetchUnreadCounts();

    // Subscribe to new messages to update unread counts in real-time
    const channel = supabase
      .channel('unread-messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${currentUserId}`,
        },
        (payload) => {
          const msg = payload.new as { sender_id: string; read: boolean };
          if (!msg.read) {
            setUnreadCounts((prev) => {
              const newCounts = new Map(prev);
              const current = newCounts.get(msg.sender_id) || 0;
              newCounts.set(msg.sender_id, current + 1);
              return newCounts;
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${currentUserId}`,
        },
        () => {
          // Re-fetch counts when messages are updated (marked as read)
          fetchUnreadCounts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);

  const getUnreadCount = (senderId: string): number => {
    return unreadCounts.get(senderId) || 0;
  };

  const clearUnreadCount = (senderId: string) => {
    setUnreadCounts((prev) => {
      const newCounts = new Map(prev);
      newCounts.delete(senderId);
      return newCounts;
    });
  };

  return { unreadCounts, getUnreadCount, clearUnreadCount };
};
