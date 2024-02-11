"use server";

import * as z from "zod";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

import { signIn } from "@/project/auth";
import { LoginSchema } from "@/project/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/project/routes";

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
    if (isRedirectError(error)) {
      console.log("Was redirect occurred");
      throw error;
    }

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

  // return { success: "Success" };
};
