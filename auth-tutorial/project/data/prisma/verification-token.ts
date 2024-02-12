import { prismaDb } from "@/project/lib/prismaDb";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prismaDb.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prismaDb.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
