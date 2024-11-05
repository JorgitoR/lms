import { Chapter, Course, UserProgress, Profile, Category } from "@prisma/client"
import NavbarRoutes from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

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


interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  currentProfile?: SafeProfile | null;
};


export const CourseNavbar = ({
  course,
  progressCount,
  currentProfile
}: CourseNavbarProps) => {

  return (

      <div className="p-4 border-b h-full flex items-center  shadow-sm">
        <CourseMobileSidebar
          course={course}
          progressCount={progressCount}
        />
        <NavbarRoutes currentProfile={currentProfile} />      
      </div>

  )
}