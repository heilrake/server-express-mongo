import { readFileSync } from "fs";
import path from "path";
import { usersResolver } from "./resolvers/user.resolver";

const userTypes = readFileSync(
  path.join(__dirname, "./typeDefs/user.graphql"),
  {
    encoding: "utf-8",
  },
);

export const typeDefs = `
    ${userTypes}
`;

export const resolvers = {
  Query: {
    users() {
      return [{ id: "12", email: "bob@gmail.com" }];
    },
    user() {},
  },
  Mutation: {
    ...usersResolver.Mutation,
  },
};
