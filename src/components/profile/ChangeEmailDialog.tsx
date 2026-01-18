import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, PenLine, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const emailSchema = z.string().email("Please enter a valid email address");

interface ChangeEmailDialogProps {
  currentEmail: string;
  onEmailChangeInitiated?: () => void;
  onEmailChanged?: (newEmail: string) => void;
}

type Step = "email" | "verify" | "success";

export function ChangeEmailDialog({ 
  currentEmail, 
  onEmailChangeInitiated,
  onEmailChanged 
}: ChangeEmailDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetState = () => {
    setStep("email");
    setNewEmail("");
    setConfirmEmail("");
    setVerificationCode("");
    setError("");
    setLoading(false);
  };

  const handleSendVerification = async () => {
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
      // Get user's first name from profile
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("You must be logged in to change your email");
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("user_id", session.user.id)
        .single();

      const firstName = profile?.first_name || "User";

      // Send verification email via edge function
      const { data, error: fnError } = await supabase.functions.invoke(
        "send-email-change-verification",
        {
          body: { newEmail, firstName },
        }
      );

      if (fnError) throw fnError;
      if (!data.success) throw new Error(data.error || "Failed to send verification email");

      toast.success("Verification code sent to your new email address");
      setStep("verify");
      onEmailChangeInitiated?.();
    } catch (err: any) {
      console.error("Error sending verification:", err);
      setError(err.message || "Failed to send verification email");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "verify-email-change",
        {
          body: { newEmail, code: verificationCode },
        }
      );

      if (fnError) throw fnError;
      if (!data.success) throw new Error(data.error || "Verification failed");

      setStep("success");
      onEmailChanged?.(newEmail);
      
      // Refresh the session to get updated email
      await supabase.auth.refreshSession();
      
      toast.success("Email changed successfully!");
    } catch (err: any) {
      console.error("Error verifying code:", err);
      setError(err.message || "Invalid or expired verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(resetState, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <PenLine className="h-4 w-4" />
          Change Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Mail className="h-5 w-5 text-primary" />
            )}
            {step === "email" && "Change Email Address"}
            {step === "verify" && "Verify New Email"}
            {step === "success" && "Email Changed!"}
          </DialogTitle>
          <DialogDescription>
            {step === "email" && 
              "Enter your new email address. You'll receive a verification code to confirm the change."
            }
            {step === "verify" && 
              `Enter the 6-digit code sent to ${newEmail}`
            }
            {step === "success" && 
              "Your email address has been successfully updated."
            }
          </DialogDescription>
        </DialogHeader>
        
        {step === "email" && (
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

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendVerification}
                disabled={loading || !newEmail || !confirmEmail}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-6 pt-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={(value) => {
                  setVerificationCode(value);
                  setError("");
                }}
                disabled={loading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={handleSendVerification}
                disabled={loading}
              >
                Resend
              </button>
            </p>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setStep("email")}
                disabled={loading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleVerifyCode}
                disabled={loading || verificationCode.length !== 6}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Change Email"
                )}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-4 pt-4">
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center text-muted-foreground">
                Your email has been changed to <strong className="text-foreground">{newEmail}</strong>
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => handleOpenChange(false)} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
