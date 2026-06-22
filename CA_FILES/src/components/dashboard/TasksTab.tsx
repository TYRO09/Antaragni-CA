"use client";

import { TaskItem } from "@/lib/dashboardMockData";

interface TasksTabProps {
  data: TaskItem[];
}

export function TasksTab({ data }: TasksTabProps) {
  return (
    <div className="w-full border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-6 md:p-8 relative">
      <div className="flex flex-col w-full">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 text-[11px] font-sans font-semibold tracking-[0.18em] text-white/40 uppercase pb-5 px-6 md:px-8 border-b border-white/5">
          <div className="col-span-6">DESCRIPTION</div>
          <div className="col-span-3">DEADLINE</div>
          <div className="col-span-1 text-center">POINTS</div>
          <div className="col-span-2 text-right">ACTIONS</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col mt-2">
          {data.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-12 items-center py-4.5 px-6 md:px-8 border-b border-white/5 last:border-none min-h-[72px] gap-3 md:gap-0 transition-all duration-200 hover:bg-white/[0.015]"
            >
              {/* Description */}
              <div className="col-span-12 md:col-span-6 pr-0 md:pr-6">
                <span className="text-[14px] md:text-[15px] font-sans font-medium text-white leading-relaxed break-words">
                  {task.description}
                </span>
              </div>

              {/* Deadline */}
              <div className="col-span-6 md:col-span-3 flex items-center">
                <svg
                  className="w-4 h-4 text-white/40 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <span className="text-[13px] font-sans font-medium text-white/60">
                  {task.deadline}
                </span>
              </div>

              {/* Points */}
              <div className="col-span-2 md:col-span-1 text-center md:text-center flex justify-start md:justify-center">
                <span className="text-[14px] md:text-[15px] font-sans font-semibold text-white/90">
                  {task.points}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-4 md:col-span-2 text-right">
                <button className="w-full max-w-[96px] md:max-w-none md:w-28 py-2 bg-accent hover:bg-red-600 active:bg-accent text-[11px] font-sans font-bold uppercase tracking-wider text-white rounded-md transition-colors duration-200 shadow-lg shadow-accent/10">
                  SUBMIT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
