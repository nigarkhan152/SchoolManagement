import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TopNavbar = ({
  collapsed,
  setCollapsed,
  setMobileOpen,
}) => {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

      {/* Left */}

      <div className="flex items-center gap-3">

        {/* Mobile Menu */}

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Collapse */}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-lg p-2 transition hover:bg-slate-100 lg:flex"
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Dashboard
          </h2>

          <p className="text-sm text-slate-500">
            Welcome back 👋
          </p>
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <input
          type="text"
          placeholder="Search..."
          className="hidden w-72 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500 lg:block"
        />

        {/* Notification */}

        <button className="relative rounded-xl p-2 hover:bg-slate-100">

          <FaBell size={18} />

          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}

        <div className="relative">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-slate-100"
          >
            <FaUserCircle
              size={34}
              className="text-blue-600"
            />

            <div className="hidden text-left lg:block">

              <h4 className="text-sm font-semibold text-slate-800">
                Admin
              </h4>

              <p className="text-xs text-slate-500">
                Administrator
              </p>

            </div>

          </button>

          {profileOpen && (

            <div className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

              <button
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100"
              >
                Profile
              </button>

              <button
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100"
              >
                Settings
              </button>

              <hr className="my-2" />

              <button
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
};

export default TopNavbar;