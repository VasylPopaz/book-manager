import { useEffect, useState } from "react";

import { BookList } from "../components";

import { getBooks } from "../api";
import type { Book } from "../types";

export const App = () => {
  const [books, setBooks] = useState<Book[] | null>(null);

  const [sortConfig, setSortConfig] = useState<{
    sortField: keyof Book | null;
    direction: "asc" | "desc";
  }>({ sortField: null, direction: "asc" });

  useEffect(() => {
    getBooks().then((res) => {
      setBooks(res.books);
    });
  }, []);

  if (!books) return;

  const handleSortClick = (sortField: keyof Book) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig.sortField === sortField && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedBooks = [...books].sort((a, b) => {
      if (
        typeof a[sortField] === "string" &&
        typeof b[sortField] === "string"
      ) {
        return direction === "asc"
          ? (a[sortField] as string).localeCompare(b[sortField] as string)
          : (b[sortField] as string).localeCompare(a[sortField] as string);
      }
      if (
        typeof a[sortField] === "boolean" &&
        typeof b[sortField] === "boolean"
      ) {
        return direction === "asc"
          ? (a[sortField] ? 1 : -1) - (b[sortField] ? 1 : -1)
          : (b[sortField] ? 1 : -1) - (a[sortField] ? 1 : -1);
      }
      return 0;
    });

    setBooks(sortedBooks);
    setSortConfig({ sortField, direction });
  };

  return (
    <div className="container py-8">
      <BookList books={books} handleSortClick={handleSortClick} />
    </div>
  );
};
