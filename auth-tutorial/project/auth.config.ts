import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "@/project/schemas";
import { getUserByEmail } from "@/project/data/prisma/user";

import bcrypt from "bcryptjs";

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        //console.log(validatedFields.data);

        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          return null;
        }
        //console.log(user);
        return user;
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID_LOCAL,
      clientSecret: process.env.GITHUB_SECRET_LOCAL,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
