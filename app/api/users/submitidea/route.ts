import { prisma } from "@/prisma/db";
import { isinaTeamSchema, SubmitSchema } from "@/zod/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const valid=SubmitSchema.safeParse(body)

        const email = req.headers.get("email");
        const valid2=isinaTeamSchema.safeParse({email})

        if (!valid.success) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        if(!valid2.success){
          return NextResponse.json({ message:"Email headers missing" }, { status: 400 });

        }
        const teamData = await prisma.member.findFirst({
            where: {
                email:valid2.data.email
            },
            select: {
              team:{
                select:{
                  members:true
                }
              },
              teamId: true,
            },
        });

        if (teamData && teamData.teamId)  {
          if(teamData.team.members.length !== 5){
            return NextResponse.json({success:false,message:"Make a team of 5 and then reigster"})
          }
          else{
            await prisma.teamSubmission.create({
              data: {
                  teamId: teamData.teamId,
                  solutionTitle: valid.data.solutionTitle,
                  description: valid.data.description,
                  problemId: valid.data.problemId,
              },
            });
            return NextResponse.json({ success:true,message: "Idea successfully submitted" }, { status: 200 });
          }    
        } else {
            return NextResponse.json({ message: "Only Team leader can submit" }, { status: 403 });
        }
    } catch (e) {
        console.error("Error:", e instanceof Error ? e.message : String(e));
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
