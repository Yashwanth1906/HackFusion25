import { NextRequest, NextResponse } from "next/server";

import {prisma} from "../../../../../prisma/db"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = async(req:NextRequest)=>{
    try{
      const {solutionTitle,description,problemId}:any = req.body;
      // console.log(req.user.email);
      const session = await getServerSession(authOptions);
      const userId = session?.user.id;
      if(!userId){
        return NextResponse.json({message:"Login first to submit"},{status:500})
      }
      const user = await prisma.user.findUnique({
        where:{
          id : userId
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
        // return res.status(200).json({"message":"Idea successfully submitted"});
        return NextResponse.json({message:"Idea successfully submitted"},{status:200})
      } else{
        // return res.status(500).json({"message":"Only Team leader can submit"})
        return NextResponse.json({"message":"Only Team leader can submit"},{status:500})
      }
    } catch(e){
    //   return res.status(500).json({"error":e})
    return NextResponse.json({error:e},{status:500})
    }
  }