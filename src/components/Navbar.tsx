import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Users,
  Wrench,
  Cpu,
  Gamepad2,
  Shield,
  Rocket,
  Building2,
  School,
  Handshake,
  Trophy,
  Newspaper,
  Megaphone,
  Image,
  Video,
  Mic,
  Globe,
  Share2,
  LogOut,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import teksoftLogo from "@/assets/teksoft-logo.png";
import { ThemeToggle } from "@/components/theme-toggle";

interface Profile {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mediaDropdown, setMediaDropdown] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("first_name, last_name, avatar_url")
      .eq("user_id", userId)
      .single();
    
    if (data) {
      setProfile(data);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => fetchProfile(session.user.id), 0);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => fetchProfile(session.user.id), 0);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !aboutRef.current?.contains(e.target as Node) &&
        !projectsRef.current?.contains(e.target as Node) &&
        !mediaRef.current?.contains(e.target as Node)
      ) {
        setProjectsDropdown(false);
        setAboutDropdown(false);
        setMediaDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about", dropdown: true },
    { name: "Blogs", path: "/blogs" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects", dropdown: true },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Media", path: "/media", dropdown: true },
    { name: "Discussion", path: "/discussion" },
    { name: "Career", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const projectLinks = [
    { name: "Developers Community Hub", path: "/projects/developers-hub", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Tech Workshops & Bootcamps", path: "/projects/workshops", icon: <Wrench className="w-4 h-4 text-techgold" /> },
    { name: "Cybersecurity Squad", path: "/projects/cybersecurity", icon: <Shield className="w-4 h-4 text-techgold" /> },
    { name: "AI & Robotics Unit", path: "/projects/ai-robotics", icon: <Cpu className="w-4 h-4 text-techgold" /> },
    { name: "Web & Mobile Dev Missions", path: "/projects/web-mobile", icon: <Rocket className="w-4 h-4 text-techgold" /> },
    { name: "Gaming & Innovation League", path: "/projects/gaming", icon: <Gamepad2 className="w-4 h-4 text-techgold" /> },
  ];

  const aboutLinks = [
    { name: "Who We Are", path: "/about/who-we-are", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Leadership & Governance", path: "/about/leadership", icon: <Building2 className="w-4 h-4 text-techgold" /> },
    { name: "Our Community", path: "/about/community", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Innovation & Impact", path: "/about/innovation", icon: <Wrench className="w-4 h-4 text-techgold" /> },
    { name: "Our Journey", path: "/about/journey", icon: <Rocket className="w-4 h-4 text-techgold" /> },
    { name: "Tech Programs", path: "/about/programs", icon: <School className="w-4 h-4 text-techgold" /> },
    { name: "Meet the Team", path: "/about/team", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Members Panel", path: "/member/dashboard", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Partnerships", path: "/about/partnerships", icon: <Handshake className="w-4 h-4 text-techgold" /> },
    { name: "Awards", path: "/about/awards", icon: <Trophy className="w-4 h-4 text-techgold" /> },
  ];

  const mediaLinks = [
    { name: "Newsletter", path: "/media/newsletter", icon: <Megaphone className="w-4 h-4 text-techgold" /> },
    { name: "News & Announcements", path: "/media/news", icon: <Megaphone className="w-4 h-4 text-techgold" /> },
    { name: "Press Releases", path: "/media/press", icon: <Newspaper className="w-4 h-4 text-techgold" /> },
    { name: "Blog / Articles", path: "/blogs", icon: <Globe className="w-4 h-4 text-techgold" /> },
    { name: "Gallery", path: "/media/gallery", icon: <Image className="w-4 h-4 text-techgold" /> },
    { name: "Videos", path: "/media/videos", icon: <Video className="w-4 h-4 text-techgold" /> },
    { name: "Podcasts", path: "/media/podcasts", icon: <Mic className="w-4 h-4 text-techgold" /> },
    { name: "Media Appearances", path: "/media/appearances", icon: <Share2 className="w-4 h-4 text-techgold" /> },
    { name: "Social Media Channels", path: "/contact", icon: <Globe className="w-4 h-4 text-techgold" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      {/* TOP BAR - UPDATED TO MATCH IMAGE EXACTLY */}
      <div className="hidden md:block bg-[#0a0a0a] text-white text-[13px] border-b border-white/5">
        <div className="container-custom flex justify-between items-center py-2.5 px-4">
          <div className="flex gap-6 items-center">
            <span className="font-bold text-white">Contact Us:</span>
            <a href="tel:0115000514" className="flex items-center gap-2 hover:text-techgold transition-colors">
              <Phone className="w-3.5 h-3.5 fill-white text-white" /> 0115000514
            </a>
            <a href="mailto:info@teksoft.org" className="flex items-center gap-2 hover:text-techgold transition-colors">
              <Mail className="w-3.5 h-3.5 fill-white text-white" /> info@teksoft.org
            </a>
          </div>
          
          {/* SOCIAL ICONS SECTION */}
          <div className="flex gap-5 items-center">
            <Facebook className="w-4 h-4 cursor-pointer hover:text-techgold transition-colors" />
            <span className="text-[14px] font-bold cursor-pointer hover:text-techgold transition-colors leading-none">𝕏</span>
            <Instagram className="w-4 h-4 cursor-pointer hover:text-techgold transition-colors" />
            <Linkedin className="w-4 h-4 cursor-pointer hover:text-techgold transition-colors" />
            <Phone className="w-4 h-4 cursor-pointer hover:text-techgold transition-colors" /> {/* Used as WhatsApp Placeholder */}
            <Youtube className="w-4 h-4 cursor-pointer hover:text-techgold transition-colors" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="container-custom flex justify-between items-center py-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-[#000000] flex items-center justify-center p-0.5 shrink-0">
            <img src={teksoftLogo} alt="Teksoft Community" className="h-full w-full object-contain rounded-full" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Teksoft Community</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.name}
                ref={item.name === "Projects" ? projectsRef : item.name === "About" ? aboutRef : mediaRef}
                className="relative"
              >
                <button
                  onClick={() => {
                    setProjectsDropdown(item.name === "Projects" ? !projectsDropdown : false);
                    setAboutDropdown(item.name === "About" ? !aboutDropdown : false);
                    setMediaDropdown(item.name === "Media" ? !mediaDropdown : false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 text-[14px] font-semibold text-gray-700 dark:text-gray-200 hover:text-techgold transition-colors"
                >
                  {item.name} <ChevronDown className="w-4 h-4" />
                </button>

                {((item.name === "Projects" && projectsDropdown) ||
                  (item.name === "About" && aboutDropdown) ||
                  (item.name === "Media" && mediaDropdown)) && (
                  <div className="absolute left-0 mt-3 w-[540px] grid grid-cols-2 gap-2 rounded-xl bg-white dark:bg-gray-800 p-4 border dark:border-gray-700 shadow-xl animate-fade-in z-50">
                    {(item.name === "Projects"
                      ? projectLinks
                      : item.name === "About"
                      ? aboutLinks
                      : mediaLinks
                    ).map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => {
                          setProjectsDropdown(false);
                          setAboutDropdown(false);
                          setMediaDropdown(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2 text-[13px] rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-techgold transition-colors"
                      >
                        {link.icon} {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-[14px] font-semibold rounded-md transition-colors ${
                  isActive(item.path)
                    ? "text-techgold"
                    : "text-gray-700 dark:text-gray-200 hover:text-techgold"
                }`}
              >
                {item.name}
              </Link>
            )
          )}

          {user ? (
            <div className="flex items-center gap-2 ml-3">
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar className="h-9 w-9 border-2 border-techgold">
                  <AvatarImage src={profile?.avatar_url || ""} alt="Profile" />
                  <AvatarFallback className="bg-techblue text-white text-sm font-medium">
                    {profile?.first_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 px-2 text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign Out</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">Logout</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <Link to="/auth">
              <Button className="ml-3 h-9 text-xs bg-techblue hover:bg-techblue/90 text-white font-bold uppercase tracking-wider">
                Member Login
              </Button>
            </Link>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 dark:text-gray-200">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (KEEPING YOUR GOLD STRUCTURE) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-techgold text-black overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
            <span className="text-xl font-bold">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="px-6 py-6 space-y-2">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="border-b border-black/5 pb-2">
                  <button
                    onClick={() => {
                      setMobileProjectsOpen(item.name === "Projects" ? !mobileProjectsOpen : false);
                      setMobileAboutOpen(item.name === "About" ? !mobileAboutOpen : false);
                      setMobileMediaOpen(item.name === "Media" ? !mobileMediaOpen : false);
                    }}
                    className="w-full flex justify-between items-center py-4 text-lg font-bold"
                  >
                    {item.name}
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                        (item.name === "Projects" && mobileProjectsOpen) ||
                        (item.name === "About" && mobileAboutOpen) ||
                        (item.name === "Media" && mobileMediaOpen) ? "rotate-180" : ""
                    }`} />
                  </button>

                  {((item.name === "Projects" && mobileProjectsOpen) ||
                    (item.name === "About" && mobileAboutOpen) ||
                    (item.name === "Media" && mobileMediaOpen)) && (
                    <div className="mt-2 space-y-1 bg-black/5 rounded-lg p-2">
                      {(item.name === "Projects" ? projectLinks : item.name === "About" ? aboutLinks : mediaLinks).map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 text-[15px] font-medium hover:bg-black/10 rounded-md"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-4 text-lg font-bold border-b border-black/5 ${isActive(item.path) ? "text-white bg-black/10 px-2 rounded-sm" : ""}`}
                >
                  {item.name}
                </Link>
              )
            )}

            {user ? (
               <div className="pt-8 space-y-4">
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-black/10 rounded-xl">
                    <Avatar className="h-12 w-12 border-2 border-black">
                      <AvatarImage src={profile?.avatar_url || ""} />
                      <AvatarFallback>{profile?.first_name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-bold">My Profile</span>
                  </Link>
                  <Button variant="outline" className="w-full h-12 border-black text-black font-bold" onClick={handleLogout}>
                    Sign Out
                  </Button>
               </div>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-14 mt-8 bg-black text-white text-lg font-bold hover:bg-black/90">
                  Member Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;