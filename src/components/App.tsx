import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import { BookList, ToolPanel } from "../components";

import { getBooks } from "../api";
import type { Book } from "../types";

export const App = () => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [filter, setFilter] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    sortField: keyof Book | null;
    direction: "asc" | "desc";
  }>({ sortField: null, direction: "asc" });

  const debouncedFetch = useRef(
    debounce((query: string) => {
      getBooks(query).then((res) => {
        setBooks(res.books);
      });
    }, 400)
  ).current;

  useEffect(() => {
    const query = filter ? `query=${filter}` : "";
    debouncedFetch(query);
  }, [debouncedFetch, filter]);

  if (!books) return;

  const onEditBook = (book: Book) => {
    setBooks(books.map((b) => (b.isbn === book.isbn ? book : b)));
  };

  const onDeleteBook = (isbn: string) => {
    setBooks(books.filter((book) => book.isbn !== isbn));
  };

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
  };

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
      <ToolPanel onChangeFilter={handleChangeFilter} value={filter} />
      {books.length ? (
        <BookList
          books={books}
          onEditBook={onEditBook}
          onDeleteBook={onDeleteBook}
          handleSortClick={handleSortClick}
        />
      ) : !filter ? (
        <div className="flex h-[85vh] items-center justify-center">
          <h2 className="text-left text-[38px] font-semibold">
            Book list is empty.
          </h2>
        </div>
      ) : (
        <div className="flex h-[85vh] items-center justify-center">
          <h2 className="text-left text-[38px] font-semibold">
            No results for "{filter}".
          </h2>
        </div>
      )}
    </div>
  );
};
