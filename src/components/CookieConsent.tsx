import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "teksoft-cookie-consent";

type ConsentStatus = "accepted" | "declined" | null;

export const CookieConsent = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedConsent === "accepted" || storedConsent === "declined") {
        setConsentStatus(storedConsent);
      } else {
        // Show the banner if no consent has been given
        setIsVisible(true);
      }
    } catch {
      // localStorage might be unavailable (e.g., private browsing mode)
      // Show the banner anyway
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      // localStorage might be unavailable, but we still hide the banner
    }
    setConsentStatus("accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    } catch {
      // localStorage might be unavailable, but we still hide the banner
    }
    setConsentStatus("declined");
    setIsVisible(false);
  };

  // Don't render if consent has already been given or if not visible
  if (consentStatus || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-24 z-50 p-4 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg animate-in slide-in-from-bottom-5 duration-300 max-w-3xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 text-gray-200">
          <Cookie className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-white mb-1">We use cookies</p>
            <p className="text-gray-300">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
              By clicking "Accept", you consent to our use of cookies. Read our{" "}
              <Link to="/privacy" className="text-yellow-400 hover:underline">
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
