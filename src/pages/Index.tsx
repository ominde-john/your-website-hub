import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import HighlightsSection from "../components/home/HighlightsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import QuickLinksSection from "../components/home/QuickLinksSection";
import JoinCTASection from "../components/home/JoinCTASection";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <HighlightsSection />
      <TestimonialsSection />
      <QuickLinksSection />
      <JoinCTASection />
    </div>
  );
};

export default HomePage;
