import { createPost, getAllPosts, getOnePost } from "../services/post.service";

export const postsResolver = {
  Query: {
    async getAllPosts() {
      return await getAllPosts();
    },
    async getOnePost(_: any, { id }: { id: string }) {
      return await getOnePost(id);
    },
  },
  Mutation: {
    async createPost(
      _: any,
      {
        title,
        description,
        userId,
      }: { title: string; description: string; userId: string },
    ) {
      return await createPost({ title, description, userId });
    },
  },
};
