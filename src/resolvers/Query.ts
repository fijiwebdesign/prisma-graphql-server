import { Context } from "../index";

export const Query = {
  books: (
    _: any,
    { isRead, skip, take }: { isRead: boolean; skip: number; take: number },
    { prisma }: Context
  ) => {
    return prisma.book.findMany({
      skip,
      take,
      where: {
        isRead
      }
    });
  },
  book: (_: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.book.findUnique({
      where: {
        id
      }
    });
  },
  categories: (_: any, __: any, { prisma }: Context) => {
    return prisma.category.findMany();
  },
  category: (_: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.category.findUnique({
      where: {
        id
      }
    });
  }
};
