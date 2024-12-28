import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { teamIds, status } = await req.json();
    if (!Array.isArray(teamIds) || !["pending", "approved", "rejected"].includes(status)) {
      console.error("Invalid input:", { teamIds, status });
      return NextResponse.json(
        { message: "Invalid input. Ensure teamIds is an array and status is valid." },
        { status: 400 }
      );
    }

    console.log("Processing update for teams:", { teamIds, status });

    const updatedTeams = [];
    const newEntries = [];
    const removedEntries = [];

    for (const teamId of teamIds) {
      try {
        const team = await prisma.team.findUnique({ where: { id: teamId } });
        if (!team) {
          console.warn(`Team with ID ${teamId} not found. Skipping.`);
          continue;
        }

        const updatedTeam = await prisma.team.update({
          where: { id: teamId },
          data: { status },
        });
        updatedTeams.push(updatedTeam);

        if (status === "approved") {
          const existingEntry = await prisma.roundOneWinners.findUnique({ where: { teamId } });
          if (!existingEntry) {
            const newEntry = await prisma.roundOneWinners.create({ data: { teamId } });
            newEntries.push(newEntry);
          }
        } else if (status === "rejected") {
          const existingEntry = await prisma.roundOneWinners.findUnique({ where: { teamId } });
          if (existingEntry) {
            const removedEntry = await prisma.roundOneWinners.delete({ where: { teamId } });
            removedEntries.push(removedEntry);
          }
        }
      } catch (teamError) {
        console.error(`Error processing team ID ${teamId}:`, teamError);
      }
    }

    console.log("Update summary:", { updatedTeams, newEntries, removedEntries });

    return NextResponse.json(
      {
        message: "Teams updated successfully.",
        updatedTeams,
        addedToWinners: newEntries,
        removedFromWinners: removedEntries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unhandled API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
};