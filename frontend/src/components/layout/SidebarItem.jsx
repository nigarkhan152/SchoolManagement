import { NavLink } from "react-router-dom";

const SidebarItem = ({ item, collapsed }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
        }`
      }
    >
      <Icon
        size={20}
        className="flex-shrink-0"
      />

      {!collapsed && (
        <span className="text-sm font-medium">
          {item.title}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarItem;