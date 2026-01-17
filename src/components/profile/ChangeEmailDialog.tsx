import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Mail, PenLine } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

// Timeout duration for email change request (in milliseconds)
const EMAIL_CHANGE_TIMEOUT_MS = 30000;

interface ChangeEmailDialogProps {
  currentEmail: string;
  onEmailChangeInitiated?: () => void;
}

export const ChangeEmailDialog = ({ currentEmail, onEmailChangeInitiated }: ChangeEmailDialogProps) => {
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangeEmail = async () => {
    setError("");
    
    // Validate email format
    const emailValidation = emailSchema.safeParse(newEmail);
    if (!emailValidation.success) {
      setError(emailValidation.error.errors[0].message);
      return;
    }

    // Check if emails match
    if (newEmail !== confirmEmail) {
      setError("Email addresses do not match");
      return;
    }

    // Check if new email is same as current
    if (newEmail.toLowerCase() === currentEmail.toLowerCase()) {
      setError("New email must be different from your current email");
      return;
    }

    setLoading(true);

    try {
      // Create a timeout promise to prevent indefinite hanging
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out. Please check your internet connection and try again."));
        }, EMAIL_CHANGE_TIMEOUT_MS);
      });

      // Race between the actual request and the timeout
      const { error: updateError } = await Promise.race([
        supabase.auth.updateUser({
          email: newEmail,
        }),
        timeoutPromise,
      ]) as Awaited<ReturnType<typeof supabase.auth.updateUser>>;

      if (updateError) {
        throw updateError;
      }

      toast.success(
        "Verification email sent! Please check both your old and new email addresses to confirm the change.",
        { duration: 8000 }
      );
      
      setOpen(false);
      setNewEmail("");
      setConfirmEmail("");
      onEmailChangeInitiated?.();
    } catch (err: any) {
      console.error("Error changing email:", err);
      if (err.message?.includes("already registered")) {
        setError("This email is already registered to another account");
      } else if (err.message?.includes("timed out")) {
        setError("Request timed out. Please check your internet connection and try again.");
      } else if (err.message?.includes("rate limit")) {
        setError("Too many requests. Please wait a few minutes and try again.");
      } else {
        setError(err.message || "Failed to change email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <PenLine className="h-4 w-4" />
          Change Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Change Email Address
          </DialogTitle>
          <DialogDescription>
            Enter your new email address. You'll receive verification emails on both your current and new email addresses to confirm the change.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Current Email</Label>
            <Input
              value={currentEmail}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-email">New Email Address</Label>
            <Input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter new email address"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-email">Confirm New Email</Label>
            <Input
              id="confirm-email"
              type="email"
              value={confirmEmail}
              onChange={(e) => {
                setConfirmEmail(e.target.value);
                setError("");
              }}
              placeholder="Confirm new email address"
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">How it works:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>You'll receive a verification email at your new address</li>
              <li>Click the link in the email to verify</li>
              <li>Your email will be updated once verified</li>
            </ol>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangeEmail}
              disabled={loading || !newEmail || !confirmEmail}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Verification"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailDialog;
