import React from 'react';

const TaskCard = ({ task }) => (
  <div className="bg-white border border-gray-100 rounded-3xl p-5 hover:shadow-xl transition-all duration-300 group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <h4 className="font-bold text-gray-800 group-hover:text-techgold transition-colors">{task.title}</h4>
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{task.time}</span>
    </div>
    <ul className="space-y-2 mb-6">
      {task.items.map((item, i) => (
        <li key={i} className="flex items-center text-sm text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-techgold mr-2" />
          {item}
        </li>
      ))}
    </ul>
    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
      <div className="flex -space-x-2">
        {task.members.map((m, i) => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-tr from-amber-100 to-yellow-100 flex items-center justify-center text-[10px] font-bold text-amber-600">
            {m}
          </div>
        ))}
      </div>
      <button className="text-techgold text-xs font-semibold hover:underline">View Details</button>
    </div>
  </div>
);

export default TaskCard;
