import { GraduationCap, Users, BookOpen, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import workspaceImage from "../../assets/images/study-workspace.webp";

const LeftPanel = () => {
  return (
    <div className="hidden lg:flex relative overflow-hidden items-center justify-center">

      {/* Background Image */}
      <img
        src={workspaceImage}
        alt="Workspace"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/55 via-blue-900/55 to-cyan-700/50 backdrop-blur-sm" />
      {/* Floating Blur */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex h-full max-w-xl flex-col justify-center px-16"
      >
      <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl shadow-2xl">          <GraduationCap size={34} className="text-white" />
        </div>

        {/* <h1 className="text-6xl font-extrabold tracking-tight text-white leading-tight">
          Manage Your
          <br />
          School Smarter
        </h1>
        <p className="mt-3 text-lg font-medium tracking-wide text-cyan-200">
          with EduManage ERP
      </p> */}
      <h1 className="text-[42px] font-bold leading-[1.2] tracking-tight text-white">
        Welcome to
        <br />
        <span className="text-cyan-200">EduManage</span>
      </h1>

      <p className="mt-3 text-base font-normal leading-7 text-slate-200">
        Smart School Management ERP designed to simplify
        student records, attendance, academics and administration.
      </p>
        <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
          A modern School ERP to manage students, teachers,
          attendance, examinations and administration from one place.
        </p>

        <div className="mt-10 space-y-4">

          <div className="flex items-center gap-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-4">
            <Users size={22} className="text-cyan-300" />
            <span className="text-white font-medium">
              Student Management
            </span>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-4">
            <BookOpen size={22} className="text-cyan-300" />
            <span className="text-white font-medium">
              Academic Records
            </span>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-4">
            <CalendarCheck size={22} className="text-cyan-300" />
            <span className="text-white font-medium">
              Attendance Tracking
            </span>
          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default LeftPanel;