import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"


export async function POST(
    req: Request,
    {params}: {params:{courseId: string}}
) {
    try {
        const {userId} = auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        const purchaseCourse = await db.purchase.create({
            data:{
                courseId: params.courseId,
                userId: userId
            }
        })

        return NextResponse.json(purchaseCourse);

    } catch (error) {
        console.error("[]", error);
        return new NextResponse("internal Server error: ", {status: 501});
    }
}