"use server";

import * as z from "zod";

import { sendPasswordResetEmail } from "@/project/lib/email";
import { getUserByEmail } from "@/project/data/prisma/user";
import { ResetSchema } from "@/project/schemas";
import { generateResetPasswordToken } from "@/project/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generateResetPasswordToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
};
