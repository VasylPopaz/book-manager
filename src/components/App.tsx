import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import { BookList, Loader, ToolPanel } from "../components";

import { getBooks } from "../api";
import { Book, SortOptions } from "../types";

export const App = () => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    field: SortOptions;
    direction: "true" | "false";
  }>({ field: SortOptions.None, direction: "true" });

  const debouncedFetch = useRef(
    debounce((query: string, sort: string) => {
      setIsLoading(true);
      getBooks(query, sort)
        .then((res) => {
          setBooks(res.books);
        })
        .finally(() => setIsLoading(false));
    }, 400)
  ).current;

  useEffect(() => {
    const sort =
      sortConfig.field === SortOptions.None
        ? ""
        : `${sortConfig.field}=${sortConfig.direction}`;
    const query = filter ? filter : "";
    debouncedFetch(query, sort);
  }, [debouncedFetch, filter, sortConfig.direction, sortConfig.field]);

  if (!books) return <Loader />;

  const onSaveBook = (book: Book, isEdit: boolean, oldIsbn?: string) => {
    if (isEdit) {
      const currentIsbn = oldIsbn ? oldIsbn : book.isbn;
      setBooks(books.map((b) => (b.isbn === currentIsbn ? book : b)));
    } else {
      setBooks([...books, book]);
    }
  };

  const onDeleteBook = (isbn: string) => {
    setBooks(books.filter((book) => book.isbn !== isbn));
  };

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
  };

  const handleSortClick = (field: SortOptions) => {
    if (field === SortOptions.None) {
      setSortConfig({ field, direction: "true" });
    } else {
      const direction =
        sortConfig.field === field && sortConfig.direction === "true"
          ? "false"
          : "true";
      setSortConfig({ field, direction });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="container py-8">
        <ToolPanel
          onChangeFilter={handleChangeFilter}
          value={filter}
          onSaveBook={onSaveBook}
        />
        {books.length ? (
          <>
            <BookList
              books={books}
              onSaveBook={onSaveBook}
              onDeleteBook={onDeleteBook}
              handleSortClick={handleSortClick}
              sortConfig={sortConfig}
            />
            <h2 className="text-right text-[24px] font-bold">
              Total books: {books.length}
            </h2>
          </>
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
    </>
  );
};
