// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//     providers:[
//         GoogleProvider({
//              clientId: process.env.AUTH_GOOGLE_ID || "",
//             clientSecret: process.env.AUTH_GOOGLE_SECRET || ""
//         })

//     ],
//     secret:process.env.JWT_SECRET,
//     callbacks: {
//         async signIn({user,account,profile}){
//              const res =await prisma.user.findUnique({
//                  where:{
//                    email:user.email
//                  }
//                })
//                if(res)
//                {
//                  user.id=res.id;
                
//                    return true;
//                }
//                const temp=await prisma.user.create({
//                  data:{
//                    email:user.email,
//                    name:user.name
         
//                  },
//                  select:{
//                    email:true,
//                    id:true
         
//                  }
//                })
               
//                user.id=temp.id;
 
              
//                return true
 
//          },
//          async session({ token, session }) {
         
//              session.user.id = token.sub
            
//              return session
//          }
//      },
 
// })

// export { handler as GET, handler as POST }