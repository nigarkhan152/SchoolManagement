import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  className = "",
}) => {
  return (
    <div
      className={`
        relative
        w-full
        max-w-md
        ${className}
      `}
    >
      {/* Search Icon */}

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      {/* Input */}

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          py-3
          pl-11
          pr-11
          text-sm
          text-slate-700
          shadow-sm
          outline-none
          transition-all
          duration-200
          placeholder:text-slate-400
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      />

      {/* Clear Button */}

      {value && (
        <button
          type="button"
          onClick={
            onClear ||
            (() =>
              onChange({
                target: { value: "" },
              }))
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;