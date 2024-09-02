import { BookListItem } from "./BookListItem";
import type { Book } from "../../types";

interface BookListProps {
  books: Book[];
}

export const BookList = ({ books }: BookListProps) => {
  const thStyles =
    "font-bold bg-[#7f26ba] py-[10px] px-[15px] cursor-pointer transition duration-300 first:rounded-tl-lg last:rounded-tr-lg";
  return (
    <div className="scrollbar max-h-[90vh]">
      <table className="w-full text-left">
        <thead className="sticky top-0 text-slate-50">
          <tr>
            <th className={thStyles}>№</th>
            <th className={thStyles}>Title</th>
            <th className={thStyles}>Author</th>
            <th className={thStyles}>ISBN</th>
            <th className={thStyles}>Status</th>
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
