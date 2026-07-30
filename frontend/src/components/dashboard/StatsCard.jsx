import React from "react";

const StatsCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-1 text-xs text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;