import { Request, Response } from "express"
import { prisma } from "../db";

export const registerTeam = async (req: Request, res: Response) => {

  try {
    const { teamLeaderDetails, memberDetails, name } = req.body;
    const isUserinAnotherTeam = await prisma.member.findUnique({
      //@ts-ignore
      where:{
        OR:[
          {regNo:teamLeaderDetails.regNo},
          {email : teamLeaderDetails.email}
        ]
      }
    })
    if(isUserinAnotherTeam){
      return res.status(500).json({message:"You are already in a team"});
    }
    let isMemberInAnotherTeam : any= [];
    memberDetails.forEach(async(member:any)=>{
      const isMember = await prisma.member.findUnique({
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
      return res.status(500).json({member:isMemberInAnotherTeam})
    }
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
            teamId: team.id
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


export const submitIdea = async(req:any,res: any)=>{
  try{
    const {solutionTitle,description,problemId} = req.body;
    console.log(req.user.email);
    const teamId = await prisma.member.findUnique({
      where:{
        email:req.user.email
      },select:{
        teamId:true
      }
    })
    if(teamId){
      const teamSubmit = await prisma.teamSubmission.create({
        data:{
          teamId:teamId.teamId,
          solutionTitle:solutionTitle,
          description:description,
          problemId:problemId
        }
      })
      return res.status(200).json({"message":"Idea successfully submitted"});
    } else{
      return res.status(500).json({"message":"Only Team leader can submit"})
    }
  } catch(e){
    return res.status(500).json({"error":e})
  }
}