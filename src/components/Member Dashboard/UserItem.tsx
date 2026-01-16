import React from "react";
import { User } from "./types";

interface UserItemProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
        isSelected ? "bg-teal-50 shadow-sm" : "hover:bg-slate-50"
      }`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-11 h-11 rounded-xl object-cover"
        />
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
            user.online ? "bg-green-500" : "bg-slate-300"
          }`}
        ></div>
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center justify-between">
          <p className={`font-medium text-sm truncate ${
            isSelected ? "text-teal-900" : "text-slate-700"
          }`}>
            {user.name}
          </p>
          {user.unreadCount > 0 && (
            <span className="ml-2 w-5 h-5 bg-teal-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {user.unreadCount}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 truncate mt-0.5">{user.role}</p>
      </div>
    </button>
  );
};

export default UserItem;
