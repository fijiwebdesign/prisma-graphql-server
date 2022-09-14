import { Context } from "../index";

export const Category = {
  books: ({ id }: { id: string }, _: any, { prisma }: Context) => {
    return prisma.book.findMany({
      where: {
        categoryId: id
      }
    });
  }
};
