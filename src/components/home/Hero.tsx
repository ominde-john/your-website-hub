import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_GROUP_URL } from "@/lib/utils";
import { useEffect, useState } from "react";
import TypewriterText from "@/components/ui/TypewriterText";
import WaveText from "@/components/ui/WaveText";

const Hero = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="relative text-white py-20 md:py-28 lg:py-32 overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Background Video - only shows if user doesn't prefer reduced motion */}
      {!prefersReducedMotion && (
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          {/* HD video for better performance */}
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Static background image fallback for reduced motion preference */}
      {prefersReducedMotion && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay for better text readability - reduced opacity to show video better */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-slate-800/70" />

      {/* Animated floating particles for visual interest - limited to 3 for performance */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-techgold/30 rounded-full animate-float" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400/20 rounded-full animate-float-delayed" />
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white/20 rounded-full animate-float-slow" />
        </div>
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-center lg:text-left">

          {/* SEO-OPTIMIZED H1 with animations */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${!prefersReducedMotion ? 'animate-fade-in-up' : ''}`}>
            <span className="block">
              {!prefersReducedMotion ? (
                <TypewriterText 
                  text="Teksoft Community" 
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseDuration={2000}
                />
              ) : (
                "Teksoft Community"
              )}
            </span>
            <span className="block text-techgold">
              {!prefersReducedMotion ? (
                <WaveText 
                  text="Empowering Technology Everywhere" 
                  delay={0.3}
                  duration={0.03}
                />
              ) : (
                "Empowering Technology Everywhere"
              )}
            </span>
          </h1>

          {/* SHORT, CLEAN DESCRIPTION */}
          <p className={`text-lg md:text-xl text-gray-200 mb-8 ${!prefersReducedMotion ? 'animate-fade-in-up animation-delay-200' : ''}`}>
            {!prefersReducedMotion ? (
              <WaveText 
                text="A global technology community for developers, innovators, and tech enthusiasts to learn, collaborate, and grow." 
                delay={0.5}
                duration={0.02}
              />
            ) : (
              "A global technology community for developers, innovators, and tech enthusiasts to learn, collaborate, and grow."
            )}
          </p>

          {/* CTA BUTTONS */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${!prefersReducedMotion ? 'animate-fade-in-up animation-delay-400' : ''}`}>
            <Button
              asChild
              size="lg"
              className="bg-techgold hover:bg-techgold-dark text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-techgold/25"
            >
              <Link to="/register">Join Teksoft Community</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/15"
            >
              <Link to="/events" className="flex items-center">
                Explore Events <ChevronRight className={`ml-2 h-4 w-4 transition-transform ${!prefersReducedMotion ? 'group-hover:translate-x-1' : ''}`} />
              </Link>
            </Button>
          </div>

          {/* WHATSAPP GROUP BUTTON */}
          <div className={`mt-6 flex justify-center lg:justify-start ${!prefersReducedMotion ? 'animate-fade-in-up animation-delay-600' : ''}`}>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <FaWhatsapp className={`h-6 w-6 transition-transform ${!prefersReducedMotion ? 'group-hover:rotate-12' : ''}`} />
              Join Our WhatsApp Group
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
