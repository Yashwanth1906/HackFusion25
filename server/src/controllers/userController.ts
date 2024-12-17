import { Request, Response } from "express"
import { prisma } from "../db";

export const registerTeam = async (req: Request, res: Response) => {

  try {
    const { teamLeaderDetails, memberDetails, name } = req.body;
    await prisma.$transaction(async (tx) => {
      const team = await tx.team.create({
        //@ts-ignore
        data: {
          name
        }
      })
      teamLeaderDetails.teamId = team.id;
      console.log(teamLeaderDetails)
      await tx.member.create({
        data: teamLeaderDetails
      });
      //@ts-ignore
      memberDetails.forEach((member)=>{
        member.teamId = team.id
      })

      console.log(memberDetails);
      //@ts-ignore
      // memberDetails.forEach(async (member) => {
      //   console.log(member);
      //   await tx.member.create({
      //     data:{
      //       name:member.name,
      //       phoneno:member.phoneno,
      //       regNo: member.regNo,
      //       year:member.year,
      //       email:member.email,
      //       dept:member.dept,
      //       isTeamLead:false,
      //       teamId:member.teamId
      //     }
      //   })
      // });
      for (const member of memberDetails) {
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
            teamId: member.teamId
          }
      });
      }
      return res.status(200).json({
        //@ts-ignore
        teamId: team.id,
        status: "successfully created"
      })
    });
  }
  catch (e) {
    console.log(e)
    return res.status(500).json({
      error: e,
      status: "error while creating "
    })
  }
}
