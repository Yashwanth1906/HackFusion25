import { prisma } from "@/prisma/db";
import { addDomain } from "@/zod/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedData = addDomain.safeParse(body);
    if (parsedData.data?.name) {
      const domain = await prisma.domain.create({
        data: {
          name: parsedData.data.name,
        },
      });
      return NextResponse.json({ success: true, message: domain });
    }
    return NextResponse.json({
      success: false,
      message: "Give the name as string",
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
};
