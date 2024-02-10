import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prismaDb } from "@/lib/prismaDb";
import authConfig from "./auth.config";

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
