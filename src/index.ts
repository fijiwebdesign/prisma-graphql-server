import { ApolloServer } from "apollo-server";
import { PrismaClient, Prisma } from "@prisma/client";

import { typeDefs } from "./schema";
import { Query, Mutation, Book, Category } from "./resolvers";

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
};

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Category,
    Book
  },
  context: {
    prisma
  }
});

server.listen().then(({ url }) => {
  console.log("🚀  Server ready at " + url);
});
