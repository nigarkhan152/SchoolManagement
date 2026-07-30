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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}

          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
            }}
            className="
              absolute
              right-0
              top-0
              flex
              h-full
              flex-col
              overflow-hidden
              rounded-l-3xl
              border-l
              border-slate-200
              bg-white
              shadow-2xl
            "
            style={{
              width,
              maxWidth: "100%",
            }}
          >
            {/* Header */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                bg-white
                px-6
                py-5
              "
            >
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View complete details
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  p-2
                  text-slate-500
                  transition-all
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}

            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
              {children}
            </div>

            {/* Footer */}

            {footer && (
              <div
                className="
                  sticky
                  bottom-0
                  border-t
                  border-slate-200
                  bg-white
                  px-6
                  py-4
                "
              >
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;