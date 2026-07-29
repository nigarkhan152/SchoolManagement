import { AlertTriangle } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center">

      <AlertTriangle
        size={56}
        className="text-red-500"
      />

      <h3 className="mt-5 text-xl font-semibold text-red-700">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-red-600">
        {description}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
        >
          Try Again
        </button>
      )}

    </div>
  );
};

export default ErrorState;