import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json({message: "Invalid request body"}, {status: 400});
        }

        const { teamId, memberdetails } = body;

        if (!teamId || !memberdetails || !memberdetails.email) {
            return NextResponse.json({message: "Missing required fields"}, {status: 400});
        }

        const isMember = await prisma.member.findUnique({
            where: {
                email: memberdetails.email
            }
        });

        if (isMember) {
            return NextResponse.json({message: "You are already in a team"}, {status: 400});
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
            return NextResponse.json({message: "No such team is found with the given teamId"}, {status: 501});
        }

        if (team.members.length === 4) {
            const hasFemaleMember = team.members.some(member => member.gender === "female");
            if (!hasFemaleMember && memberdetails.gender !== "female") {
                return NextResponse.json({"message": "At least one female student should be in a team"}, {status: 501});
            }
        }

        const addMember = await prisma.member.create({
            data: {
                name: memberdetails.name,
                email: memberdetails.email,
                gender: memberdetails.gender,
                regNo: memberdetails.regNo,
                dept: memberdetails.dept,
                year: memberdetails.year,
                phoneno: memberdetails.phoneno,
                isTeamLead: false,
                teamId: teamId // Fixed the field here
            }
        });

        return NextResponse.json({message: "Member Added successfully"}, {status: 200});
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
};
