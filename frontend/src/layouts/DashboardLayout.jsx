import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">

        <TopNavbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
        />

        <main
          className={`flex-1 overflow-y-auto bg-slate-100 p-6 transition-all duration-300 ${
            collapsed ? "lg:ml-[90px]" : "lg:ml-0"
          }`}
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;