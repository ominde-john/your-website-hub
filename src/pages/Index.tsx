import { Helmet } from "react-helmet-async";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import HighlightsSection from "../components/home/HighlightsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import QuickLinksSection from "../components/home/QuickLinksSection";
import JoinCTASection from "../components/home/JoinCTASection";

const HomePage = () => {
  return (
    <>
      {/* SEO METADATA */}
      <Helmet>
        <title>Teksoft Community | Empowering Technology Everywhere</title>
        <meta
          name="description"
          content="Teksoft Community is a global technology community for developers, innovators, and tech enthusiasts to learn, collaborate, and grow together."
        />
        <meta name="keywords" content="Teksoft, tech community, developers, technology events, innovation" />
        <meta name="author" content="Teksoft Community" />

        {/* Open Graph (Social Sharing) */}
        <meta property="og:title" content="Teksoft Community" />
        <meta
          property="og:description"
          content="A global community empowering developers and innovators through collaboration and technology."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* PAGE CONTENT */}
      <div>
        <Hero />
        <AboutSection />
        <HighlightsSection />
        <TestimonialsSection />
        <QuickLinksSection />
        <JoinCTASection />
      </div>
    </>
  );
};

export default HomePage;
