import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface IncomingCall {
  callerId: string;
  callerName: string;
}

export function useIncomingCall(currentUserId: string | null) {
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);

  const dismissIncomingCall = useCallback(() => {
    setIncomingCall(null);
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const channel = supabase
      .channel(`incoming-calls-${currentUserId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "video_call_signals",
          filter: `receiver_id=eq.${currentUserId}`,
        },
        async (payload) => {
          const signal = payload.new as {
            signal_type: string;
            caller_id: string;
          };

          if (signal.signal_type === "offer") {
            // Fetch caller info
            const { data: profile } = await supabase
              .from("profiles")
              .select("first_name, last_name")
              .eq("user_id", signal.caller_id)
              .single();

            if (profile) {
              setIncomingCall({
                callerId: signal.caller_id,
                callerName: `${profile.first_name} ${profile.last_name}`,
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);

  return { incomingCall, dismissIncomingCall };
}
