import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Check if user exists by looking up their profile
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, email")
        .eq("email", email.toLowerCase())
        .limit(1);

      if (profileError) {
        throw new Error("Failed to verify email");
      }

      if (!profiles || profiles.length === 0) {
        toast({
          title: "Email Not Found",
          description: "No account found with this email address.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const firstName = profiles[0].first_name;

      // Generate verification code
      const verificationCode = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      // Store verification code
      const { error: codeError } = await supabase
        .from("email_verification_codes")
        .insert({
          email: email.toLowerCase(),
          code: verificationCode,
          expires_at: expiresAt,
        });

      if (codeError) {
        throw new Error("Failed to generate reset code");
      }

      // Send password reset email
      const { error: emailError } = await supabase.functions.invoke("send-password-reset-email", {
        body: {
          email: email,
          firstName: firstName,
          code: verificationCode,
        },
      });

      if (emailError) {
        throw new Error("Failed to send reset email");
      }

      toast({
        title: "Reset Code Sent!",
        description: "Check your email for the password reset code.",
      });

      navigate("/reset-password", { state: { email } });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto h-16 w-16 rounded-full bg-techblue/10 flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-techblue" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Forgot Password?</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email and we'll send you a reset code
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-techblue hover:bg-techblue-dark text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                to="/auth"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
