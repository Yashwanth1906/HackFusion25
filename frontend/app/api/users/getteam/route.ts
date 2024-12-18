import { NextRequest, NextResponse } from "next/server"
import {prisma} from "../../../../prisma/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async(req:NextRequest) =>{
    try{
        const session = await getServerSession(authOptions);
        const userId = session?.user.id;
        if(!userId){
            return NextResponse.json({message:"Login first"},{status:500})
        }
      const user = await prisma.user.findUnique({
        where:{
          id : userId
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