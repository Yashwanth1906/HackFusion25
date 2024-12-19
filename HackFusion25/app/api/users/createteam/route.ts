import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../prisma/db"
export const POST = async(req:NextRequest) =>{
  try{
    const {teamName,teamLead} = await req.json();
    console.log(teamLead.name,teamLead.email,teamLead.gender,teamLead.regNo)
    const user = await prisma.member.findFirst({
      where:{
        OR:[
          {email:teamLead.email},{regNo:teamLead.regNo}
        ]
      },select:{
        team:true
      }
    });
    if(user){
      return NextResponse.json({success:false,message:"You have already in a team"})
    }
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
    return NextResponse.json({teamId:response,success:true},{status:200})
  } catch(e:any){

    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}