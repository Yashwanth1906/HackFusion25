import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { teamIds } = await req.json();

  if (!teamIds || !Array.isArray(teamIds)) {
    return NextResponse.json(
      { message: "teamIds must be an array" },
      { status: 400 },
    );
  }

  try {
    const newEntries = [];

    for (const teamId of teamIds) {
      // Check if the team is already in the SelectedTeam table
      const existingEntry = await prisma.selectedTeam.findUnique({
        where: { teamId },
      });

      if (!existingEntry) {
        // Add the team to the SelectedTeam table
        const newEntry = await prisma.selectedTeam.create({
          data: { teamId },
        });
        newEntries.push(newEntry);
      }
    }

    if (newEntries.length === 0) {
      return NextResponse.json(
        { message: "All teams are already approved" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        message: "Teams approved successfully",
        data: newEntries,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error adding teams to SelectedTeam:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
