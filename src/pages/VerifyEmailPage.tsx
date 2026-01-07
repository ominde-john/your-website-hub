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

// Generate a random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get registration data from navigation state
  const email = location.state?.email;
  const firstName = location.state?.firstName;
  const lastName = location.state?.lastName;
  const username = location.state?.username;
  const password = location.state?.password;

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
      // Verify code from database (similar to ResetPasswordPage)
      const { data: codes, error: fetchError } = await supabase
        .from("email_verification_codes")
        .select("*")
        .eq("email", email.toLowerCase())
        .eq("code", otp)
        .eq("used", false)
        .gte("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1);

      if (fetchError || !codes || codes.length === 0) {
        throw new Error("Invalid or expired verification code");
      }

      const codeId = codes[0].id;

      // Now create the actual user account with Supabase Auth
      const { error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            username: username,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      // Mark code as used after successful signup
      await supabase
        .from("email_verification_codes")
        .update({ used: true })
        .eq("id", codeId);

      // Send welcome email
      try {
        await supabase.functions.invoke("send-welcome-email", {
          body: {
            email: email,
            firstName: firstName,
          },
        });
      } catch {
        // Don't fail registration if welcome email fails
        console.error("Failed to send welcome email");
      }

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
      // Generate new verification code
      const verificationCode = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      // Store new verification code in database
      const { error: codeError } = await supabase
        .from("email_verification_codes")
        .insert({
          email: email.toLowerCase(),
          code: verificationCode,
          expires_at: expiresAt,
        });

      if (codeError) {
        throw new Error("Failed to generate new code");
      }

      // Send confirmation email via edge function
      const { error: emailError } = await supabase.functions.invoke("send-confirmation-email", {
        body: {
          email: email,
          firstName: firstName,
          code: verificationCode,
        },
      });

      if (emailError) {
        throw new Error("Failed to send confirmation email");
      }

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

  if (!email || !firstName || !lastName || !username || !password) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Registration data not found</CardTitle>
            <CardDescription>Please complete the registration form first</CardDescription>
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
