import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await prisma.member.deleteMany({});
    await prisma.teamSubmission.deleteMany({});
    await prisma.team.deleteMany({});
    return NextResponse.json({ msg: "done" });
  } catch (error) {
    return NextResponse.json({ msg: error });
  }
};
