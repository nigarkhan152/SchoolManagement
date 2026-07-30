import React from "react";

const TextArea = ({
  label,
  error,
  required = false,
  rows = 4,
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

      <textarea
        rows={rows}
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
          resize-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;