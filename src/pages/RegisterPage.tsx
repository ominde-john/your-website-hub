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

  const navigate = useNavigate();
  const { toast } = useToast();

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

      const { error: codeError } = await supabase
        .from("email_verification_codes")
        .insert({
          email: formData.email.trim().toLowerCase(),
          code: verificationCode,
          expires_at: expiresAt,
        });

      if (codeError) {
        throw new Error("Failed to generate verification code.");
      }

      const { error: emailError } = await supabase.functions.invoke(
        "send-confirmation-email",
        {
          body: {
            email: formData.email.trim(),
            firstName: formData.firstName.trim(),
            code: verificationCode,
          },
        }
      );

      if (emailError) {
        throw new Error("Failed to send confirmation email");
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
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <img src={teksoftLogo} className="mx-auto h-24" />
          <CardTitle className="text-3xl flex justify-center gap-2">
            Join Teksoft <UserPlus />
          </CardTitle>
          <CardDescription>
            Create your account and become part of our community
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input name="firstName" placeholder="First Name" onChange={handleChange} />
            <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
            <Input name="username" placeholder="Username" onChange={handleChange} />
            <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Sending verification...
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
                const redirectUrl = `${window.location.origin}/dashboard`;
                await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: { redirectTo: redirectUrl },
                });
              }}
            >
              <FcGoogle className="mr-2" /> Sign up with Google
            </Button>
          </form>

          <div className="text-center mt-4">
            <Link to="/auth">Sign in to your account</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
