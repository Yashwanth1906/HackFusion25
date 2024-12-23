import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";

//@ts-expect-error: The type inference for the NextAuth handler is incorrect, so we use this directive to bypass the error.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
