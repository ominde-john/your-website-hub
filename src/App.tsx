import { HelmetProvider, Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import TeksoftNavigator from "./components/TeksoftNavigator";
import ProtectedRoute from "./components/ProtectedRoute";

/* ======================
   MAIN PAGES
====================== */
import HomePage from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import BlogsPage from "./pages/BlogsPage";
import EventsPage from "./pages/EventsPage";
import ProjectsPage from "./pages/ProjectsPage";
import DiscussionPage from "./pages/DiscussionPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";
import MembersDashboard from "./components/Member Dashboard/MemberDashboard";
import ContactPage from "./pages/ContactPage";
import ShowcasePage from "./pages/ShowcasePage";
import CareersPage from "./pages/CareersPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";


/* ======================
   LEGAL PAGES
====================== */
import TermsOfUsePage from "./pages/TermsOfUsePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

/* ======================
   PROJECT PAGES
====================== */
import AIRoboticsPage from "./pages/projects/AIRoboticsPage";
import DevelopersHubPage from "./pages/projects/DevelopersHubPage";
import WorkshopsPage from "./pages/projects/WorkshopsPage";
import CybersecurityPage from "./pages/projects/CybersecurityPage";
import WebMobilePage from "./pages/projects/WebMobilePage";
import GamingPage from "./pages/projects/GamingPage";

/* ======================
   ABOUT SUB-PAGES
====================== */
import WhoWeArePage from "./pages/about/WhoWeArePage";
import LeadershipPage from "./pages/about/LeadershipPage";
import CommunityPage from "./pages/about/CommunityPage";
import InnovationPage from "./pages/about/InnovationPage";
import JourneyPage from "./pages/about/JourneyPage";
import TechProgramsPage from "./pages/about/TechProgramsPage";
import TeamPage from "./pages/about/TeamPage";
import PartnershipsPage from "./pages/about/PartnershipsPage";
import AwardsPage from "./pages/about/AwardsPage";
import NewsletterDetail from "./pages/Newsletter";
import NewsletterDetailPage from "./pages/NewsletterDetailPage";

/* ======================
   MEDIA SUB-PAGES
====================== */
import PressReleasesPage from "./pages/media/PressReleasesPage";
import GalleryPage from "./pages/media/GalleryPage";
import VideosPage from "./pages/media/VideosPage";
import PodcastsPage from "./pages/media/PodcastsPage";
import MediaAppearancesPage from "./pages/media/MediaAppearancesPage";

/* ======================
   QUERY CLIENT
====================== */
const queryClient = new QueryClient();

/* ======================
   APP
====================== */
const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            {/* Global SEO fallback */}
            <Helmet>
              <title>Teksoft Community | Empowering Technology Everywhere</title>
              <meta
                name="description"
                content="Teksoft Community is a global technology community for developers, innovators, and tech enthusiasts."
              />
            </Helmet>

          <Toaster />
          <Sonner />

          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>

                {/* Home */}
                <Route index element={<HomePage />} />

                {/* About */}
                <Route path="about" element={<AboutPage />} />
                <Route path="about/who-we-are" element={<WhoWeArePage />} />
                <Route path="about/leadership" element={<LeadershipPage />} />
                <Route path="about/community" element={<CommunityPage />} />
                <Route path="about/innovation" element={<InnovationPage />} />
                <Route path="about/journey" element={<JourneyPage />} />
                <Route path="about/programs" element={<TechProgramsPage />} />
                <Route path="about/team" element={<TeamPage />} />
                <Route path="about/partnerships" element={<PartnershipsPage />} />
                <Route path="about/awards" element={<AwardsPage />} />

                {/* Core */}
                <Route path="blogs" element={<BlogsPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="projects" element={<ProjectsPage />} />

                {/* Project Units */}
                <Route path="projects/developers-hub" element={<DevelopersHubPage />} />
                <Route path="projects/workshops" element={<WorkshopsPage />} />
                <Route path="projects/cybersecurity" element={<CybersecurityPage />} />
                <Route path="projects/ai-robotics" element={<AIRoboticsPage />} />
                <Route path="projects/web-mobile" element={<WebMobilePage />} />
                <Route path="projects/gaming" element={<GamingPage />} />

                {/* Community */}
                <Route path="discussion" element={<DiscussionPage />} />
                <Route path="dashboard" element={<ProtectedRoute><MemberDashboardPage /></ProtectedRoute>} />
                <Route path="member/dashboard" element={<MembersDashboard />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="showcase" element={<ShowcasePage />} />
                <Route path="careers" element={<CareersPage />} />
                <Route path="marketplace" element={<MarketplacePage />} />
                <Route path="marketplace/product/:slug" element={<ProductDetailsPage />} />

                {/* Community */}
                <Route path="media/news" element={<NewsletterDetail />}/>
                <Route path="media/newsletter" element={<NewsletterDetailPage/>} />
                <Route path="media/press" element={<PressReleasesPage />} />
                <Route path="media/gallery" element={<GalleryPage />} />
                <Route path="media/videos" element={<VideosPage />} />
                <Route path="media/podcasts" element={<PodcastsPage />} />
                <Route path="media/appearances" element={<MediaAppearancesPage />} />
                
                {/* Auth */}
                <Route path="auth" element={<AuthPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="verify-email" element={<VerifyEmailPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route path="profile" element={<ProfilePage />} />

                {/* Legal */}
                <Route path="terms" element={<TermsOfUsePage />} />
                <Route path="privacy" element={<PrivacyPolicyPage />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

              </Route>
            </Routes>
            <TeksoftNavigator />
          </BrowserRouter>
        </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
