"use server";

import { prismaDb } from "@/project/lib/prismaDb";
import { getUserByEmail } from "@/project/data/prisma/user";
import { getVerificationTokenByToken } from "@/project/data/prisma/verification-token";

export const verifyEmailByToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid Token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token Expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Could not locate user for this token" };
  }

  await prismaDb.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prismaDb.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email Verified" };
};
