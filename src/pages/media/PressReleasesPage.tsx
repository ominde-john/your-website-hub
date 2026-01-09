import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Calendar, ArrowRight, Download, ExternalLink } from "lucide-react";

const PressReleasesPage = () => {
  const pressReleases = [
    {
      id: 1,
      title: "Teksoft Community Launches AI Innovation Hub in Nairobi",
      date: "December 15, 2025",
      excerpt: "Teksoft Community announces the opening of its new AI Innovation Hub, providing state-of-the-art facilities for AI research and development across East Africa.",
      category: "Expansion",
      featured: true,
    },
    {
      id: 2,
      title: "Partnership with Microsoft to Empower 10,000 African Developers",
      date: "November 28, 2025",
      excerpt: "A groundbreaking partnership with Microsoft aims to provide cloud computing training and certifications to 10,000 developers across the African continent.",
      category: "Partnership",
      featured: true,
    },
    {
      id: 3,
      title: "Teksoft Cybersecurity Squad Wins Regional Hackathon",
      date: "November 10, 2025",
      excerpt: "Our Cybersecurity Squad emerged victorious at the East African Cyber Challenge, demonstrating exceptional skills in threat detection and incident response.",
      category: "Achievement",
      featured: false,
    },
    {
      id: 4,
      title: "New Tech Bootcamp Series Announced for Q1 2026",
      date: "October 25, 2025",
      excerpt: "Teksoft Community unveils an ambitious bootcamp series covering web development, mobile apps, and cloud computing, set to launch in January 2026.",
      category: "Education",
      featured: false,
    },
    {
      id: 5,
      title: "Teksoft Community Reaches 5,000 Active Members Milestone",
      date: "October 5, 2025",
      excerpt: "We celebrate reaching 5,000 active members across 15 countries, marking a significant milestone in our mission to empower technology enthusiasts globally.",
      category: "Milestone",
      featured: false,
    },
    {
      id: 6,
      title: "Annual Developer Conference Dates Announced",
      date: "September 15, 2025",
      excerpt: "Save the date! TeksoftCon 2026 will take place March 15-17, 2026, featuring industry leaders, workshops, and networking opportunities.",
      category: "Event",
      featured: false,
    },
  ];

  const categories = ["All", "Partnership", "Achievement", "Education", "Milestone", "Event", "Expansion"];

  return (
    <>
      <Helmet>
        <title>Press Releases | Teksoft Community</title>
        <meta
          name="description"
          content="Stay updated with the latest news, announcements, and press releases from Teksoft Community."
        />
      </Helmet>

      <PageHeader
        title="Press Releases"
        description="Official announcements, news, and updates from Teksoft Community"
      />

      {/* Featured Press Releases */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-techgold">Announcements</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Highlights from our most significant recent updates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {pressReleases.filter(pr => pr.featured).map((release, index) => (
              <div
                key={release.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-techgold text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    {release.category}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {release.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{release.title}</h3>
                <p className="text-gray-300 mb-6">{release.excerpt}</p>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="border-techgold text-techgold hover:bg-techgold hover:text-gray-900">
                    Read Full Release <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    <Download className="h-4 w-4 mr-2" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Press Releases */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All <span className="text-techblue">Press Releases</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="border-gray-300 hover:border-techblue hover:text-techblue"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Press Release List */}
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <div
                key={release.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-up border-l-4 border-techgold"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-techblue" />
                    <span className="text-sm font-medium text-techblue">{release.category}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-500">{release.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-techblue transition-colors cursor-pointer">
                    {release.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{release.excerpt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="text-gray-500 hover:text-techblue">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-500 hover:text-techblue">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="bg-techblue hover:bg-techblue-dark text-white">
              Load More Press Releases
            </Button>
          </div>
        </div>
      </section>

      {/* Media Contact Section */}
      <section className="section-padding bg-gradient-to-r from-techblue to-techblue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Media <span className="text-techgold">Inquiries</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            For press inquiries, interviews, or media kits, please reach out to our communications team.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/contact" className="flex items-center gap-2">
              Contact Media Team <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default PressReleasesPage;
