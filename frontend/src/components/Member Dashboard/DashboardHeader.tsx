import React from "react";
import { Link } from "react-router-dom";
import { Search, Info, Phone, ShoppingBag, Newspaper, Calendar, ExternalLink } from "lucide-react";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const navLinks = [
  { name: "About", path: "/about", icon: Info },
  { name: "Events", path: "/events", icon: Calendar },
  { name: "Blogs", path: "/blogs", icon: Newspaper },
  { name: "Marketplace", path: "/marketplace", icon: ShoppingBag },
  { name: "Contact", path: "/contact", icon: Phone },
];

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-100 dark:border-slate-700/50 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-label={link.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-techgold hover:bg-techgold/10 rounded-lg transition-all whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{link.name}</span>
                </Link>
              );
            })}
          </div>
          <Link
            to="/"
            aria-label="Go to Main Site"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-techgold hover:bg-techgold/10 rounded-lg transition-all whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Main Site</span>
          </Link>
        </div>
      </nav>
      
      {/* Dashboard Title and Search */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-techgold focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
