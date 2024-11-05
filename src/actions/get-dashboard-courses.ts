import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";


type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
}

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress: CourseWithProgressWithCategory[];
}

const getDashboardCourses = async (userId:string): Promise<DashboardCourses> => {
    try {

        // TODO: If the course is free??
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId
            },
            select:{
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true
                            }
                        }
                    }
                }
            }
        });

        console.log("Revisando los cursos: ", purchasedCourses)

        const courses = purchasedCourses.map((index) => index.course) as CourseWithProgressWithCategory[];


        for(let course of courses){
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        console.log("coursescoursescoursescoursescourses: ", courses)

        const completedCourses  = courses.filter((course) => course.progress === 100);
        const coursesInProgress = courses.filter((course) => course.progress !== 100 );

        
        return {
            completedCourses,
            coursesInProgress,
        }

    } catch (error) {
        return {
            completedCourses: [],
            coursesInProgress: []
        }
    }
}
 
export default getDashboardCourses;