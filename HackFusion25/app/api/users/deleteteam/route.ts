import { prisma } from "@/prisma/db";
import { deleteTeamSchema } from "@/zod/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const email = req.headers.get('email');
        const valid=deleteTeamSchema.safeParse(email)
        if (!valid.success) {
            return NextResponse.json({ success: false, message: "Email header is missing" }, { status: 400 });
        }
        const member = await prisma.member.findUnique({
            where: {
                email: valid.data.email,
            },
            select: {
                team: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!member || !member.team) {
            return NextResponse.json({ success: false, message: "Member or team not found" }, { status: 404 });
        }
        await prisma.team.delete({
            where: {
                id: member.team.id,
            },
        });

        return NextResponse.json({ success: true, message: "Deleted the team" }, { status: 200 });
    } catch (e: any) {
        // console.error("Error deleting team:", e);
        return NextResponse.json({ success: false, error: e.message || "An error occurred" }, { status: 500 });
    }
};
