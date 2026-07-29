import { NavLink } from "react-router-dom";

const SidebarItem = ({ title, icon: Icon, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium">{title}</span>
    </NavLink>
  );
};

export default SidebarItem;