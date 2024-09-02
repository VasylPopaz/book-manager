import { useEffect, useState } from "react";

import { BookList } from "../components";

import { getBooks } from "../api";
import type { Book } from "../types";

export const App = () => {
  const [books, setBooks] = useState<Book[] | null>(null);

  useEffect(() => {
    getBooks().then((res) => {
      setBooks(res.books);
    });
  }, []);

  if (!books) return;

  return (
    <div className="container py-8">
      <BookList books={books} />
    </div>
  );
};
