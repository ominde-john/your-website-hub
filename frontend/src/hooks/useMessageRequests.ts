import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type RequestStatus = 'pending' | 'accepted' | 'declined' | 'none';

interface MessageRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: RequestStatus;
  created_at: string;
}

export const useMessageRequests = (currentUserId: string | undefined) => {
  const [requests, setRequests] = useState<MessageRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all message requests for current user
  const fetchRequests = useCallback(async () => {
    if (!currentUserId) return;

    const { data, error } = await supabase
      .from('message_requests')
      .select('*')
      .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);

    if (error) {
      console.error('Error fetching message requests:', error);
      return;
    }

    setRequests((data || []) as MessageRequest[]);
    setLoading(false);
  }, [currentUserId]);

  useEffect(() => {
    fetchRequests();

    if (!currentUserId) return;

    // Subscribe to changes
    const channel = supabase
      .channel('message-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'message_requests',
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, fetchRequests]);

  // Get status of a conversation between current user and partner
  const getRequestStatus = useCallback(
    (partnerId: string): { status: RequestStatus; isReceiver: boolean } => {
      if (!currentUserId) return { status: 'none', isReceiver: false };

      const request = requests.find(
        (r) =>
          (r.sender_id === currentUserId && r.receiver_id === partnerId) ||
          (r.sender_id === partnerId && r.receiver_id === currentUserId)
      );

      if (!request) return { status: 'none', isReceiver: false };

      return {
        status: request.status as RequestStatus,
        isReceiver: request.receiver_id === currentUserId,
      };
    },
    [currentUserId, requests]
  );

  // Send a message request
  const sendRequest = useCallback(
    async (receiverId: string) => {
      if (!currentUserId) return false;

      const { error } = await supabase.from('message_requests').insert({
        sender_id: currentUserId,
        receiver_id: receiverId,
        status: 'pending',
      });

      if (error) {
        console.error('Error sending message request:', error);
        return false;
      }

      return true;
    },
    [currentUserId]
  );

  // Accept a message request
  const acceptRequest = useCallback(
    async (senderId: string) => {
      if (!currentUserId) return false;

      const { error } = await supabase
        .from('message_requests')
        .update({ status: 'accepted' })
        .eq('sender_id', senderId)
        .eq('receiver_id', currentUserId);

      if (error) {
        console.error('Error accepting message request:', error);
        return false;
      }

      return true;
    },
    [currentUserId]
  );

  // Decline a message request
  const declineRequest = useCallback(
    async (senderId: string) => {
      if (!currentUserId) return false;

      const { error } = await supabase
        .from('message_requests')
        .update({ status: 'declined' })
        .eq('sender_id', senderId)
        .eq('receiver_id', currentUserId);

      if (error) {
        console.error('Error declining message request:', error);
        return false;
      }

      return true;
    },
    [currentUserId]
  );

  // Get pending requests received
  const pendingReceivedRequests = requests.filter(
    (r) => r.receiver_id === currentUserId && r.status === 'pending'
  );

  return {
    requests,
    loading,
    getRequestStatus,
    sendRequest,
    acceptRequest,
    declineRequest,
    pendingReceivedRequests,
    refetch: fetchRequests,
  };
};
