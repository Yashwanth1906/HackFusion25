import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await prisma.teamSubmission.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
};
