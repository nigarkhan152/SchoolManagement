import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  description = "There is nothing to display.",
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

      <Inbox
        size={56}
        className="text-slate-400"
      />

      <h3 className="mt-5 text-xl font-semibold text-slate-700">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}

    </div>
  );
};

export default EmptyState;