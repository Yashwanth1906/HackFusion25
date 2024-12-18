import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest) =>{
    try{
        //@ts-ignore
        const email = req.headers['email'];
        const memberteam = await prisma.member.findUnique({
            where:{
                email:email
            },select:{
                team:{
                    select:{
                        members:{
                            select:{
                                name:true,
                                dept:true,
                                year:true,
                                isTeamLead:true
                            }
                        },
                        name:true,
                    }
                }
            }
        })
        return NextResponse.json({teamdetails:memberteam},{status:200});
    }  catch(e){
        console.log(e);
        return NextResponse.json({message:e})
    }
}