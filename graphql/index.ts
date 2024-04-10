import { readFileSync } from "fs";
import path from "path";
import { postsResolver } from "./resolvers/post.resolver";

const postTypes = readFileSync(
  path.join(__dirname, "./typeDefs/post.graphql"),
  {
    encoding: "utf-8",
  },
);

export const typeDefs = `
    ${postTypes}
`;

export const resolvers = {
  Query: { ...postsResolver.Query },
  Mutation: {
    ...postsResolver.Mutation,
  },
};
