import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const createdUser = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return createdUser;
};
