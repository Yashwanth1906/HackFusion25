import { prisma } from "@/prisma/db";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  secret: process.env.JWT_SECRET || "hackfusion",
  callbacks: {
    //@ts-ignore
    async signIn({ user, account, profile }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        user.id = existingUser.id;
      } else {
        const newUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
          },
          select: {
            email: true,
            id: true,
          },
        });
        user.id = newUser.id;
      }

      // Check if user is an admin
      const isAdmin = await prisma.admin.findUnique({
        where: { email: user.email },
      });

      user.isAdmin = Boolean(isAdmin); // Add admin status to the user object
      return true;
    },
    //@ts-ignore
    async session({ token, session }) {
      console.log(session)
      session.user.id = token.sub
      session.user.isAdmin = token.isAdmin

      return session
    },
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.isAdmin = user.isAdmin || false;
      }
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      return `${baseUrl}/user/register`
    }

  },
}
