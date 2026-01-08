import { Users, Briefcase, Building2, CalendarCheck } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { label: "Members", value: "35,000+", icon: <Users className="w-8 h-8 text-techgold" /> },
    { label: "Practitioners", value: "3,000+", icon: <Briefcase className="w-8 h-8 text-techgold" /> },
    { label: "Branches & Chapters", value: "13", icon: <Building2 className="w-8 h-8 text-techgold" /> },
    { label: "Events Hosted", value: "300+", icon: <CalendarCheck className="w-8 h-8 text-techgold" /> },
  ];

  return (
    <section className="py-16 bg-[#f4f4f4]">
      <div className="container-custom px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1.5 h-8 bg-techgold rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4 p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
              <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;