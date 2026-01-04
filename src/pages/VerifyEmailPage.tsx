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

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email Verified!",
        description: "Your account has been verified successfully.",
      });
      navigate("/dashboard");
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

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    setResending(false);

    if (error) {
      toast({
        title: "Failed to Resend",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Code Sent!",
        description: "A new verification code has been sent to your email.",
      });
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
