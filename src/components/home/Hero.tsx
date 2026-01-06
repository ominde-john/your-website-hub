import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative text-white py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-center lg:text-left">

          {/* SEO-OPTIMIZED H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="block">Teksoft Community</span>
            <span className="block text-techgold">
              Empowering Technology Everywhere
            </span>
          </h1>

          {/* SHORT, CLEAN DESCRIPTION */}
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            A global technology community for developers, innovators,
            and tech enthusiasts to learn, collaborate, and grow.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-techgold hover:bg-techgold-dark text-white border-0"
            >
              <Link to="/register">Join Teksoft Community</Link>
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
    </section>
  );
};

export default Hero;
