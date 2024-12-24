import { prisma } from "@/prisma/db";
import { createPS } from "@/zod/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req : NextRequest) =>{
    try{
        const body = await req.json();
        const parsedBody = createPS.safeParse(body);
        if(!parsedBody.success){
            return NextResponse.json({success:false,error:parsedBody.error},{status:400})
        }
        await prisma.problemStatement.create({
            data:{
                title:parsedBody.data.title,
                description:parsedBody.data.description,
                theme:parsedBody.data.theme
            }
        });
        return NextResponse.json({success:true,message:"Successfully added PS"},{status:200})
    } catch(e){
        return NextResponse.json({success:false,error:e},{status:500})
    }
}