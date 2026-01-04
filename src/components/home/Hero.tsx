import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative text-white py-16 md:py-24 lg:py-32 overflow-hidden bg-transparent">
      {/* CONTENT */}
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16">

          {/* TEXT SECTION */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
              <span className="block">Empowering your Business with</span>
              <span className="block text-techgold">Custom Software Solutions</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-gray-100 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Join our community of tech enthusiasts, innovators, and developers to learn, collaborate, and grow together.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-techgold hover:bg-techgold-dark text-white border-0"
              >
                <Link to="/about">Join Our Community</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              >
                <Link to="/events" className="flex items-center">
                  Explore Events <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
