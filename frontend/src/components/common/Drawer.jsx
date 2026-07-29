import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "500px",
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ x: width }}
          animate={{ x: 0 }}
          exit={{ x: width }}
          transition={{ duration: 0.25 }}
          className="absolute right-0 top-0 flex h-full flex-col bg-white shadow-2xl"
          style={{ width }}
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-800">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>

          {/* Footer */}

          {footer && (
            <div className="border-t border-slate-200 px-6 py-4">
              {footer}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Drawer;