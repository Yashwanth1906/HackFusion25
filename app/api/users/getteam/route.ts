import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/db';
import { createTeamSchema, TeamLeadSchema } from '@/zod/types';
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const teamNameparse = createTeamSchema.safeParse(body.teamName);
    if (!teamNameparse.success) {
      return NextResponse.json(
        { message: 'Invalid Team Name' },
        { status: 500 }
      );
    }
    const teamLeadParse = TeamLeadSchema.safeParse(body.teamLead);
    if (!teamLeadParse.success) {
      return NextResponse.json(
        { message: 'Invalid TeamLead Name' },
        { status: 500 }
      );
    }
    const teamName = teamNameparse.data;
    const teamLead = teamLeadParse.data;
    console.log(teamLead.name, teamLead.email, teamLead.gender, teamLead.regNo);
    const user = await prisma.member.findFirst({
      where: {
        OR: [{ email: teamLead.email }, { regNo: teamLead.regNo }],
      },
      select: {
        team: true,
      },
    });
    if (user) {
      return NextResponse.json({
        success: false,
        message: 'You have already in a team',
      });
    }
    const response = await prisma.$transaction(async (tx) => {
      const newTeam = await tx.team.create({
        data: {
          name: teamName.teamName,
        },
      });
      await tx.member.create({
        data: {
          name: teamLead.name,
          email: teamLead.email,
          gender: teamLead.gender,
          regNo: teamLead.regNo,
          dept: teamLead.dept,
          year: teamLead.year,
          phoneno: teamLead.phoneno,
          isTeamLead: true,
          teamId: newTeam.id,
        },
      });
      return newTeam.id;
    });
    return NextResponse.json(
      { teamId: response, success: true },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
};
