import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req : NextRequest) =>{
    try{
        //@ts-ignore
        const email = req.headers.get("email");
        console.log(email)
        const udpatedCancel = await prisma.member.delete({
            where:{
                email:email
            }
        })
        return NextResponse.json({success:true,message:"Left the team"},{status:200})
    } catch(e){
        return NextResponse.json({error:e},{status:200})
    }
}