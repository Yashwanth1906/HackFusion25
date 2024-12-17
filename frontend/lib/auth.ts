import { prisma } from "@/prisma/db";

import GoogleProvider from "next-auth/providers/google";
export const authOptions={
    providers:[
      GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
      })
  
  ],
  secret:process.env.JWT_SECRET ||"hackfusion",
  callbacks: {
      async signIn({user,account,profile}){
           const res =await prisma.user.findUnique({
               where:{
                 email:user.email
               }
             })
             if(res)
             {
               user.id=res.id;
              
                 return true;
             }
             const temp=await prisma.user.create({
               data:{
                 email:user.email,
                 name:user.name
       
               },
               select:{
                 email:true,
                 id:true
       
               }
             })
             
             user.id=temp.id;
  
            
             return true
  
       },
       async session({ token, session }) {
       
           session.user.id = token.sub
          
           return session
       }
   },
  
  }