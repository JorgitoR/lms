"use client";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
    href: string
}

const SidebarItem = ({
    icon:Icon,
    label,
    href

}: SidebarItemProps) => {

    const pathName = usePathname();
    const router   = useRouter();

    const isActive = 
        (pathName === "/" && href === "/") ||
        pathName === href ||
        pathName?.startsWith(`${href}/`)

    const onClick = () => {
        router.push(href);
    }

    return ( 
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && `dark:text-slate-200 dark:bg-sky-200/20 dark:hover:bg-sky-200/20 dark:hover:text-sky-700 text-sky-900 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-900`
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon 
                    size={22}   
                    className={cn(
                        "text-slate-500",
                        isActive && `dark:text-sky-300 text-sky-900`
                    )}
                />
                {label}
            </div>
            <div 
                className={cn(
                    "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                    isActive && `opacity-100`
                )}
            />
        </button> 
        );
}
 
export default SidebarItem;