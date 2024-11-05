"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import SearchInput from "./search";
import { Category, Course, Profile } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

export type SafeProfile = Omit<
  Profile,
  "createdAt" | "updatedAt" 
> & {
  createdAt: string;
  updatedAt: string;
};


interface NavbarRoutesProps  {
    currentProfile?: SafeProfile | null
  }

  export const NavbarRoutes : React.FC<NavbarRoutesProps> = ({
    currentProfile
  }) => {

    const pathName = usePathname();
    const isTeacherPage = pathName?.startsWith("/teacher");
    const isPlayerPage  = pathName?.includes("/chapters");
    const isSearchPage = pathName === "/search";
    const isTeacher = currentProfile?.role === "ADMIN" || currentProfile?.role === "TEACHER";


    return ( 
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isPlayerPage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2"/>
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Teacher mode
                        </Button>
                    </Link>
                )}
                <UserButton afterSwitchSessionUrl="/"/>
            </div>
        </>
     );
}
 
export default NavbarRoutes;