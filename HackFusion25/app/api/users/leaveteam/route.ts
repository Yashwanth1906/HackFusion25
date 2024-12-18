import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req : NextRequest) =>{
    try{
        //@ts-ignore
        const email = await req.headers['email'];
        const udpatedCancel = await prisma.member.delete({
            where:{
                email:email
            }
        })
        return NextResponse.json({message:"Left from date"},{status:200})
    } catch(e){
        console.log(e);
        return NextResponse.json({error:e},{status:200})
    }
}