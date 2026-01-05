import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
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
  
  const email = location.state?.email || "";
  const firstName = location.state?.firstName || "";
  const lastName = location.state?.lastName || "";
  const username = location.state?.username || "";
  const password = location.state?.password || "";

  // Generate a random 6-digit code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Verify code from database
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

      // Mark code as used
      await supabase
        .from("email_verification_codes")
        .update({ used: true })
        .eq("id", codes[0].id);

      // Now create the user account in Supabase Auth
      const { error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: firstName,
            last_name: lastName,
            username: username,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          toast({
            title: "Account Exists",
            description: "This email is already registered. Please login instead.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }
        throw signUpError;
      }

      toast({
        title: "Email Verified!",
        description: "Your account has been created successfully. Welcome to TekSoft!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "No email address found. Please register again.",
        variant: "destructive",
      });
      return;
    }

    setResending(true);

    try {
      // Generate new verification code
      const verificationCode = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

      // Store new verification code
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

      // Send new confirmation email
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
        title: "Code Sent!",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to Resend",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-xl border-0 text-center">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">No Email Found</CardTitle>
            <CardDescription>
              Please register first to verify your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-techblue hover:bg-techblue-dark text-white">
              <Link to="/register">Go to Registration</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto h-16 w-16 rounded-full bg-techblue/10 flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-techblue" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Verify Your Email</CardTitle>
          <CardDescription className="text-gray-600">
            We sent a 6-digit code to<br />
            <span className="font-medium text-gray-900">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>

            <Button 
              onClick={handleVerify}
              className="w-full bg-techblue hover:bg-techblue-dark text-white"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">
                Didn't receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={handleResendCode}
                disabled={resending}
                className="text-techblue hover:text-techblue-dark"
              >
                {resending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Code
                  </>
                )}
              </Button>
            </div>

            <div className="text-center">
              <Link 
                to="/register" 
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Registration
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
