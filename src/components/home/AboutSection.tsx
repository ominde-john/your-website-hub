import { ArrowRight, Users, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";

const AboutSection = () => {
  return (
    <section className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        <SectionTitle
          title="About Our Community"
          subtitle="Tech Team is a community of technology professionals, enthusiasts, and innovators dedicated to sharing knowledge and fostering collaboration."
          centered
        />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Community Hub */}
          <div className="bg-gray-800 rounded-xl p-8 transition-all duration-300 hover:shadow-techgold/30 hover:shadow-2xl border border-gray-700 hover:border-techgold/50">
            <div className="bg-techgold/10 text-techgold rounded-full h-14 w-14 flex items-center justify-center mb-6 border border-techgold/30">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Community Hub</h3>
            <p className="text-gray-400 mb-5">
              Connect with like-minded tech enthusiasts and professionals. Share ideas, collaborate
              on projects, and grow your network.
            </p>
            <Link
              to="/about"
              className="text-techgold hover:text-white font-semibold inline-flex items-center transition-colors duration-200 group"
            >
              Learn more
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Educational Content */}
          <div className="bg-gray-800 rounded-xl p-8 transition-all duration-300 hover:shadow-techgold/30 hover:shadow-2xl border border-gray-700 hover:border-techgold/50">
            <div className="bg-techgold/10 text-techgold rounded-full h-14 w-14 flex items-center justify-center mb-6 border border-techgold/30">
              <BookOpen className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Educational Content</h3>
            <p className="text-gray-400 mb-5">
              Access tutorials, workshops, and resources to enhance your skills. Learn from industry
              experts and stay updated with latest trends.
            </p>
            <Link
              to="/blogs"
              className="text-techgold hover:text-white font-semibold inline-flex items-center transition-colors duration-200 group"
            >
              Explore content
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Events & Updates */}
          <div className="bg-gray-800 rounded-xl p-8 transition-all duration-300 hover:shadow-techgold/30 hover:shadow-2xl border border-gray-700 hover:border-techgold/50">
            <div className="bg-techgold/10 text-techgold rounded-full h-14 w-14 flex items-center justify-center mb-6 border border-techgold/30">
              <Calendar className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Events & Updates</h3>
            <p className="text-gray-400 mb-5">
              Participate in webinars, hackathons, and meetups. Stay informed about upcoming
              technology events and industry news.
            </p>
            <Link
              to="/events"
              className="text-techgold hover:text-white font-semibold inline-flex items-center transition-colors duration-200 group"
            >
              View events
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-techblue hover:bg-techblue-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Learn More About Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
