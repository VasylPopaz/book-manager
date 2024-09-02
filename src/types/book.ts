export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  isBorrowed: boolean;
}

export type NewBook = Omit<Book, "_id"> & Partial<Pick<Book, "isBorrowed">>;

export interface BookResponse {
  books: Book[];
  total: number;
}
