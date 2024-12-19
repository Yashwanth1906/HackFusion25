import { prisma } from "@/prisma/db";
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
                                email:true,
                                isTeamLead:true
                            }
                        },
                        name:true,
                    }
                }
            }
        })
        if (!memberteam) {
            return NextResponse.json({ success:false,message: "No team found for this member" }, { status: 200 });
        }
        let isTeamLead = false;
        //@ts-ignore
        console.log(email);
        memberteam.team?.members.forEach((x)=>{
            console.log(x)
            if(x.isTeamLead === true && x.email === email){
                isTeamLead = true;
            }
        })
        return NextResponse.json({success:true,teamdetails:memberteam,isTeamLead:isTeamLead},{status:200});
    }  catch(e:any){
        // console.log(e);
        return NextResponse.json({ message: e.message || "Something went wrong" }, { status: 500 });
    }
}