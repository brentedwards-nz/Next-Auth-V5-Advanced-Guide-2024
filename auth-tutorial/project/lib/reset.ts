import { v4 as uuidv4 } from "uuid";
import { prismaDb } from "@/project/lib/prismaDb";
import { getPasswordResetTokenByEmail } from "@/project/data/prisma/reset-token";

export const generatePasswordResetToken = async (email: string) => {
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

  const passwordResetToken = await prismaDb.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
