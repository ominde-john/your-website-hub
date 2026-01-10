import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface IncomingCallDialogProps {
  isOpen: boolean;
  callerName: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function IncomingCallDialog({
  isOpen,
  callerName,
  onAccept,
  onDecline,
}: IncomingCallDialogProps) {
  const [ring, setRing] = useState(true);
  
  // Create a ringing effect
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setRing((prev) => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  const initials = callerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-sm" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center">Incoming Video Call</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6">
          <div className={`transition-transform duration-300 ${ring ? "scale-110" : "scale-100"}`}>
            <Avatar className="h-20 w-20 border-4 border-primary/30">
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <p className="text-lg font-medium">{callerName}</p>
          <p className="text-sm text-muted-foreground animate-pulse">is calling you...</p>
        </div>

        <div className="flex justify-center gap-6">
          <Button
            onClick={onDecline}
            variant="destructive"
            size="lg"
            className="rounded-full w-14 h-14"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
          <Button
            onClick={onAccept}
            className="rounded-full w-14 h-14 bg-green-600 hover:bg-green-700"
          >
            <Phone className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
