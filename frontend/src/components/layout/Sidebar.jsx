import { GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import sidebarMenu from "../../constants/sidebarMenu";
import SidebarItem from "./SidebarItem";

const Sidebar = ({
  collapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  return (
    <>
      {/* Mobile Overlay */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}

      <motion.aside
        animate={{
          width: collapsed ? 90 : 280,
        }}
        transition={{
          duration: 0.25,
        }}
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          flex-col
          border-r
          border-slate-200
          bg-white
          shadow-lg
          lg:relative
          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}

        <div className="flex items-center gap-4 border-b border-slate-200 px-5 py-6">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">

            <GraduationCap size={26} />

          </div>

          {!collapsed && (
            <div>

              <h2 className="text-xl font-bold text-slate-800">
                EduManage
              </h2>

              <p className="text-sm text-slate-500">
                School ERP
              </p>

            </div>
          )}
        </div>

        {/* Menu */}

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">

          {sidebarMenu.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              collapsed={collapsed}
            />
          ))}

        </nav>

        {/* Footer */}

        <div className="border-t border-slate-200 p-4">

          <div className="rounded-2xl bg-slate-50 p-4">

            {!collapsed ? (
              <>
                <p className="text-sm text-slate-500">
                  Academic Year
                </p>

                <h3 className="mt-1 font-semibold text-slate-800">
                  2026 – 2027
                </h3>
              </>
            ) : (
              <p className="text-center font-semibold text-blue-600">
                26
              </p>
            )}

          </div>

        </div>

      </motion.aside>
    </>
  );
};

export default Sidebar;