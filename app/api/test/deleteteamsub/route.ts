import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await prisma.teamSubmission.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
};
