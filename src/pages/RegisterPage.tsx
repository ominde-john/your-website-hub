import { useState } from "react";
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
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import teksoftLogo from "@/assets/teksoft-logo.png";

const registerSchema = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    username: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9_]+$/),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Generate 6-digit OTP
const generateVerificationCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

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

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = registerSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const normalizedEmail = formData.email.trim().toLowerCase();
      const verificationCode = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      // Clean up old unused codes
      await supabase
        .from("email_verification_codes")
        .delete()
        .eq("email", normalizedEmail)
        .eq("used", false);

      // Insert new OTP
      const { error: insertError } = await supabase
        .from("email_verification_codes")
        .insert({
          email: normalizedEmail,
          code: verificationCode,
          expires_at: expiresAt,
        });

      if (insertError) {
        throw new Error("Failed to generate verification code");
      }

      // Send OTP email via Edge Function
      const { error: emailError } =
        await supabase.functions.invoke("send-confirmation-email", {
          body: {
            email: normalizedEmail,
            firstName: formData.firstName.trim(),
            code: verificationCode,
          },
        });

      if (emailError) {
        throw new Error("Failed to send verification email");
      }

      toast({
        title: "Check your email",
        description: "We sent you a 6-digit verification code.",
      });

      navigate("/verify-email", {
        state: {
          email: normalizedEmail,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          username: formData.username.trim(),
          password: formData.password,
        },
      });
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <img
            src={teksoftLogo}
            alt="Teksoft"
            className="mx-auto h-20 w-20 mb-4"
          />
          <CardTitle className="text-3xl flex justify-center gap-2">
            Join Teksoft <UserPlus />
          </CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* FORM FIELDS — unchanged UI */}
            {/* (Your existing JSX stays exactly the same here) */}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Sending verification…
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2" />
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={async () => {
                const { error } =
                  await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo: `${window.location.origin}/dashboard`,
                    },
                  });
                if (error) {
                  toast({
                    title: "Google sign-up failed",
                    description: error.message,
                    variant: "destructive",
                  });
                }
              }}
            >
              <FcGoogle className="mr-2" /> Sign up with Google
            </Button>

            <Link to="/auth" className="block text-center text-sm">
              Already have an account? Sign in →
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
