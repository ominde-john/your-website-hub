import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JoinCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-techblue relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to join our tech community?
            </h2>
            <p className="text-xl text-white/90">
              Become a member today to access exclusive content, join events, and connect with
              fellow tech enthusiasts.
            </p>
          </div>

          <div className="md:w-2/5 flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
            <Button
              asChild
              size="lg"
              className="bg-techgold hover:bg-techgold-dark text-gray-900 border-0 font-semibold"
            >
              <Link to="/register">Join Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTASection;
