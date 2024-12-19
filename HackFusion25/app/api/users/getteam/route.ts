import { NextRequest, NextResponse } from "next/server"
import {prisma} from "../../../../prisma/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async(req:NextRequest) =>{
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({success:false,message:"Login first"})
        }
        console.log(session.user)
        const userId=session.user.id
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
          return NextResponse.json({success:true,"team":memberinATeam},{status:200})
        } else{
          return NextResponse.json({success:false,"message":"Create or join a team"});
        }
      }
      return NextResponse.json({success:false,"message":"User not found"})
    } catch(e){
      return NextResponse.json({"error":e})
    }
  }