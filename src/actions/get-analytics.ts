import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";
import { date } from "zod";


type PurchaseWithCourse = Purchase & {
    course: Course;
}

const groupByCourse = (purchase: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number} = {};

    purchase.forEach((index) => {
        const courseTitle = index.course.title;
        if(!grouped[courseTitle]){
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += index.course.price!;
    })

    return grouped;
}

const getAnalytics = async ( userId:string ) => {
    try {
        const purchase = await db.purchase.findMany({
            where:{
                course: {
                    userId: userId
                }
            },
            include: {
                course: true 
            }
        });

        const groupedEarnings = groupByCourse(purchase);
        const data = Object.entries(groupedEarnings).map(([coursetitle, total]) => ({
            name: coursetitle,
            total: total,
        }));

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
        const totalSales   = purchase.length;

        return {
            data,
            totalRevenue,
            totalSales
        }
    } catch (error) {
        console.error("[GET_ANALYTICS]", error);
        return {
            date: [],
            totalRevenue: 0,
            totalSales: 0
        }
    }
}
 
export default getAnalytics;