import { prisma } from "@/prisma/db";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";

interface User extends DefaultUser {
  isAdmin: boolean;
}

interface Session extends DefaultSession {
  user: User;
}

interface token extends JWT{
  isAdmin:boolean
}



export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  secret: process.env.JWT_SECRET || "hackfusion",
  callbacks: {
    async signIn({ user,  }:{user:User}) {

      const isAdmin = await prisma.admin.findUnique({
        where: { email: user.email ||"" },
      });
      console.log(isAdmin)
      if (isAdmin) {
        user.isAdmin = true
        return true
      }

      // if (!profile.email.endsWith("@citchennai.net")) {
      //   return false
      // }
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email ||"" },
      });

      if (existingUser) {
        user.id = existingUser.id;
      } else {
        const newUser = await prisma.user.create({
          data: {
            email: user.email ||"",
            name: user.name ||"",
          },
          select: {
            email: true,
            id: true,
          },
        });
        user.id = newUser.id;
      }

      user.isAdmin=false;
      return true;
    },

    async session({ token, session }:{token:token,session:Session}) {
      session.user.id = token.sub || ""
      session.user.isAdmin = token.isAdmin 
      console.log(session)

      return session
    },
   
    async jwt({ token, user }:{token:token,user:User}) {
      if (user) {
        token.sub = user.id;
        token.isAdmin = user.isAdmin || false;
      }
      return token
    },
    async redirect({ baseUrl }: { url: string, baseUrl: string }) {
      return `${baseUrl}/user/home`
    }

  },
}


