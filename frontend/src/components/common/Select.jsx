import React from "react";

const Select = ({
  label,
  options = [],
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">

      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <select
        className={`
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-2.5
          text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default Select;