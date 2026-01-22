import React from "react";
import { Package, FileText } from "lucide-react";
import { StatCard as StatCardType } from "./types";

interface StatCardProps {
  stat: StatCardType;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const colorConfig = {
    cyan: {
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      text: "text-cyan-500 dark:text-cyan-400",
      icon: Package
    },
    emerald: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-500 dark:text-emerald-400",
      icon: null
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-500 dark:text-orange-400",
      icon: FileText
    }
  };

  const config = colorConfig[stat.color as keyof typeof colorConfig];
  const Icon = config.icon;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 ${config.bg} rounded-xl flex items-center justify-center`}>
          {stat.color === 'emerald' ? (
            <div className={`w-7 h-7 rounded-full border-3 border-emerald-500 dark:border-emerald-400 flex items-center justify-center`}>
              <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full"></div>
            </div>
          ) : Icon ? (
            <Icon className={`w-7 h-7 ${config.text}`} />
          ) : null}
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;