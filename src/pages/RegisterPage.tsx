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

/* -------------------- VALIDATION -------------------- */
const registerSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    username: z
      .string()
      .min(3)
      .regex(/^[a-zA-Z0-9_]+$/, "Invalid username"),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

/* -------------------- COMPONENT -------------------- */
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = registerSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      /* 🔐 SEND OTP EMAIL (SUPABASE HANDLES EVERYTHING) */
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email.trim(),
        options: {
          data: {
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            username: formData.username.trim(),
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We sent you a 6-digit verification code",
      });

      /* ➜ GO TO VERIFY PAGE */
      navigate("/verify-email", {
        state: {
          email: formData.email.trim(),
        },
      });
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-black flex items-center justify-center">
            <img src={teksoftLogo} alt="Teksoft" />
          </div>
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            Join Teksoft <UserPlus className="text-techgold" />
          </CardTitle>
          <CardDescription>
            Create your account using email verification
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input name="firstName" onChange={handleChange} />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Label>Last Name</Label>
                <Input name="lastName" onChange={handleChange} />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Username</Label>
              <Input name="username" onChange={handleChange} />
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input name="email" type="email" onChange={handleChange} />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Confirm</Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Sending OTP...
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
                await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                  },
                });
              }}
            >
              <FcGoogle className="mr-2" /> Sign up with Google
            </Button>

            <p className="text-center text-sm">
              Already a member?{" "}
              <Link to="/auth" className="text-techblue font-semibold">
                Sign in →
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
