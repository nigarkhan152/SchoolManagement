import React from "react";
import Select from "./Select";

const FilterBar = ({
  filters = [],
  className = "",
}) => {
  return (
    <div
      className={`flex flex-wrap items-end gap-4 rounded-2xl border border-slate-200 bg-white p-4 ${className}`}
    >
      {filters.map((filter) => (
        <div
          key={filter.name}
          className="min-w-[180px] flex-1"
        >
          <Select
            label={filter.label}
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterBar;