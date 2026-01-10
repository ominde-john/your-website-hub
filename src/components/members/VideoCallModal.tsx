import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  partnerId: string;
  partnerName: string;
  isIncoming?: boolean;
}

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export default function VideoCallModal({
  isOpen,
  onClose,
  currentUserId,
  partnerId,
  partnerName,
  isIncoming = false,
}: VideoCallModalProps) {
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "connected" | "ended">(
    isIncoming ? "calling" : "idle"
  );
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const cleanup = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
  }, []);

  const handleClose = useCallback(async () => {
    // Send end call signal
    await supabase.from("video_call_signals").insert([{
      caller_id: currentUserId,
      receiver_id: partnerId,
      signal_type: "end_call",
      signal_data: {},
    }]);
    cleanup();
    setCallStatus("ended");
    onClose();
  }, [currentUserId, partnerId, cleanup, onClose]);

  const setupMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast.error("Could not access camera/microphone");
      throw error;
    }
  }, []);

  const createPeerConnection = useCallback(
    (stream: MediaStream) => {
      const pc = new RTCPeerConnection(ICE_SERVERS);

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      pc.onicecandidate = async (event) => {
        if (event.candidate) {
          await supabase.from("video_call_signals").insert([{
            caller_id: currentUserId,
            receiver_id: partnerId,
            signal_type: "ice_candidate",
            signal_data: JSON.parse(JSON.stringify(event.candidate.toJSON())),
          }]);
        }
      };

      pc.onconnectionstatechange = () => {
        console.log("Connection state:", pc.connectionState);
        if (pc.connectionState === "connected") {
          setCallStatus("connected");
        } else if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
          handleClose();
        }
      };

      peerConnectionRef.current = pc;
      return pc;
    },
    [currentUserId, partnerId, handleClose]
  );

  const startCall = useCallback(async () => {
    try {
      setCallStatus("calling");
      const stream = await setupMediaStream();
      const pc = createPeerConnection(stream);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      await supabase.from("video_call_signals").insert([{
        caller_id: currentUserId,
        receiver_id: partnerId,
        signal_type: "offer",
        signal_data: { sdp: offer.sdp, type: offer.type },
      }]);

      toast.info(`Calling ${partnerName}...`);
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error("Failed to start call");
      handleClose();
    }
  }, [setupMediaStream, createPeerConnection, currentUserId, partnerId, partnerName, handleClose]);

  const answerCall = useCallback(async () => {
    try {
      const stream = await setupMediaStream();
      const pc = createPeerConnection(stream);

      // Get the offer from the database
      const { data: offerData } = await supabase
        .from("video_call_signals")
        .select("*")
        .eq("caller_id", partnerId)
        .eq("receiver_id", currentUserId)
        .eq("signal_type", "offer")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (offerData) {
        const signalData = offerData.signal_data as unknown as RTCSessionDescriptionInit;
        await pc.setRemoteDescription(new RTCSessionDescription(signalData));

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        await supabase.from("video_call_signals").insert([{
          caller_id: currentUserId,
          receiver_id: partnerId,
          signal_type: "answer",
          signal_data: { sdp: answer.sdp, type: answer.type },
        }]);
      }
    } catch (error) {
      console.error("Error answering call:", error);
      toast.error("Failed to answer call");
      handleClose();
    }
  }, [setupMediaStream, createPeerConnection, currentUserId, partnerId, handleClose]);

  const declineCall = useCallback(async () => {
      await supabase.from("video_call_signals").insert([{
        caller_id: currentUserId,
        receiver_id: partnerId,
        signal_type: "decline",
        signal_data: {},
      }]);
      handleClose();
    }, [currentUserId, partnerId, handleClose]);

  // Subscribe to signaling events
  useEffect(() => {
    if (!isOpen) return;

    const channel = supabase
      .channel(`video-call-${currentUserId}-${partnerId}`)
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
            signal_data: Record<string, unknown>;
            caller_id: string;
          };

          if (signal.caller_id !== partnerId) return;

          const pc = peerConnectionRef.current;

          switch (signal.signal_type) {
            case "answer":
              if (pc) {
                const answerData = signal.signal_data as unknown as RTCSessionDescriptionInit;
                await pc.setRemoteDescription(new RTCSessionDescription(answerData));
              }
              break;

            case "ice_candidate":
              if (pc && signal.signal_data) {
                const candidateData = signal.signal_data as unknown as RTCIceCandidateInit;
                await pc.addIceCandidate(new RTCIceCandidate(candidateData));
              }
              break;

            case "end_call":
            case "decline":
              toast.info(signal.signal_type === "decline" ? "Call declined" : "Call ended");
              cleanup();
              setCallStatus("ended");
              onClose();
              break;
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen, currentUserId, partnerId, cleanup, onClose]);

  // Auto-start call if not incoming
  useEffect(() => {
    if (isOpen && !isIncoming && callStatus === "idle") {
      startCall();
    }
  }, [isOpen, isIncoming, callStatus, startCall]);

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {callStatus === "calling" && !isIncoming && `Calling ${partnerName}...`}
            {callStatus === "calling" && isIncoming && `Incoming call from ${partnerName}`}
            {callStatus === "connected" && `In call with ${partnerName}`}
            {callStatus === "ended" && "Call ended"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
              You
            </span>
          </div>
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
              {partnerName}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {isIncoming && callStatus === "calling" ? (
            <>
              <Button onClick={answerCall} className="bg-green-600 hover:bg-green-700">
                <Phone className="h-4 w-4 mr-2" />
                Answer
              </Button>
              <Button onClick={declineCall} variant="destructive">
                <PhoneOff className="h-4 w-4 mr-2" />
                Decline
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={isVideoEnabled ? "secondary" : "destructive"}
                onClick={toggleVideo}
              >
                {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              <Button
                variant={isAudioEnabled ? "secondary" : "destructive"}
                onClick={toggleAudio}
              >
                {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button onClick={handleClose} variant="destructive">
                <PhoneOff className="h-4 w-4 mr-2" />
                End Call
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
