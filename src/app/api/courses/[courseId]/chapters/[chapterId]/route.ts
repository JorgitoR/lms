import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

export async function DELETE(
    req: Request,
    {params}: {params:{courseId:string; chapterId: string}}
){
    try {
        const { userId } = auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            }
        });

        if(!ownCourse){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        });

        if(!chapter){
            return new NextResponse("Not Found", {status: 404});
        }

        if(chapter.videoUrl){
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            });

           // here
        }


    } catch (error) {
        console.log("[CHAPTER_ID_DELETE]", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}