import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest) =>{
    try{
        //@ts-ignore
        const email = req.headers.get("email");
        const memberteam = await prisma.member.findUnique({
            where:{
                //@ts-ignore
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
        if (!memberteam) {
            return NextResponse.json({ message: "No team found for this member" }, { status: 404 });
        }
        return NextResponse.json({teamdetails:memberteam},{status:200});
    }  catch(e:any){
        console.log(e);
        return NextResponse.json({ message: e.message || "Something went wrong" }, { status: 500 });
    }
}