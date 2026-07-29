import sidebarMenu from "../../utils/sidebarMenu";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Logo */}

      <div className="border-b border-slate-200 p-6">
        <h1 className="text-3xl font-bold text-blue-600">
          EduManage
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          School ERP
        </p>
      </div>

      {/* Menu */}

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {sidebarMenu.map((item) => (
          <SidebarItem
            key={item.title}
            {...item}
          />
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm font-semibold text-slate-700">
            Academic Year
          </p>

          <p className="mt-1 text-blue-600">
            2026-27
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;