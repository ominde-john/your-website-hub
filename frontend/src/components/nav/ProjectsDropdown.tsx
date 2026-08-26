import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const projects = [
  {
    name: "Developers Community Hub",
    path: "/projects/developers-hub",
  },
  {
    name: "Cybersecurity Squad",
    path: "/projects/cybersecurity",
  },
  {
    name: "AI & Robotics Unit",
    path: "/projects/ai-robotics",
  },
  {
    name: "Web & Mobile Dev Missions",
    path: "/projects/web-mobile",
  },
  {
    name: "Tech Workshops & Bootcamps",
    path: "/projects/workshops",
  },
  {
    name: "Gaming & Innovation League",
    path: "/projects/gaming",
  },
];

const ProjectsDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Main Projects Tab */}
      <button className="flex items-center gap-1 font-medium text-white hover:text-teksoft-gold transition">
        Projects
        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-72 rounded-xl bg-white shadow-xl border">
          <ul className="grid grid-cols-2 gap-4 p-4">
            {projects.map((project) => (
              <li key={project.path}>
                <NavLink
                  to={project.path}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  activeClassName="bg-gray-100 font-semibold"
                >
                  {project.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectsDropdown;
