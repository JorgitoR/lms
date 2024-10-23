import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
){
    try {
        console.log("creando el curso")
        const { userId }: { userId: string | null } = auth()
        const { title } = await req.json();
        
        if(!userId) {   
            return new NextResponse("Unauthorized", {status: 401})
        }

        const course = await db.course.create({
            data: {
                userId,
                title
            },
        });

        return NextResponse.json(course)

    } catch (error) {
        console.error("creating courses: ", error);
        return new NextResponse(`Internal server Error: ${error}`, {status: 500})
    }
}