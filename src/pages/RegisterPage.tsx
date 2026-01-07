import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/* ---------------- SCHEMA ---------------- */

const registerSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ---------------- COMPONENT ---------------- */

export default function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- REGISTER ---------------- */

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Invalid input",
        description: parsed.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      /* 1️⃣ CREATE AUTH USER */
      const { data, error } = await supabase.auth.signUp({
        email: form.email.toLowerCase(),
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error("User not created");

      /* 2️⃣ INSERT USER PROFILE */
      const { error: profileError } = await supabase
        .from("profiles") // 🔁 CHANGE HERE ONLY if your table name is different
        .insert({
          id: data.user.id,
          email: form.email.toLowerCase(),
          first_name: form.firstName,
          last_name: form.lastName,
          username: form.username,
        });

      if (profileError) throw profileError;

      /* 3️⃣ SUCCESS */
      toast({
        title: "Verify your email",
        description:
          "We sent you a verification email. Please verify before logging in.",
      });

      navigate("/auth");
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

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Verify email for authenticity</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input name="firstName" placeholder="First name" onChange={handleChange} />
            <Input name="lastName" placeholder="Last name" onChange={handleChange} />
            <Input name="username" placeholder="Username" onChange={handleChange} />
            <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/auth" className="text-blue-600">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
