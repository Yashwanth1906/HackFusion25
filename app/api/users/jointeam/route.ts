import { prisma } from "@/prisma/db";
import { JoinTeamSchema } from "@/zod/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        console.log(body)
        const valid=JoinTeamSchema.safeParse(body)
        if (!valid.success) {
            return NextResponse.json({success:false,message: valid.error}, {status: 400});
        }

        const { teamId, memberdetails } = body;

        if (!teamId || !memberdetails || !memberdetails.email) {
            return NextResponse.json({success:false,message: "Missing required fields"}, {status: 400});
        }

        const isMember = await prisma.member.findUnique({
            where: {
                email: memberdetails.email
            }
        });

        if (isMember) {
            return NextResponse.json({success:false,message: "You are already in a team"}, {status: 400});
        }

        const team = await prisma.team.findUnique({
            where: {
                id: teamId
            },
            select: {
                members: true
            }
        });

        if (!team) {
            return NextResponse.json({success:false,mmessage: "No such team is found with the given teamId"}, {status: 501});
        }

        if (team.members.length === 4) {
            const hasFemaleMember = team.members.some(member => member.gender === "female");
            if (!hasFemaleMember && memberdetails.gender !== "female") {
                return NextResponse.json({success:false,"message": "At least one female student should be in a team"}, {status: 501});
            }
        }

        await prisma.member.create({
            data: {
                name: memberdetails.name,
                email: memberdetails.email,
                gender: memberdetails.gender,
                regNo: memberdetails.regNo,
                dept: memberdetails.dept,
                year: memberdetails.year,
                phoneno: memberdetails.phoneno,
                isTeamLead: false,
                teamId: teamId
            }
        });

        return NextResponse.json({success:true,message: "Member Added successfully"}, {status: 200});
    } catch(e){

        return NextResponse.json(
          { error: e instanceof Error ? e.message : "Unknown error" },
          { status: 500 }
        );
      }
    }