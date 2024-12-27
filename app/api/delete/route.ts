import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await prisma.member.deleteMany({});
    await prisma.teamSubmission.deleteMany({});
    await prisma.team.deleteMany({});
    return NextResponse.json({ msg: "done" });
  } catch (e: any) {
    return NextResponse.json({ msg: e });
  }
};
