import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const { solutionTitle, description, problemId }: any = body;
        const email = req.headers.get("email");

        if (!solutionTitle || !description || !problemId || !email) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const teamData = await prisma.member.findFirst({
            where: {
                AND: [
                    //@ts-ignore
                    { email: email },
                    { isTeamLead: true },
                ],
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
                  solutionTitle: solutionTitle,
                  description: description,
                  problemId: problemId,
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
