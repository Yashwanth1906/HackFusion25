import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../prisma/db"

export const POST = async (req: NextRequest) => {
    try {
      const { teamLeader, members, teamName } : any = req.body;
      const isUserinAnotherTeam = await prisma.member.findFirst({
        //@ts-ignore
        where:{
          OR:[
            {regNo:teamLeader.regNo},
            {email : teamLeader.email}
          ]
        }
      })
      if(isUserinAnotherTeam){
        return NextResponse.json({message:"You are already in a team"},{status :500});
      }
      let isMemberInAnotherTeam : any= [];
      members.forEach(async(member:any)=>{
        const isMember = await prisma.member.findFirst({
          //@ts-ignore
          where:{
            OR:[
            {regNo:member.regNo},{email:member.email}
            ]
          },select:{
            regNo:true,
            name:true
          }
        })
        if(isMember){
          isMemberInAnotherTeam.push(isMember)
        }
      })
      if(isMemberInAnotherTeam.length !== 0){
        //@ts-ignore
        // return res.status(500).json({member:isMemberInAnotherTeam})
        return NextResponse.json({status:500},{member:isMemberInAnotherTeam})
      }
      await prisma.$transaction(async (tx) => {
        const team = await tx.team.create({
          //@ts-ignore
          data: {
            name:teamName
          }
        })
        teamLeader.isTeamLead = true;
        teamLeader.teamId = team.id;
        console.log(teamLeader)
        await tx.member.create({
          data: teamLeader
        });
        for (const member of members) {
          console.log(member);
          await tx.member.create({
            data: {
              name: member.name,
              phoneno: member.phoneno,
              regNo: member.regNo,
              year: member.year,
              email: member.email,
              dept: member.dept,
              isTeamLead: false,
              teamId: team.id
            }
        });
        }
        // return res.status(200).json({
        //   //@ts-ignore
        //   teamId: team.id,
        //   status: "successfully created"
        // })
        return NextResponse.json({teamId:team.id,message:"Team Successfully created"},{status:200})
      });
    }
    catch (e) {
      console.log(e)
    //   return res.status(500).json({
    //     error: e,
    //     status: "error while creating "
    //   })
        return NextResponse.json({error:e,message:"Error while creating"},{status:500})
    }
  }
  