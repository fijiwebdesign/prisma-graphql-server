import { Book, Category, User } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcryptjs";

import { Context } from "../index";

type MutationBook = {
  input: {
    title: string;
    author: string;
    categoryId: string;
    isRead: boolean;
  };
};

type MutationCategory = {
  name: string;
};

type MutationUser = {
  email: string;
  password: string;
};

type BookPayload = {
  errors: {
    message: string;
  }[];
  book: Book | null;
};

type CategoryPayload = {
  errors: {
    message: string;
  }[];
  category: Category | null;
};

type UserPayload = {
  errors: {
    message: string;
  }[];
  user: User | null;
};

export const Mutation = {
  addBook: async (
    _: any,
    { input }: MutationBook,
    { prisma }: Context
  ): Promise<BookPayload> => {
    const { title, author, categoryId, isRead } = input;
    if (!title || !author || !categoryId ) {
      return {
        errors: [
          {
            message: "本の内容を入力してください"
          }
        ],
        book: null
      };
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        categoryId,
        isRead
      }
    });

    return {
      errors: [],
      book: newBook
    };
  },
  deleteBook: async (
    _: any,
    { id }: { id: string },
    { prisma }: Context
  ): Promise<BookPayload> => {
    const book = await prisma.book.findUnique({
      where: {
        id
      }
    });

    if (!book) {
      return {
        errors: [
          {
            message: "本のデータがありません"
          }
        ],
        book: null
      };
    }

    await prisma.book.delete({
      where: {
        id
      }
    });

    return {
      errors: [],
      book
    };
  },
  updateBook: async (
    _: any,
    { id, input }: { id: string; input: MutationBook["input"] },
    { prisma }: Context
  ): Promise<BookPayload> => {
    const book = await prisma.book.findUnique({
      where: {
        id
      }
    });

    if (!book) {
      return {
        errors: [
          {
            message: "本のデータがありません"
          }
        ],
        book: null
      };
    }

    const updateBooks = await prisma.book.update({
      data: {
        ...input
      },
      where: {
        id
      }
    });

    return {
      errors: [],
      book: updateBooks
    };
  },
  addCategory: async (
    _: any,
    { name }: MutationCategory,
    { prisma }: Context
  ): Promise<CategoryPayload> => {
    if (!name) {
      return {
        errors: [
          {
            message: "カテゴリを入力してください"
          }
        ],
        category: null
      };
    }

    const newCategory = await prisma.category.create({
      data: {
        name
      }
    });

    return {
      errors: [],
      category: newCategory
    };
  },
  signup: async (
    _: any,
    { email, password }: MutationUser,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      return {
        errors: [
          {
            message: "emailが正しくありません"
          }
        ],
        user: null
      };
    }

    const isPassword = validator.isLength(password, {
      min: 4
    });

    if (!isPassword) {
      return {
        errors: [
          {
            message: "4文字上のパスワードを入力してください"
          }
        ],
        user: null
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    return {
      errors: [],
      user: newUser
    };
  },
  signin: async (
    _: any,
    { email, password }: MutationUser,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return {
        errors: [
          {
            message: "アカウント情報が間違っています"
          }
        ],
        user: null
      };
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return {
        errors: [
          {
            message: "パスワードが間違っています"
          }
        ],
        user: null
      };
    }

    return {
      errors: [],
      user
    };
  }
};
