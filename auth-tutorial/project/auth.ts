import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prismaDb } from "@/project/lib/prismaDb";
import authConfig from "@/project/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prismaDb),
  session: { strategy: "jwt" },
  ...authConfig,
});
