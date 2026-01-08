import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Lock,
  User,
  AtSign,
  ArrowRight,
  Loader2,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import teksoftLogo from "@/assets/teksoft-logo.png";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
    lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30)
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // reCAPTCHA state
  const [ReCAPTCHA, setReCAPTCHA] = useState<any>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [recaptchaLoading, setRecaptchaLoading] = useState(true);
  const [recaptchaFailed, setRecaptchaFailed] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate reCAPTCHA
    if (SITE_KEY && ReCAPTCHA && !recaptchaFailed && !captchaToken) {
      toast({
        title: "Verification required",
        description: "Please confirm you are not a robot.",
        variant: "destructive",
      });
      return;
    }

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const verificationCode = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      console.log("Attempting to insert verification code for:", formData.email.trim().toLowerCase());

      const { data: insertData, error: codeError } = await supabase
        .from("email_verification_codes")
        .insert({
          email: formData.email.trim().toLowerCase(),
          code: verificationCode,
          expires_at: expiresAt,
        })
        .select();

      console.log("Insert result:", { insertData, codeError });

      if (codeError) {
        console.error("Code insert error:", codeError);
        throw new Error(`Failed to generate verification code: ${codeError.message}`);
      }

      console.log("Sending confirmation email...");

      const { data: emailData, error: emailError } = await supabase.functions.invoke(
        "send-confirmation-email",
        {
          body: {
            email: formData.email.trim(),
            firstName: formData.firstName.trim(),
            code: verificationCode,
          },
        }
      );

      console.log("Email result:", { emailData, emailError });

      if (emailError) {
        console.error("Email error:", emailError);
        throw new Error(`Failed to send confirmation email: ${emailError.message}`);
      }

      toast({
        title: "Check Your Email",
        description: "We've sent you a 6-digit confirmation code.",
      });

      navigate("/verify-email", {
        state: {
          email: formData.email.trim().toLowerCase(),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          username: formData.username.trim(),
          password: formData.password,
        },
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const redirectUrl = "https://teksoftllc.jonzjohn.com/dashboard";
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      toast({
        title: "Google Sign Up Failed",
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

      <Card className="w-full max-w-lg shadow-2xl border border-white/20 bg-white/95 backdrop-blur-xl relative z-10">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-techgold via-techblue to-techgold rounded-t-lg" />
        
        <CardHeader className="text-center pb-4 pt-8">
          {/* Logo with glow effect */}
          <div className="relative mx-auto mb-6">
            <div className="absolute inset-0 bg-techgold/30 rounded-full blur-xl scale-150" />
            <div className="h-24 w-24 rounded-full bg-[#000000] flex items-center justify-center p-1.5 relative shadow-xl ring-4 ring-techgold/20">
              <img src={teksoftLogo} alt="Teksoft Community" className="h-full w-full object-contain rounded-full" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            Join Teksoft
            <Sparkles className="h-5 w-5 text-techgold" />
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Create your account and become part of our community
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-2 pb-8 px-8">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* First Name and Last Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-12 h-12 text-base border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                    required
                  />
                </div>
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-12 h-12 text-base border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                    required
                  />
                </div>
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
              <div className="relative group">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                <Input
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-12 h-12 text-base border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                  required
                />
              </div>
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-12 h-12 text-base border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                  required
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-12 h-12 text-base border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                  required
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-12 h-12 text-base border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
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
                  Sending verification...
                </>
              ) : (
                <>
                  Create Account
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
              onClick={handleGoogleSignup}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            <Link 
              to="/auth" 
              className="mt-4 inline-flex items-center gap-2 text-techblue hover:text-techblue-dark font-semibold transition-all hover:gap-3"
            >
              Sign in to your account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
