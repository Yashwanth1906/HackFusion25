import { prisma } from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Define allowed status values as a const for type safety and reusability
const ALLOWED_STATUSES = ['pending', 'approved', 'rejected'] as const;
type TeamStatus = typeof ALLOWED_STATUSES[number];

// Define expected request body type
interface UpdateTeamsRequest {
  teamIds: string[];
  status: TeamStatus;
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    
    // Validate request body against expected type
    if (!isValidUpdateTeamsRequest(body)) {
      return NextResponse.json(
        { message: 'Invalid request body format' },
        { status: 400 }
      );
    }

    const { teamIds, status } = body;

    if (teamIds.length === 0) {
      return NextResponse.json(
        { message: 'teamIds must be a non-empty array.' },
        { status: 400 }
      );
    }

    // Process teams in a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      const updatedTeams = [];
      const newEntries = [];
      const removedEntries = [];
      const skippedTeams: string[] = [];

      // Fetch all teams at once for better performance
      const existingTeams = await tx.team.findMany({
        where: { id: { in: teamIds } },
      });

      const existingTeamIds = new Set(existingTeams.map(team => team.id));

      // Track skipped teams
      teamIds.forEach(id => {
        if (!existingTeamIds.has(id)) {
          skippedTeams.push(id);
        }
      });

      // Log skipped teams
      if (skippedTeams.length > 0) {
        console.warn(`Skipped teams (not found in the database): ${skippedTeams.join(', ')}`);
      }

      // Update existing teams
      for (const team of existingTeams) {
        const updatedTeam = await tx.team.update({
          where: { id: team.id },
          data: { status },
        });
        updatedTeams.push(updatedTeam);

        if (status === 'approved') {
          const newEntry = await tx.roundOneWinners.upsert({
            where: { teamId: team.id },
            update: {},
            create: { id: randomUUID(), teamId: team.id },
          });
          newEntries.push(newEntry);
        } else if (status === 'rejected') {
          try {
            const removedEntry = await tx.roundOneWinners.delete({
              where: { teamId: team.id },
            });
            removedEntries.push(removedEntry);
          } catch (err) {
            if (!(err instanceof Error && err.message.includes('Record to delete does not exist'))) {
              throw err;
            }
          }
        }
      }

      return {
        updatedTeams,
        newEntries,
        removedEntries,
        skippedTeams,
      };
    });

    return NextResponse.json(
      {
        message: `Successfully processed teams: ${result.updatedTeams.length} updated, ${result.newEntries.length} added to winners, ${result.removedEntries.length} removed from winners, ${result.skippedTeams.length} skipped.`,
        updatedTeams: result.updatedTeams,
        addedToWinners: result.newEntries,
        removedFromWinners: result.removedEntries,
        skippedTeams: result.skippedTeams,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.log('API Error:', error);
    return NextResponse.json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
};

// Define the shape of a potential request body
interface PotentialUpdateTeamsRequest {
  teamIds?: string[];
  status?: string;
}

function isValidUpdateTeamsRequest(body: PotentialUpdateTeamsRequest): body is UpdateTeamsRequest {
  return (
    typeof body === 'object' &&
    body !== null &&
    Array.isArray(body.teamIds) &&
    body.teamIds.every((id: unknown) => typeof id === 'string') &&
    typeof body.status === 'string' &&
    ALLOWED_STATUSES.includes(body.status as TeamStatus)
  );
}