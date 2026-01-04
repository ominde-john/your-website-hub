import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import teksoftLogo from "@/assets/teksoft-logo.png";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 font-poppins">
        <div className="relative pt-16 pb-12">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "radial-gradient(circle at 25px 25px, white 2%, transparent 0%)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
              {/* Logo + About */}
              <div>
                <Link to="/" className="mb-4 inline-block">
                  <img src={teksoftLogo} alt="Teksoft Community" className="h-16 w-16 rounded-full object-cover" />
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Empowering Technology Everywhere. A community of tech enthusiasts,
                  developers, and innovators.
                </p>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition duration-300"
                  >
                    <FaFacebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-sky-400 transition duration-300"
                  >
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-500 transition duration-300"
                  >
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-700 transition duration-300"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold text-xl mb-6 border-b-2 border-techgold inline-block pb-1">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition duration-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition duration-200">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="text-gray-400 hover:text-white transition duration-200">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/projects" className="text-gray-400 hover:text-white transition duration-200">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-400 hover:text-white transition duration-200">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-bold text-xl mb-6 border-b-2 border-techgold inline-block pb-1">
                  Contact Info
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-techgold flex-shrink-0 mt-1 mr-3" />
                    <span className="text-gray-400">Nairobi CBD, Kenya</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-techgold flex-shrink-0 mr-3" />
                    <span className="text-gray-400">0115 000 514</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-techgold flex-shrink-0 mr-3" />
                    <a
                      href="mailto:info@teksoft.org"
                      className="text-gray-400 hover:text-white transition duration-200"
                    >
                      info@teksoft.org
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-white font-bold text-xl mb-6 border-b-2 border-techgold inline-block pb-1">
                  Newsletter
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Subscribe to get the latest tech news, updates, and events directly in your inbox.
                </p>
                <form className="flex flex-col space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-techgold"
                  />
                  <button
                    type="submit"
                    className="p-3 rounded-lg bg-techgold text-gray-900 font-semibold hover:bg-techgold-dark transition duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="bg-gray-950 py-4 border-t border-gray-800">
          <div className="container-custom flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
            <div className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Teksoft. All rights reserved.
            </div>
            <div className="text-gray-500 text-sm space-x-4">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-techgold text-gray-900 p-3 rounded-full shadow-xl z-50 hover:scale-110 transition-all duration-300"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default Footer;
