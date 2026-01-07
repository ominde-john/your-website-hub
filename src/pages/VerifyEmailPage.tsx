import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowRight, Loader2, RefreshCw } from "lucide-react";

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const email = location.state?.email;

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Enter the 6-digit code sent to your email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw error;

      toast({
        title: "Email verified",
        description: "Welcome to Teksoft 🎉",
      });

      navigate("/dashboard");
    } catch (err: any) {
      toast({
        title: "Verification failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RESEND OTP ---------------- */
  const handleResend = async () => {
    if (!email) return;

    setResending(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) throw error;

      toast({
        title: "Code sent",
        description: "Check your email for a new 6-digit code",
      });
    } catch (err: any) {
      toast({
        title: "Failed to resend",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>No email found</CardTitle>
            <CardDescription>Please register first</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/register">Go to register</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Mail className="mx-auto h-10 w-10 text-techblue mb-2" />
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to<br />
            <strong>{email}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0,1,2,3,4,5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Verifying…
              </>
            ) : (
              <>
                Verify
                <ArrowRight className="ml-2" />
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={handleResend}
            disabled={resending}
            className="w-full"
          >
            {resending ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <RefreshCw className="mr-2" />
                Resend code
              </>
            )}
          </Button>

          <Link
            to="/register"
            className="block text-center text-sm text-gray-500"
          >
            ← Back to register
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
