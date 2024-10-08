export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  oldIsbn?: string;
  isBorrowed: boolean;
}

export type NewBook = Omit<Book, "_id"> & Partial<Pick<Book, "isBorrowed">>;

export interface BookResponse {
  books: Book[];
  total: number;
}

export enum SortOptions {
  None = "none",
  Title = "byTitle",
  Author = "byAuthor",
  ISBN = "byIsbn",
  Status = "byStatus",
}
