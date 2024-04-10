import { createPost, getAllPosts, getOnePost } from "../services/post.service";

export const postsResolver = {
  Query: {
    async getAllPosts() {
      return await getAllPosts();
    },
    async getOnePost(id: string) {
      console.log("1", id);
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
