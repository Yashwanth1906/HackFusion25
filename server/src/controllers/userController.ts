import { Request, Response } from "express"
import { prisma } from "../db";
// import { authenticate } from "passport";

export const registerTeam = async (req: Request, res: Response) => {

  try {
  
    const { teamLeader, members, teamName } = req.body;
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
      return res.status(500).json({message:"You are already in a team"});
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
      return res.status(500).json({member:isMemberInAnotherTeam})
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
    // console.log(req.user.email);
    const user = await prisma.user.findUnique({
      where:{
        id : req.user.id
      },select:{
        email:true
      }
    })
    const teamId = await prisma.member.findUnique({
      where:{
        email: user?.email
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


export const getTeam = async(req:any,res:any) =>{
  try{
    const user = await prisma.user.findUnique({
      where:{
        id : req.user.id
      },select:{
        email:true
      }
    })
    if(user){
      const memberinATeam = await prisma.member.findUnique({
        where:{
          email:user.email
        },select:{
          team:{
            select:{
              name:true,
              members:true,
              teamSubmisison:{
                select:{
                  solutionTitle:true,
                  description:true
                }
              }
            }
          }
        }
      })
      if(memberinATeam){
        return res.status(200).json({"team":memberinATeam})
      } else{
        return res.status(500).json({"message":"Create or join a team"});
      }
    }
    return res.status(500).json({"message":"User not found"})
  } catch(e){
    console.log(e);
    return res.json({"error":e})
  }
}


export const globalAuth = async (req: any, res: any) => {
  try {
    if (req.isAuthenticated()) {
      const user = await prisma.user.findUnique({
        where:{
          id:req.user.id
        }
      })
      return res.status(200).json({authenticated : true,user : user})
      // console.log("Users: ", req.user);
      // next();
    } else {
      res.status(500).json({ authenticated: false, user: null })
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({authenticated:false,user:null})
  }
}