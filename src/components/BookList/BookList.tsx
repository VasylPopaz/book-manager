import { BiUpArrowAlt } from "react-icons/bi";
import { BookListItem } from "./BookListItem";

import { SortOptions, type Book } from "../../types";

interface BookListProps {
  books: Book[];
  handleSortClick: (field: SortOptions) => void;
  onSaveBook: (book: Book, isEdit: boolean) => void;
  onDeleteBook: (id: string) => void;
  sortConfig: {
    field: SortOptions;
    direction: "true" | "false";
  };
}

export const BookList = ({
  books,
  handleSortClick,
  onSaveBook,
  onDeleteBook,
  sortConfig,
}: BookListProps) => {
  const { field, direction } = sortConfig;

  return (
    <div className="scrollbar mb-4 max-h-[80vh]">
      <table className="w-full table-auto text-left">
        <thead className="sticky top-0 text-slate-50">
          <tr>
            <th
              className="th-cell w-auto text-center"
              onClick={() => handleSortClick(SortOptions.None)}
            >
              №
            </th>
            <th
              className="th-cell"
              onClick={() => handleSortClick(SortOptions.Title)}
            >
              Title{" "}
              {field === SortOptions.Title && (
                <BiUpArrowAlt
                  size={24}
                  className={`icon ${direction === "true" ? "rotate-0" : "rotate-180"}`}
                />
              )}
            </th>
            <th
              className="th-cell"
              onClick={() => handleSortClick(SortOptions.Author)}
            >
              Author
              {field === SortOptions.Author && (
                <BiUpArrowAlt
                  size={24}
                  className={`icon ${direction === "true" ? "rotate-0" : "rotate-180"}`}
                />
              )}
            </th>
            <th
              className="th-cell"
              onClick={() => handleSortClick(SortOptions.ISBN)}
            >
              ISBN{" "}
              {field === SortOptions.ISBN && (
                <BiUpArrowAlt
                  size={24}
                  className={`icon ${direction === "true" ? "rotate-0" : "rotate-180"}`}
                />
              )}
            </th>
            <th
              className="th-cell"
              onClick={() => handleSortClick(SortOptions.Status)}
            >
              Status{" "}
              {field === SortOptions.Status && (
                <BiUpArrowAlt
                  size={24}
                  className={`icon ${direction === "true" ? "rotate-0" : "rotate-180"}`}
                />
              )}
            </th>
            <th className="th-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <BookListItem
              key={book._id}
              {...{ book, index, onSaveBook, onDeleteBook }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
