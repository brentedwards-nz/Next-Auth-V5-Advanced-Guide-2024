"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/prisma/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { email, password } = validatedFields.data;
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "Failed to login" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  if (user.password !== hashedPassword) {
    //return { error: "Password incorrect" };
  }

  return { success: "Success" };
};
