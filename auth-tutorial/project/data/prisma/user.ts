import { prismaDb } from "@/project/lib/prismaDb";

export const getUserByEmail = async (email: string) => {
  try {
    return await prismaDb.user.findUnique({
      where: {
        email,
      },
    });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prismaDb.user.findUnique({
      where: {
        id,
      },
    });
  } catch {
    return null;
  }
};

export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string
) => {
  try {
    return await prismaDb.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch {
    return null;
  }
};
