import React from "react";
import { Plus } from "lucide-react";
import Button from "./Button";

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  showButton = true,
}) => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right */}
      {showButton && (
        <Button onClick={onButtonClick}>
          <Plus size={18} className="mr-2" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;