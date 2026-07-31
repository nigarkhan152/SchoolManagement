import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

const ActionMenu = ({ items = [] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      {/* Trigger */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-2 transition hover:bg-slate-100"
      >
        <MoreVertical
          size={18}
          className="text-slate-600"
        />
      </button>

      {/* Menu */}

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-lg ring-1 ring-black/5">

          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150
              ${
                item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.icon}

              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;