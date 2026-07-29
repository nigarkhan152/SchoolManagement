import LeftPanel from "../pages/auth/LeftPanel";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.08fr_1fr] bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <LeftPanel />

      <div className="relative flex items-center justify-center overflow-hidden px-8 py-10">

        <div className="absolute h-96 w-96 rounded-full bg-blue-100 blur-3xl opacity-60"></div>

        <div className="relative z-10">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;