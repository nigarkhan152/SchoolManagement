const Pagination = ({
  page = 1,
  totalPages = 1,
  hasNext = false,
  hasPrevious = false,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-5">
      <p className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="
            rounded-lg
            border
            border-slate-300
            px-4
            py-2
            text-sm
            disabled:cursor-not-allowed
            disabled:opacity-50
            hover:bg-slate-100
          "
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
            hover:bg-blue-700
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;