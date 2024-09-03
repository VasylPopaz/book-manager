import { BookListItem } from "./BookListItem";

import type { Book } from "../../types";

interface BookListProps {
  books: Book[];
  handleSortClick: (sortField: keyof Book) => void;
  onSaveBook: (book: Book, isEdit: boolean) => void;
  onDeleteBook: (id: string) => void;
}

export const BookList = ({
  books,
  handleSortClick,
  onSaveBook,
  onDeleteBook,
}: BookListProps) => {
  return (
    <div className="scrollbar mb-4 max-h-[80vh]">
      <table className="w-full table-auto text-left">
        <thead className="sticky top-0 text-slate-50">
          <tr>
            <th
              className="th-cell w-auto text-center"
              onClick={() => handleSortClick("_id")}
            >
              №
            </th>
            <th className="th-cell" onClick={() => handleSortClick("title")}>
              Title
            </th>
            <th className="th-cell" onClick={() => handleSortClick("author")}>
              Author
            </th>
            <th className="th-cell" onClick={() => handleSortClick("isbn")}>
              ISBN
            </th>
            <th
              className="th-cell"
              onClick={() => handleSortClick("isBorrowed")}
            >
              Status
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
