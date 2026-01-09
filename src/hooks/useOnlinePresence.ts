import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PresenceState {
  [userId: string]: {
    online: boolean;
    lastSeen: string;
  };
}

export const useOnlinePresence = (currentUserId: string | undefined) => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [lastSeenMap, setLastSeenMap] = useState<Map<string, string>>(new Map());
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const updateIntervalRef = useRef<NodeJS.Timer | null>(null);

  // Update current user's last_seen in the database
  const updateLastSeen = useCallback(async () => {
    if (!currentUserId) return;
    
    try {
      await supabase
        .from('profiles')
        .update({ last_seen: new Date().toISOString() })
        .eq('user_id', currentUserId);
    } catch (error) {
      console.error('Error updating last_seen:', error);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;

    // Create presence channel
    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: currentUserId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const online = new Set<string>();
        const lastSeen = new Map<string, string>();

        Object.keys(presenceState).forEach((key) => {
          online.add(key);
          const userPresences = presenceState[key] as Array<{ lastSeen?: string }>;
          if (userPresences && userPresences.length > 0 && userPresences[0].lastSeen) {
            lastSeen.set(key, userPresences[0].lastSeen);
          }
        });

        setOnlineUsers(online);
        setLastSeenMap(lastSeen);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        setOnlineUsers((prev) => new Set(prev).add(key));
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setOnlineUsers((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online: true,
            lastSeen: new Date().toISOString(),
          });
        }
      });

    channelRef.current = channel;

    // Update last_seen immediately and then periodically
    updateLastSeen();
    updateIntervalRef.current = setInterval(updateLastSeen, 60000); // Update every minute

    // Update on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateLastSeen();
        channel.track({
          online: true,
          lastSeen: new Date().toISOString(),
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUserId, updateLastSeen]);

  const isUserOnline = useCallback(
    (userId: string) => onlineUsers.has(userId),
    [onlineUsers]
  );

  const getUserLastSeen = useCallback(
    (userId: string) => lastSeenMap.get(userId),
    [lastSeenMap]
  );

  return { isUserOnline, getUserLastSeen, onlineUsers };
};

// Helper function to format last seen time
export const formatLastSeen = (lastSeen: string | null | undefined): string => {
  if (!lastSeen) return 'Never';

  const date = new Date(lastSeen);
  
  // Validate the date
  if (isNaN(date.getTime())) {
    return 'Unknown';
  }
  
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};
