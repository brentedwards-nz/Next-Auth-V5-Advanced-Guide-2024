"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/prisma/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      //redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }

  // if (!validatedFields.success) {
  //   return { error: "Invalid data" };
  // }

  // const { email, password } = validatedFields.data;
  // const user = await getUserByEmail(email);

  // if (!user) {
  //   return { error: "Failed to login" };
  // }

  // if (user.password) {
  //   const passwordsMatch = await bcrypt.compare(password, user.password);
  //   if (!passwordsMatch) {
  //     return { error: "Invalid credentials" };
  //   }
  // }

  return { success: "Success" };
};
