import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  breadcrumb,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          {breadcrumb && (
            <p className="mb-2 text-sm text-slate-400">
              {breadcrumb}
            </p>
          )}

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-base text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {children}

          {buttonText && (
            <button
              onClick={onButtonClick}
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-blue-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-200
                hover:bg-blue-700
                hover:shadow-lg
                active:scale-95
              "
            >
              <Plus size={18} />

              {buttonText}
            </button>
          )}

        </div>

      </div>
    </motion.div>
  );
};

export default PageHeader;