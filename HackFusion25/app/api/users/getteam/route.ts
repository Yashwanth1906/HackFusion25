import { NextRequest, NextResponse } from "next/server"
import {prisma} from "../../../../prisma/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async(req:NextRequest) =>{
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({message:"Login first"},{status:500})
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
          return NextResponse.json({"team":memberinATeam},{status:200})
        } else{
          return NextResponse.json({"message":"Create or join a team"},{status:500});
        }
      }
      return NextResponse.json({"message":"User not found"},{status:500})
    } catch(e){
      console.log(e);
      return NextResponse.json({"error":e})
    }
  }