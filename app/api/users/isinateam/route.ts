import { prisma } from "@/prisma/db";
import { isinaTeamSchema } from "@/zod/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest) =>{
    try{
        const email = req.headers.get("email");
        const valid=isinaTeamSchema.safeParse({email})
        if(!valid.success){
            return NextResponse.json({message:"Invalid Email"},
                {status:500}
              )
        }
        const memberteam = await prisma.member.findUnique({
            where:{  
                email:valid.data.email
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
                        id:true
                    }
                }
            }
        })
        if (!memberteam) {
            return NextResponse.json({ success:false,message: "No team found for this member" }, { status: 200 });
        }
        let isTeamLead = false;
       
        console.log(email);
        memberteam.team?.members.forEach((x)=>{
            console.log(x)
            if(x.isTeamLead === true && x.email === email){
                isTeamLead = true;
            }
        })
        return NextResponse.json({success:true,teamdetails:memberteam,isTeamLead:isTeamLead},{status:200});
    }  catch(e){

        return NextResponse.json(
          { error: e instanceof Error ? e.message : "Unknown error" },
          { status: 500 }
        );
      }
}