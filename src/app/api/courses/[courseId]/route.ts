import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// TODO: here we're

export async function PATCH(req: Request, {params}:{params:{courseId:string}}){
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        console.log("actualizando img: ")

        const course = await db.course.update({
            where:{
                id: courseId,
                userId,
            },
            data: {
                ...values,
            },
        });
        
        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSE ID]: ", error);
        return new NextResponse("Initial server error: ", {status: 500});
    }
}