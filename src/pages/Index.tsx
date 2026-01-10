import { Helmet } from "react-helmet-async";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import HighlightsSection from "../components/home/HighlightsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import QuickLinksSection from "../components/home/QuickLinksSection";
import JoinCTASection from "../components/home/JoinCTASection";
import StatsSection from "@/components/home/StatsSection";
import MobileAppSection from "@/components/home/MobileAppSection";
const HomePage = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Teksoft Community | Global Tech Network</title>

        <meta
          name="description"
          content="Teksoft Community is a global technology community for developers and innovators to learn, collaborate, and grow through events, projects, and discussions."
        />

        <link
          rel="canonical"
          href="https://teksoftllc.jonzjohn.com/"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Teksoft Community" />
        <meta
          property="og:description"
          content="A global tech community empowering developers and innovators through collaboration, events, and shared knowledge."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://teksoftllc.jonzjohn.com/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Teksoft Community" />
        <meta
          name="twitter:description"
          content="Join a global community of developers and innovators building the future of technology."
        />
      </Helmet>

      {/* Content */}
      <main>
        <Hero />
        <AboutSection />
        <HighlightsSection />
        <TestimonialsSection />
        <StatsSection/>
        <MobileAppSection />
        <QuickLinksSection />
        <JoinCTASection />
      </main>
    </>
  );
};

export default HomePage;
