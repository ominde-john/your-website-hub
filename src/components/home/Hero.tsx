import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative text-white py-16 md:py-24 lg:py-32 overflow-hidden bg-gray-900">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-gradient-to-br from-techblue-dark via-gray-900 to-gray-900"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(30, 136, 229, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(218, 165, 32, 0.2) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16">
          {/* TEXT SECTION */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
              <span className="block">Empowering</span>
              <span className="block">Technology</span>
              <span className="block text-techgold">Everywhere</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Join our community of tech enthusiasts, innovators, and developers to learn,
              collaborate, and grow together.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-techgold hover:bg-techgold-dark text-gray-900 font-semibold"
              >
                <Link to="/about">Join Our Community</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 group"
              >
                <Link to="/events" className="flex items-center gap-2">
                  Explore Events
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* IMAGE/VISUAL SECTION */}
          <div
            className="w-full lg:w-1/2 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-techblue/20 to-techgold/20 rounded-2xl blur-xl" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Tech Team Community"
                className="relative rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
