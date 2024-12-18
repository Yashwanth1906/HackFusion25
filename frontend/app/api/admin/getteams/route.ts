import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db"; // Adjust the path to match your project structure
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);

        // Ensure the user is authenticated
        if (!session) {
            return NextResponse.json({ message: "Login first" }, { status: 401 });
        }

        // Fetch all teams and include related data
        const teams = await prisma.team.findMany({
            select: {
                id: true,
                name: true,
                members: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
                teamSubmission: {
                    select: {
                        id: true,
                        solutionTitle: true,
                        description: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json({ teams }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error fetching teams:", error);
        if (error instanceof Error) {
            return NextResponse.json({ message: "Failed to fetch teams", error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: "Failed to fetch teams", error: "An unknown error occurred" }, { status: 500 });
        }
    }
};