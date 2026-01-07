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

/* -------------------- Validation -------------------- */
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
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* -------------------- Component -------------------- */
const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* -------------------- REGISTER (OTP) -------------------- */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = registerSchema.safeParse(formData);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.errors.forEach((e) => {
        map[e.path[0] as string] = e.message;
      });
      setErrors(map);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email.trim().toLowerCase(),
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We sent you a 6-digit verification code.",
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
      <Card className="w-full max-w-lg bg-white/95 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-black flex items-center justify-center">
            <img src={teksoftLogo} className="h-full w-full rounded-full" />
          </div>

          <CardTitle className="text-3xl flex justify-center gap-2">
            Join Teksoft <UserPlus className="text-techgold" />
          </CardTitle>

          <CardDescription>
            Create your account using email verification
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="firstName" placeholder="First name" onChange={handleChange} />
              <Input name="lastName" placeholder="Last name" onChange={handleChange} />
            </div>

            <Input
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />

            <Input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm"
                onChange={handleChange}
              />
            </div>

            <Button disabled={loading} className="w-full h-12">
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" /> Sending code…
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
                    redirectTo: "https://teksoftllc.jonzjohn.com/dashboard",
                  },
                });
              }}
            >
              <FcGoogle className="mr-2" /> Sign up with Google
            </Button>

            <div className="text-center">
              <Link to="/auth" className="text-techblue font-semibold">
                Already a member? Sign in →
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
