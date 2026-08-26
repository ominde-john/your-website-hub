import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tv, Radio, Newspaper, Globe, ExternalLink, Calendar, Play, ArrowRight, Award, Users, Mic2 } from "lucide-react";

const MediaAppearancesPage = () => {
  const featuredAppearances = [
    {
      id: 1,
      title: "Teksoft Founder Featured on TechCrunch Africa",
      outlet: "TechCrunch",
      type: "Article",
      date: "January 15, 2025",
      description: "An in-depth interview about the future of tech communities in Africa and Teksoft's mission to empower 100,000 developers by 2030.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      link: "#",
      icon: Newspaper,
    },
    {
      id: 2,
      title: "Live Interview on NTV Tech Talk",
      outlet: "NTV Kenya",
      type: "TV",
      date: "December 20, 2024",
      description: "Our CEO discusses the importance of coding education and how Teksoft is bridging the tech skills gap in East Africa.",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
      link: "#",
      icon: Tv,
    },
  ];

  const mediaAppearances = [
    {
      id: 3,
      title: "Guest on 'Future Forward' Podcast",
      outlet: "Future Forward",
      type: "Podcast",
      date: "December 10, 2024",
      description: "Discussing the role of community-driven learning in developing tech talent.",
      icon: Radio,
    },
    {
      id: 4,
      title: "Op-Ed: Why Africa Needs More Tech Communities",
      outlet: "The East African",
      type: "Article",
      date: "November 28, 2024",
      description: "An opinion piece on the transformative power of tech communities in Africa.",
      icon: Newspaper,
    },
    {
      id: 5,
      title: "Panel Discussion at AfricaTech Summit",
      outlet: "AfricaTech Summit",
      type: "Conference",
      date: "November 15, 2024",
      description: "Participated in a panel on 'Building Sustainable Tech Ecosystems'.",
      icon: Users,
    },
    {
      id: 6,
      title: "Interview on Capital FM Morning Show",
      outlet: "Capital FM",
      type: "Radio",
      date: "October 30, 2024",
      description: "Morning show segment about tech career opportunities for young Africans.",
      icon: Radio,
    },
    {
      id: 7,
      title: "Featured in Forbes Africa '30 Under 30'",
      outlet: "Forbes Africa",
      type: "Article",
      date: "October 15, 2024",
      description: "Our CTO recognized for contributions to African tech ecosystem.",
      icon: Award,
    },
    {
      id: 8,
      title: "Webinar: Building Developer Communities",
      outlet: "Microsoft Africa",
      type: "Webinar",
      date: "September 25, 2024",
      description: "Co-hosted webinar with Microsoft on strategies for building engaged developer communities.",
      icon: Globe,
    },
  ];

  const mediaStats = [
    { label: "Media Mentions", value: "120+", icon: Newspaper },
    { label: "TV & Radio Appearances", value: "25+", icon: Tv },
    { label: "Podcast Features", value: "18", icon: Mic2 },
    { label: "Conference Panels", value: "35+", icon: Users },
  ];

  const pressLogos = [
    "TechCrunch", "Forbes Africa", "CNN Africa", "BBC", "The East African", "Business Daily"
  ];

  return (
    <>
      <Helmet>
        <title>Media Appearances | Teksoft Community</title>
        <meta
          name="description"
          content="Teksoft Community in the news - TV appearances, podcast features, press coverage, and conference panels."
        />
      </Helmet>

      <PageHeader
        title="Media Appearances"
        description="Teksoft Community in the spotlight - TV, radio, podcasts, and press coverage"
      />

      {/* Stats Section */}
      <section className="bg-gray-900 py-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mediaStats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="h-8 w-8 text-techgold mx-auto mb-2" />
                <span className="text-3xl font-bold text-white block">{stat.value}</span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Appearances */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-techgold">Appearances</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recent highlights from our media coverage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredAppearances.map((appearance, index) => (
              <div
                key={appearance.id}
                className="group bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={appearance.image}
                    alt={appearance.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-techgold text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <appearance.icon className="h-3 w-3" /> {appearance.type}
                    </span>
                    <span className="bg-white/90 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                      {appearance.outlet}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{appearance.title}</h3>
                    <span className="text-white/70 text-sm flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {appearance.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{appearance.description}</p>
                  <Button variant="outline" className="border-techblue text-techblue hover:bg-techblue hover:text-white">
                    {appearance.type === "TV" ? <Play className="h-4 w-4 mr-2" /> : <ExternalLink className="h-4 w-4 mr-2" />}
                    {appearance.type === "TV" ? "Watch Now" : "Read Article"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Appearances Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Recent <span className="text-techblue">Coverage</span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-techblue/20" />

              {/* Timeline items */}
              <div className="space-y-6">
                {mediaAppearances.map((appearance, index) => (
                  <div
                    key={appearance.id}
                    className="relative pl-20 animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 rounded-full bg-techblue border-4 border-white shadow" />
                    
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-techgold">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <appearance.icon className="h-5 w-5 text-techblue" />
                        <span className="bg-techblue/10 text-techblue text-xs font-semibold px-2 py-1 rounded">
                          {appearance.type}
                        </span>
                        <span className="text-gray-500 text-sm">{appearance.outlet}</span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {appearance.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 hover:text-techblue transition-colors cursor-pointer">
                        {appearance.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{appearance.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button className="bg-techblue hover:bg-techblue-dark text-white">
                View More Coverage
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Logos */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="container-custom">
          <p className="text-center text-gray-500 text-sm font-medium mb-8 uppercase tracking-wider">
            As featured in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {pressLogos.map((logo, index) => (
              <div
                key={index}
                className="text-2xl font-bold text-gray-300 hover:text-gray-500 transition-colors cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit CTA */}
      <section className="section-padding bg-gradient-to-r from-techblue to-techblue-dark text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Media & Press <span className="text-techgold">Kit</span>
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Looking to feature Teksoft Community? Download our press kit for logos, brand assets, executive bios, and company information.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold">
                  Download Press Kit
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    Contact PR Team <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Press Contact</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-techgold">Email:</strong> press@teksoft.org</p>
                  <p><strong className="text-techgold">Phone:</strong> +254 115 000 514</p>
                  <p><strong className="text-techgold">Location:</strong> Nairobi, Kenya</p>
                </div>
                <p className="text-sm text-white/60 mt-6">
                  For media inquiries, interviews, or speaking opportunities, please reach out to our communications team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MediaAppearancesPage;
