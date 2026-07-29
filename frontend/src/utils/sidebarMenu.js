import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck,
  IndianRupee,
  FileBarChart2,
  Settings,
} from "lucide-react";

const sidebarMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Students",
    icon: GraduationCap,
    path: "/students",
  },
  {
    title: "Teachers",
    icon: Users,
    path: "/teachers",
  },
  {
    title: "Classes",
    icon: BookOpen,
    path: "/classes",
  },
  {
    title: "Attendance",
    icon: CalendarCheck,
    path: "/attendance",
  },
  {
    title: "Fees",
    icon: IndianRupee,
    path: "/fees",
  },
  {
    title: "Reports",
    icon: FileBarChart2,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default sidebarMenu;