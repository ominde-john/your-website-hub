import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import teksoftLogo from "@/assets/teksoft-logo.png";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const AuthPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // reCAPTCHA state
  const [ReCAPTCHA, setReCAPTCHA] = useState<any>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [recaptchaLoading, setRecaptchaLoading] = useState(true);
  const [recaptchaFailed, setRecaptchaFailed] = useState(false);

  // Load reCAPTCHA ONLY in browser (prevents Vercel crash)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof window !== "undefined" && SITE_KEY) {
      import("react-google-recaptcha")
        .then((mod) => {
          setReCAPTCHA(() => mod.default);
          setRecaptchaLoading(false);

          timeoutId = setTimeout(() => {
            const grecaptcha = (window as { grecaptcha?: unknown }).grecaptcha;
            if (!grecaptcha) {
              console.warn("reCAPTCHA failed to render");
              setRecaptchaFailed(true);
            }
          }, 5000);
        })
        .catch(() => {
          setRecaptchaLoading(false);
          setRecaptchaFailed(true);
        });
    } else {
      setRecaptchaLoading(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Validate reCAPTCHA
    if (SITE_KEY && ReCAPTCHA && !recaptchaFailed && !captchaToken) {
      toast({
        title: "Verification required",
        description: "Please confirm you are not a robot.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    let emailToUse = identifier.trim();
    
    // Check if the identifier is not an email (doesn't contain @)
    if (!identifier.includes("@")) {
      // Look up the email from the profiles table using the username
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("username", identifier.trim())
        .maybeSingle();
      
      if (profileError || !profile) {
        setLoading(false);
        toast({
          title: "Login Failed",
          description: "Username not found. Please check your username or use your email.",
          variant: "destructive",
        });
        return;
      }
      
      emailToUse = profile.email;
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    const redirectUrl = "https://teksoftllc.jonzjohn.com/dashboard";
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      toast({
        title: "Google Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renderRecaptcha = () => {
    if (recaptchaLoading && SITE_KEY) {
      return (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="animate-spin mr-2 h-5 w-5 text-techblue" />
          <span className="text-gray-500">Loading verification...</span>
        </div>
      );
    }

    if (ReCAPTCHA && SITE_KEY && !recaptchaFailed) {
      return (
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={(token: string | null) => setCaptchaToken(token)}
            onErrored={() => setRecaptchaFailed(true)}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-techgold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-techblue/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md shadow-2xl border border-white/20 bg-white/95 backdrop-blur-xl relative z-10">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-techblue via-techgold to-techblue rounded-t-lg" />
        
        <CardHeader className="text-center pb-4 pt-8">
          {/* Logo with glow effect */}
          <div className="relative mx-auto mb-6">
            <div className="absolute inset-0 bg-techgold/30 rounded-full blur-xl scale-150" />
            <div className="h-24 w-24 rounded-full bg-[#000000] flex items-center justify-center p-1.5 relative shadow-xl ring-4 ring-techgold/20">
              <img src={teksoftLogo} alt="Teksoft Community" className="h-full w-full object-contain rounded-full" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            Member Login
            <Sparkles className="h-5 w-5 text-techgold" />
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Sign in to access your Teksoft Community account
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-2 pb-8 px-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-gray-700 font-medium">Username or Email</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your username or email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="pl-12 h-12 text-base border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-12 text-base border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-techblue hover:text-techblue-dark transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* reCAPTCHA */}
            {renderRecaptcha()}

            <Button
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-techblue to-techblue-dark hover:from-techblue-dark hover:to-techblue text-white shadow-lg shadow-techblue/25 transition-all duration-300 hover:shadow-xl hover:shadow-techblue/30 hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-medium border-gray-300 hover:bg-gray-50 transition-all"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to Teksoft?</span>
              </div>
            </div>
            <Link 
              to="/register" 
              className="mt-4 inline-flex items-center gap-2 text-techblue hover:text-techblue-dark font-semibold transition-all hover:gap-3"
            >
              Create an account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;