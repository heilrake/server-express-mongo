import { prisma } from "../../utils/others";

export const getAllPosts = async () => {
  return await prisma.post.findMany();
};

export const getOnePost = async (id: string) => {
  return await prisma.post.findUnique({ where: { id } });
};

export const createPost = async ({
  title,
  description,
  userId,
}: {
  title: string;
  description: string;
  userId: string;
}) => {
  const createdPost = await prisma.post.create({
    data: {
      title,
      description,
      userId,
    },
  });

  return createdPost;
};
