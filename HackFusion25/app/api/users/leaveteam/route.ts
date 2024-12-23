import { prisma } from "@/prisma/db";
import { leaveTeamSchema } from "@/zod/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req : NextRequest) =>{
    try{
       
        const email = req.headers.get("email");
        const valid=leaveTeamSchema.safeParse(email)
        if(!valid.success){
            return NextResponse.json({message:"Invalid Email"},
                {status:500}
            )
        }
        console.log(email)
        await prisma.member.delete({
            where:{
                email:valid.data.email
            }
        })
        return NextResponse.json({success:true,message:"Left the team"},{status:200})
    } catch (e: unknown) {  
        if (e instanceof Error) { 
          console.error(e); 
          return NextResponse.json({ success: false, error: e.message }, { status: 500 }); 
        } else { 
          console.error(e);
          return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 }); } 
        }
}