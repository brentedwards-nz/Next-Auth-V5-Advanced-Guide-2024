"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { sendConfirmationEmail } from "@/project/lib/email";
import { RegisterSchema } from "@/project/schemas";
import { getUserByEmail, createUser } from "@/project/data/prisma/user";

import { generateVerificationToken } from "@/project/lib/tokens";

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

  const verificationToken = await generateVerificationToken(email);
  console.log(verificationToken);

  const result = await sendConfirmationEmail(email, verificationToken.token);
  if (result) return { success: "Confirmation email sent" };
  return { error: "Could not send confirmation email" };
};
