import axios from "axios";
import type { Book, BookResponse, NewBook } from "../types";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
export const getBooks = async (query?: string): Promise<BookResponse> => {
  try {
    const { data } = await instance.get(`/books${query ? `?${query}` : ""}`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    }
    throw new Error("An unknown error occurred");
  }
};

export const addBook = async (credentials: NewBook): Promise<Book> => {
  try {
    const { data } = await instance.post("/books", credentials);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    }
    throw new Error("An unknown error occurred");
  }
};

export const updateBook = async (credentials: NewBook): Promise<Book> => {
  try {
    const { isbn } = credentials;

    const { data } = await instance.put(`/books/${isbn}`, credentials);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    }
    throw new Error("An unknown error occurred");
  }
};

export const updateBookStatus = async (
  isbn: string,
  isBorrowed: boolean
): Promise<Book> => {
  try {
    const { data } = await instance.patch(`/books/${isbn}`, { isBorrowed });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    }
    throw new Error("An unknown error occurred");
  }
};

export const deleteBook = async (isbn: string): Promise<Book> => {
  try {
    const { data } = await instance.delete(`/books/${isbn}`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
      throw new Error(error.response?.data.message || "An error occurred");
    }
    throw new Error("An unknown error occurred");
  }
};
