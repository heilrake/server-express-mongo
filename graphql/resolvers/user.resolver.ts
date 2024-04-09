import { createUser } from "../services/user.service";

export const usersResolver = {
  Query: {},
  Mutation: {
    async createUser(
      _: any,
      { email, password }: { email: string; password: string },
    ) {
      return await createUser({ email, password });
    },
  },
};
