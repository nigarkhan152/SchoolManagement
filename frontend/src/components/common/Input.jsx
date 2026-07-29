import React from "react";

const Input = ({
  label,
  error,
  icon,
  className = "",
  required = false,
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

      <div className="relative">

        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
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
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...props}
        />

      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default Input;