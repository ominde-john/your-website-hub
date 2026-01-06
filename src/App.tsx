import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import BlogsPage from "./pages/BlogsPage";
import EventsPage from "./pages/EventsPage";
import ProjectsPage from "./pages/ProjectsPage";
import DiscussionPage from "./pages/DiscussionPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";
import ContactPage from "./pages/ContactPage";
import ShowcasePage from "./pages/ShowcasePage";
import CareersPage from "./pages/CareersPage";
import MarketplacePage from "./pages/MarketplacePage";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Helmet>
          <title>Teksoft Community | Empowering Technology Everywhere</title>
          <meta
            name="description"
            content="Teksoft Community is a global technology community for developers, innovators, and tech enthusiasts to learn, collaborate, and grow."
          />
        </Helmet>

        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/discussion" element={<DiscussionPage />} />
              <Route path="/dashboard" element={<MemberDashboardPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
