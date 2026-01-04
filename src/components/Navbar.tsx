import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mediaDropdown, setMediaDropdown] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about", dropdown: true },
    { name: "Blogs", path: "/blogs" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects", dropdown: true },
    { name: "Media", path: "/media", dropdown: true },
    { name: "Discussion", path: "/discussion" },
    { name: "Career", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const projectLinks = [
    { name: "Developers Community Hub", path: "/projects", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Tech Workshops & Bootcamps", path: "/projects", icon: <Wrench className="w-4 h-4 text-techgold" /> },
    { name: "Cybersecurity Squad", path: "/projects", icon: <Shield className="w-4 h-4 text-techgold" /> },
    { name: "AI & Robotics Unit", path: "/projects", icon: <Cpu className="w-4 h-4 text-techgold" /> },
    { name: "Web & Mobile Dev Missions", path: "/projects", icon: <Rocket className="w-4 h-4 text-techgold" /> },
    { name: "Gaming & Innovation League", path: "/projects", icon: <Gamepad2 className="w-4 h-4 text-techgold" /> },
  ];

  const aboutLinks = [
    { name: "Who We Are", path: "/about", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Leadership & Governance", path: "/about", icon: <Building2 className="w-4 h-4 text-techgold" /> },
    { name: "Our Community", path: "/about", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Innovation & Impact", path: "/about", icon: <Wrench className="w-4 h-4 text-techgold" /> },
    { name: "Our Journey", path: "/about", icon: <Rocket className="w-4 h-4 text-techgold" /> },
    { name: "Tech Programs", path: "/about", icon: <School className="w-4 h-4 text-techgold" /> },
    { name: "Meet the Team", path: "/about", icon: <Users className="w-4 h-4 text-techgold" /> },
    { name: "Partnerships", path: "/about", icon: <Handshake className="w-4 h-4 text-techgold" /> },
    { name: "Awards", path: "/about", icon: <Trophy className="w-4 h-4 text-techgold" /> },
  ];

  const mediaLinks = [
    { name: "News & Announcements", path: "/blogs", icon: <Megaphone className="w-4 h-4 text-techgold" /> },
    { name: "Press Releases", path: "/blogs", icon: <Newspaper className="w-4 h-4 text-techgold" /> },
    { name: "Blog / Articles", path: "/blogs", icon: <Globe className="w-4 h-4 text-techgold" /> },
    { name: "Gallery", path: "/showcase", icon: <Image className="w-4 h-4 text-techgold" /> },
    { name: "Videos", path: "/showcase", icon: <Video className="w-4 h-4 text-techgold" /> },
    { name: "Podcasts", path: "/blogs", icon: <Mic className="w-4 h-4 text-techgold" /> },
    { name: "Media Appearances", path: "/blogs", icon: <Share2 className="w-4 h-4 text-techgold" /> },
    { name: "Social Media Channels", path: "/contact", icon: <Globe className="w-4 h-4 text-techgold" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* TOP BAR */}
      <div className="hidden md:block bg-gray-900 text-gray-300 text-xs border-b border-techgold/20">
        <div className="container-custom flex justify-between items-center py-2">
          <div className="flex gap-6">
            <a href="tel:0115000514" className="flex items-center gap-1 hover:text-techgold transition-colors">
              <Phone className="w-4 h-4 text-techgold" /> 0115000514
            </a>
            <a href="mailto:info@teksoft.org" className="flex items-center gap-1 hover:text-techgold transition-colors">
              <Mail className="w-4 h-4 text-techgold" /> info@teksoft.org
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="container-custom flex justify-between items-center py-3">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full border-2 border-techblue bg-techblue flex items-center justify-center text-white font-bold text-sm">
            TS
          </div>
          <span className="text-xl font-bold text-gray-900">Teksoft</span>
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
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-techgold transition-colors"
                >
                  {item.name} <ChevronDown className="w-4 h-4" />
                </button>

                {((item.name === "Projects" && projectsDropdown) ||
                  (item.name === "About" && aboutDropdown) ||
                  (item.name === "Media" && mediaDropdown)) && (
                  <div className="absolute left-0 mt-3 w-[540px] grid grid-cols-2 gap-2 rounded-xl bg-white p-4 border shadow-xl animate-fade-in">
                    {(item.name === "Projects"
                      ? projectLinks
                      : item.name === "About"
                      ? aboutLinks
                      : mediaLinks
                    ).map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-50 hover:text-techgold transition-colors"
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
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? "text-techgold"
                    : "text-gray-700 hover:text-techgold hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            )
          )}

          <Link to="/dashboard">
            <Button className="ml-3 h-9 text-sm bg-techblue hover:bg-techblue-dark text-white">
              Member Login
            </Button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 py-3 shadow-lg space-y-2 border-t">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.name}>
                <button
                  onClick={() => {
                    setMobileProjectsOpen(item.name === "Projects" ? !mobileProjectsOpen : false);
                    setMobileAboutOpen(item.name === "About" ? !mobileAboutOpen : false);
                    setMobileMediaOpen(item.name === "Media" ? !mobileMediaOpen : false);
                  }}
                  className="w-full flex justify-between text-sm py-2 text-gray-700"
                >
                  {item.name} <ChevronDown />
                </button>

                {((item.name === "Projects" && mobileProjectsOpen) ||
                  (item.name === "About" && mobileAboutOpen) ||
                  (item.name === "Media" && mobileMediaOpen)) && (
                  <div className="pl-4 space-y-1">
                    {(item.name === "Projects"
                      ? projectLinks
                      : item.name === "About"
                      ? aboutLinks
                      : mediaLinks
                    ).map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block text-xs py-1 hover:text-techgold transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
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
                className="block text-sm py-2 text-gray-700 hover:text-techgold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}

          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full mt-3 bg-techblue hover:bg-techblue-dark text-white">
              Member Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
