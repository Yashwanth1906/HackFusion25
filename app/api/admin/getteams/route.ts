import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db"; // Adjust the path to match your project structure
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

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
            isTeamLead: true,
          },
        },
        status: true,
        teamSubmisison: {
          select: {
            id: true,
            solutionTitle: true,
            description: true,
            problem: {
              select: {
                theme: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ teams }, { status: 200 });
  } catch (error: unknown) {
    console.log("Error fetching teams:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to fetch teams", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Failed to fetch teams",
          error: "An unknown error occurred",
        },
        { status: 500 },
      );
    }
  }
};