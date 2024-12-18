import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET || "hackfusion" });

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token?.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admins
    }
  }
  return NextResponse.next();
}

