import { useState, useEffect } from "react";

const LOADER_DURATION_MS = 1500;
const FADE_DURATION_MS = 300;

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, LOADER_DURATION_MS - FADE_DURATION_MS);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, LOADER_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
      aria-label="Loading Teksoft Community"
      role="status"
    >
      {/* Logo */}
      <div
        aria-label="Teksoft Community logo"
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-techgold to-amber-600 rounded-xl mb-6 shadow-lg"
      >
        <span className="text-white text-2xl font-bold select-none" aria-hidden="true">T</span>
      </div>

      {/* Site name */}
      <h1 className="text-xl font-semibold text-gray-800 mb-1 tracking-wide">
        Teksoft Community
      </h1>
      <p className="text-sm text-gray-500 mb-8">Tech Community Portal</p>

      {/* Circular spinner – hidden for users who prefer reduced motion */}
      <div className="relative w-12 h-12" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-4 border-techgold border-t-transparent motion-safe:animate-spin" />
      </div>

      <p className="mt-4 text-xs text-gray-400 tracking-widest uppercase">
        Loading&hellip;
      </p>
    </div>
  );
}
