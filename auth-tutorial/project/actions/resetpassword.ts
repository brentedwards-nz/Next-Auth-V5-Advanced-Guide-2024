"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/project/data/prisma/user";
import { getPasswordResetTokenByToken } from "@/project/data/prisma/reset-token";
import { ResetPasswordSchema } from "@/project/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/project/routes";
import { prismaDb } from "../lib/prismaDb";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid password" };
  }

  const { password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return { error: "Passwords should match" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExprired = new Date(existingToken.expires) < new Date();
  if (hasExprired) {
    return { error: "Password reset request has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prismaDb.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prismaDb.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password reset" };
};
