import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          setError("Failed to authenticate. Please try again.");
          // Redirect to auth page after a delay
          setTimeout(() => navigate("/auth"), 2000);
          return;
        }

        if (session) {
          // Successfully authenticated, redirect to dashboard
          navigate("/dashboard", { replace: true });
        } else {
          // No session found, redirect to auth page
          setError("No active session found.");
          setTimeout(() => navigate("/auth"), 2000);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
        setTimeout(() => navigate("/auth"), 2000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="mt-2 text-slate-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
        <p className="mt-4 text-slate-700 font-medium">Signing you in...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
