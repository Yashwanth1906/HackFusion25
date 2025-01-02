import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const domain = await prisma.domain.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json({ success: true, domains: domain });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
};
