"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail, createUser } from "@/data/prisma/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  if (validatedFields.data.email != validatedFields.data.confirmEmail) {
    return { error: "Emails should match" };
  }

  if (validatedFields.data.password != validatedFields.data.confirmPassword) {
    return { error: "Passwords should match" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const newUser = await createUser(name, email, hashedPassword);
  if (!newUser) {
    return { error: "Could not create new user" };
  }

  return { success: "User created" };
};
