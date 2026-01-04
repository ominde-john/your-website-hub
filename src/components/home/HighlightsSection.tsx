import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import { ArrowRight, Rss, CalendarCheck, Code } from "lucide-react";

const HighlightsSection = () => {
  const highlights = [
    {
      category: "Blog",
      title: "The Future of AI in Everyday Applications",
      description: "Explore how artificial intelligence is being integrated into daily applications, from smart homes to mobile productivity tools.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      link: "/blogs",
      icon: <Rss className="h-5 w-5 text-white" />
    },
    {
      category: "Event",
      title: "Annual Tech Conference 2023",
      description: "Join us for our biggest tech conference of the year featuring inspiring keynotes and networking opportunities with industry leaders.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      link: "/events",
      icon: <CalendarCheck className="h-5 w-5 text-white" />
    },
    {
      category: "Project",
      title: "Open Source AI Assistant",
      description: "A community-led project focusing on building an accessible, open-source AI assistant for everyone—join the development team!",
      image: "/WhatsApp Image 2025-12-08 at 11.15.32 PM.jpeg",
      link: "/projects",
      icon: <Code className="h-5 w-5 text-white" />
    }
  ];

  return (
    <section className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        <SectionTitle
          title="Latest Highlights"
          subtitle="Check out the most recent and noteworthy content from our community"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {highlights.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="group block bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-all duration-300 transform hover:shadow-techgold/60 hover:shadow-3xl hover:translate-y-[-4px]"
            >
              <div className="relative w-full h-52">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="absolute top-4 left-4 bg-black/60 p-2 rounded-full border border-techgold text-techgold shadow-lg">
                  {item.icon}
                </div>
              </div>

              <div className="p-6">
                <span className="text-sm font-bold text-techgold bg-techgold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>

                <h3 className="text-2xl font-bold mt-4 mb-3 text-white transition-colors duration-200 group-hover:text-techgold">
                  {item.title}
                </h3>

                <p className="text-gray-400 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <span className="text-techgold font-semibold inline-flex items-center mt-2">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* --- Main Call to Action --- */}
        <div className="mt-16 text-center">
          <Button
            asChild
            className="group bg-techgold hover:bg-yellow-600 text-black font-extrabold uppercase tracking-widest px-8 py-4 shadow-lg shadow-techgold/50 transition-all duration-300 transform hover:scale-[1.03]"
          >
            <Link to="/blogs" className="flex items-center">
              View All Content
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
