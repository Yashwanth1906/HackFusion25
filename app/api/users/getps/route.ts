import { prisma } from '@/prisma/db';
import { themeFilter } from '@/zod/types';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedBody = themeFilter.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { success: false, message: parsedBody.error },
        { status: 500 }
      );
    }
    console.log(parsedBody.data.theme);
    const problemStatements = await prisma.problemStatement.findMany({
      where: {
        theme: parsedBody.data.theme,
      },
      select: {
        sno: true,
        title: true,
      },
    });
    return NextResponse.json(
      { success: true, ps: problemStatements },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ success: false, error: e }, { status: 500 });
  }
};
