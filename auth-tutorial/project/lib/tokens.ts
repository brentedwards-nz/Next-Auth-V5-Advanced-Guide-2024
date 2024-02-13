import { v4 as uuidv4 } from "uuid";
import { prismaDb } from "@/project/lib/prismaDb";
import { getVerificationTokenByEmail } from "@/project/data/prisma/verification-token";
import { getPasswordResetTokenByEmail } from "@/project/data/prisma/reset-token";

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1hr

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prismaDb.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const resetPasswordToken = await prismaDb.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return resetPasswordToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1hr

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prismaDb.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prismaDb.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
