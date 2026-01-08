import React from "react";
import { Link } from "react-router-dom";

const newsletters = [
  {
    id: 1,
    title: "Bulletin on the International standard of Sustainability Assurance 5000 (ISSA 5000)",
    date: "October 22, 2023",
    excerpt: "ISSA 5000 BULLETIN Sustainability Assurance 5000 (ISSA 5000)",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "25th ICPAK Chairman's Update | Newsletter Contribution Statement",
    date: "June 30, 2023",
    excerpt: "As I conclude my tenure as Chairman of the Institute, I do so not in departure of the Institute, but with a reaffirmed commitment...",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
  },
  // Add more items here to fill the grid...
];

const NewslettersGrid = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12 px-4">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-techgold pl-4">
          Newsletters
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsletters.map((item) => (
            <div key={item.id} className="bg-white group overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-techblue transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-techgold font-semibold mb-2 uppercase tracking-wider">
                  {item.date}
                </p>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/newsletter/${item.id}`}
                    className="text-xs font-bold text-red-600 uppercase hover:underline flex items-center gap-1"
                  >
                    Read More »
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewslettersGrid;