import { prisma } from "@/prisma/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
    await prisma.team.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
};
