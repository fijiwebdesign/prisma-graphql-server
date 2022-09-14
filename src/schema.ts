const { gql } = require("apollo-server");

export const typeDefs = gql`
  type Query {
    books(isRead: Boolean, skip: Int, take: Int): [Book!]!
    book(id: ID!): Book
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addBook(input: AddBookInput!): BookPayload!
    deleteBook(id: ID!): BookPayload!
    updateBook(id: ID!, input: UpdateBookInput!): BookPayload!
    addCategory(name: String!): CategoryPayload!
    signup(email: String!, password: String!): AuthPayload!
    signin(email: String!, password: String!): AuthPayload!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    createdAt: String!
    category: Category!
    isRead: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Error {
    message: String!
  }

  type BookPayload {
    errors: [Error!]!
    book: Book
  }

  type CategoryPayload {
    errors: [Error!]!
    category: Category
  }

  type AuthPayload {
    errors: [Error!]!
    user: User
  }

  input BooksInput {
    isRead: Boolean
  }

  input AddBookInput {
    title: String!
    author: String!
    categoryId: ID!
    isRead: Boolean!
  }

  input UpdateBookInput {
    title: String
    author: String
    categoryId: ID
    isRead: Boolean
  }
`;
