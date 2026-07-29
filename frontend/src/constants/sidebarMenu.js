import {
  LayoutDashboard,
  GraduationCap,
  Users,
  School,
  CalendarCheck,
  IndianRupee,
  BookOpen,
  ClipboardList,
  FileBarChart2,
  Settings,
} from "lucide-react";

const sidebarMenu = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Students",
    icon: GraduationCap,
    path: "/students",
  },
  {
    id: 3,
    title: "Teachers",
    icon: Users,
    path: "/teachers",
  },
  {
    id: 4,
    title: "Classes",
    icon: School,
    path: "/classes",
  },
  {
    id: 5,
    title: "Subjects",
    icon: BookOpen,
    path: "/subjects",
  },
  {
    id: 6,
    title: "Attendance",
    icon: CalendarCheck,
    path: "/attendance",
  },
  {
    id: 7,
    title: "Fees",
    icon: IndianRupee,
    path: "/fees",
  },
  {
    id: 8,
    title: "Exams",
    icon: ClipboardList,
    path: "/exams",
  },
  {
    id: 9,
    title: "Reports",
    icon: FileBarChart2,
    path: "/reports",
  },
  {
    id: 10,
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default sidebarMenu;