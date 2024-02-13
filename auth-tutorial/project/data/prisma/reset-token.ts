import { prismaDb } from "@/project/lib/prismaDb";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prismaDb.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prismaDb.passwordResetToken.findFirst({
      where: {
        token,
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
