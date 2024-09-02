import axios from "axios";
import type { Book, BookResponse, NewBook } from "../types";

const instance = axios.create({
  baseURL: "https://book-manager-backend-tzn9.onrender.com/api",
});
export const getBooks = async (query?: string): Promise<BookResponse> => {
  const { data } = await instance.get(`/books${query ? `?${query}` : ""}`);

  return data;
};

export const addBook = async (credentials: NewBook): Promise<Book> => {
  const { data } = await instance.post("/books", credentials);

  return data;
};

export const updateBook = async (credentials: NewBook): Promise<Book> => {
  const { isbn } = credentials;

  const { data } = await instance.put(`/books/${isbn}`, credentials);

  return data;
};

export const updateBookStatus = async (
  isbn: string,
  isBorrowed: boolean
): Promise<Book> => {
  const { data } = await instance.patch(`/books/${isbn}`, { isBorrowed });

  return data;
};

export const deleteBook = async (isbn: string): Promise<Book> => {
  const { data } = await instance.delete(`/books/${isbn}`);

  return data;
};
