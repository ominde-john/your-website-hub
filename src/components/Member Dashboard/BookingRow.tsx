import React from "react";
import { Booking } from "./types";

interface BookingRowProps {
  booking: Booking;
}

const StatusBadge: React.FC<{ status: Booking['status'] }> = ({ status }) => {
  const config = {
    Successful: { color: 'bg-emerald-500', text: 'Successful' },
    Error: { color: 'bg-amber-500', text: 'Error' },
    Cancelled: { color: 'bg-red-500', text: 'Cancelled' }
  };

  const { color, text } = config[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-sm text-slate-700">{text}</span>
    </div>
  );
};

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={booking.avatar}
            alt={booking.hiredBy}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-slate-800 text-sm">
              {booking.vehicle}
            </div>
            <div className="text-xs text-slate-500">
              Hired by {booking.hiredBy}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-xs text-slate-500 mb-1">Order ID.</div>
        <div className="font-medium text-slate-700">{booking.orderId}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-xs text-slate-500 mb-1">Amount</div>
        <div className="font-medium text-slate-700">{booking.amount}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-xs text-slate-500 mb-1">Location</div>
        <div className="font-medium text-slate-700">{booking.location}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-xs text-slate-500 mb-1">Date</div>
        <div className="font-medium text-slate-700">{booking.date}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-xs text-slate-500 mb-1">Status</div>
        <StatusBadge status={booking.status} />
      </td>
    </tr>
  );
};

export default BookingRow;