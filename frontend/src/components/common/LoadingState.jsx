import { Loader2 } from "lucide-react";

const LoadingState = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <Loader2
        size={42}
        className="animate-spin text-blue-600"
      />

      <p className="mt-4 text-sm text-slate-500">
        {message}
      </p>

    </div>
  );
};

export default LoadingState;