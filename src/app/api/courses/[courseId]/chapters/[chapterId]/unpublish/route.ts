import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
    { params } : { params: {courseId: string; chapterId: string }}
){
    try {
        
        const {userId} = auth();
        if(!userId) {
            return new NextResponse("Unaauthorized", {status: 401})
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
        });

        if(!ownCourse) {
            return new NextResponse("Unauthorized", {status:401});
        }


        const unpublishChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                isPublished: false
            }
        });

        const publishChapterInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            },
        });

        if(!publishChapterInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId
                },
                data: {
                    isPublished: false
                }
            })
        }

        return NextResponse.json(unpublishChapter)

    } catch (error) {
        console.error("[UNPUBLISH_CHAPTER]", error);
        return new NextResponse("Internal Error: ", {status:501})
    }
}