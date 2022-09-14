import { Context } from "../index";

export const Book = {
  category: (
    { categoryId }: { categoryId: string },
    _: any,
    { prisma }: Context
  ) => {
    return prisma.category.findUnique({
      where: {
        id: categoryId
      }
    });
  }
};
