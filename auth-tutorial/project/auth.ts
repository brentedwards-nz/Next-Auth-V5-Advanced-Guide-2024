import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prismaDb } from "@/project/lib/prismaDb";
import authConfig from "@/project/auth.config";
import { getUserById } from "@/project/data/prisma/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      //console.log({ session });
      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (user) {
          token.role = user.role;
        }
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prismaDb),
  session: { strategy: "jwt" },
  ...authConfig,
});
