import React from "react";
const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

  secondary:
    "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-5
        py-2.5
        text-sm
        font-medium
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;