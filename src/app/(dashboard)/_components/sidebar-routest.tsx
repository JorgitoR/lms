"use client";
import { BarChart, Compass, Layout, List, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import SidebarItem from "./sidebar-items"

const studentRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href:"/"
    },
    {
        icon: Compass,
        label: "Browse",
        href:"/search",
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href:"/teacher/analytics",
    },
    {
        icon: Users,
        label: "Manage Users",
        href:"/teacher/users",
    }
]

const SidebarRoutes = () => {

    const pathName = usePathname();
    const isTeacherPage = pathName?.startsWith("/teacher")
    const routers = isTeacherPage ? teacherRoutes : studentRoutes;

    return ( 
        <div className="flex flex-col w-full">
            {routers.map((route, index) => (
                <SidebarItem 
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}/>
            ))}
        </div>
    );
}
 
export default SidebarRoutes;