import { BookListItem } from "./BookListItem";
import type { Book } from "../../types";

interface BookListProps {
  books: Book[];
  handleSortClick: (sortField: keyof Book) => void;
}

export const BookList = ({ books, handleSortClick }: BookListProps) => {
  const thStyles =
    "font-bold bg-[#7f26ba] py-[10px] px-[15px] cursor-pointer transition duration-300 first:rounded-tl-lg last:rounded-tr-lg";
  return (
    <div className="scrollbar max-h-[90vh]">
      <table className="w-full text-left">
        <thead className="sticky top-0 text-slate-50">
          <tr>
            <th className={thStyles} onClick={() => handleSortClick("_id")}>
              №
            </th>
            <th className={thStyles} onClick={() => handleSortClick("title")}>
              Title
            </th>
            <th className={thStyles} onClick={() => handleSortClick("author")}>
              Author
            </th>
            <th className={thStyles} onClick={() => handleSortClick("isbn")}>
              ISBN
            </th>
            <th
              className={thStyles}
              onClick={() => handleSortClick("isBorrowed")}
            >
              Status
            </th>
            <th className={thStyles}></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <BookListItem key={book._id} {...{ book, index }} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
