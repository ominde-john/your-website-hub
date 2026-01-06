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
      <Helmet>
        <title>Teksoft Community | Global Technology Community</title>
        <meta
          name="description"
          content="Teksoft Community is a global technology community for developers, innovators, and tech enthusiasts to learn, collaborate, and grow."
        />
        <link rel="canonical" href="https://teksoftllc.jonzjohn.com/" />
      </Helmet>

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
