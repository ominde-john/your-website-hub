import React from "react";
import { Booking, StatCard as StatCardType } from "./types";
import StatCard from "./StatCard";
import BookingTable from "./BookingTable";

interface DashboardContentProps {
  stats: StatCardType[];
  bookings: Booking[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ stats, bookings }) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-900">
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <BookingTable bookings={bookings} />
    </div>
  );
};

export default DashboardContent;