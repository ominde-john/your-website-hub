import { ArrowRight, Users, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";

const AboutSection = () => {
  return (
    <section className="section-padding bg-gray-900 text-white shadow-inner shadow-black/50">
      <div className="container-custom">
        <SectionTitle
          title="About Our Community"
          subtitle="Teksoft is a community of technology professionals, enthusiasts, and innovators dedicated to sharing knowledge and fostering collaboration."
          centered
        />

        {/* --- Feature Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          {/* 1. Community Hub */}
          <div className="bg-gray-800 rounded-xl p-8 transition-all duration-300 transform hover:shadow-techgold/50 hover:shadow-2xl border border-gray-700 hover:border-techgold/70">
            <div className="bg-techgold/10 text-techgold rounded-full h-14 w-14 flex items-center justify-center mb-6 border border-techgold/30">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Community Hub</h3>
            <p className="text-gray-400 mb-5">Connect with like-minded tech enthusiasts and professionals. Share ideas, collaborate on projects, and grow your network.</p>
            <Link
              to="/about"
              className="text-techgold hover:text-white font-semibold inline-flex items-center transition-colors duration-200 group"
            >
              Learn more
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* 2. Educational Content */}
          <div className="bg-gray-800 rounded-xl p-8 transition-all duration-300 transform hover:shadow-techgold/50 hover:shadow-2xl border border-gray-700 hover:border-techgold/70">
            <div className="bg-techgold/10 text-techgold rounded-full h-14 w-14 flex items-center justify-center mb-6 border border-techgold/30">
              <BookOpen className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Educational Content</h3>
            <p className="text-gray-400 mb-5">Access tutorials, workshops, and resources to enhance your skills. Learn from industry experts and stay updated with latest trends.</p>
            <Link
              to="/blogs"
              className="text-techgold hover:text-white font-semibold inline-flex items-center transition-colors duration-200 group"
            >
              Explore content
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* 3. Events & Updates */}
          <div className="bg-gray-800 rounded-xl p-8 transition-all duration-300 transform hover:shadow-techgold/50 hover:shadow-2xl border border-gray-700 hover:border-techgold/70">
            <div className="bg-techgold/10 text-techgold rounded-full h-14 w-14 flex items-center justify-center mb-6 border border-techgold/30">
              <Calendar className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Events & Updates</h3>
            <p className="text-gray-400 mb-5">Participate in webinars, hackathons, and meetups. Stay informed about upcoming technology events and industry news.</p>
            <Link
              to="/events"
              className="text-techgold hover:text-white font-semibold inline-flex items-center transition-colors duration-200 group"
            >
              View events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* --- Main Call to Action --- */}
        <div className="mt-16 text-center">
          <Link
            to="/about"
            className="group bg-techgold hover:bg-yellow-600 text-black font-extrabold uppercase tracking-widest px-8 py-4 rounded-lg shadow-lg shadow-techgold/50 transition-all duration-300 inline-flex items-center transform hover:scale-[1.03]"
          >
            Learn More About Us
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
