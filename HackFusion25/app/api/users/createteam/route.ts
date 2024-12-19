import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../prisma/db"
export const POST = async(req:NextRequest) =>{
  try{
    const {teamName,teamLead} = await req.json();
    console.log(teamLead.name,teamLead.email,teamLead.gender,teamLead.regNo)
    const response = await prisma.$transaction(async(tx)=>{
      const newTeam = await tx.team.create({
        data:{
          name:teamName,
        }
      })
      const leaderAdd = await tx.member.create({
        //@ts-ignore
        data:{
          name:teamLead.name, 
          email:teamLead.email, 
          gender:teamLead.gender, 
          regNo:teamLead.regNo, 
          dept:teamLead.dept, 
          year:teamLead.year, 
          phoneno:teamLead.phoneno, 
          isTeamLead:true, 
          teamId:newTeam.id 
        }
      })
      return newTeam.id;
    })
    return NextResponse.json({teamId:response},{status:200})
  } catch(e:any){
    console.log(e) 
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}