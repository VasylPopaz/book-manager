import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

import { Modal, BookForm } from "../../components";

import type { Book } from "../../types";
import { useModal } from "../../hooks";
import { deleteBook, updateBookStatus } from "../../api";

interface BookListItemProps {
  book: Book;
  index: number;
  onSaveBook: (book: Book, isEdit: boolean) => void;
  onDeleteBook: (id: string) => void;
}

export const BookListItem = ({
  book,
  index,
  onSaveBook,
  onDeleteBook,
}: BookListItemProps) => {
  const [isOpen, toggleModal] = useModal();

  const handleChangeStatus = async () => {
    try {
      const updatedBook = await updateBookStatus(book.isbn, !book.isBorrowed);
      onSaveBook(updatedBook, true);
      toast.success(
        `Status of the book «${book.title}» has been successfully updated`
      );
    } catch (error) {
      toast.error(error instanceof Error && error.message);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteBook(book.isbn);
      onDeleteBook(book.isbn);
      toast.success(`Book «${book.title}» was deleted successfully`);
    } catch (error) {
      toast.error(error instanceof Error && error.message);
    }
  };

  return (
    <>
      <tr className="border-b border-b-[#f7f4e9]">
        <td className="table-cell text-center">{index + 1}</td>
        <td className="table-cell">{book.title}</td>
        <td className="table-cell">{book.author}</td>
        <td className="table-cell">{book.isbn}</td>
        <td className="table-cell">
          <button
            onClick={handleChangeStatus}
            className={`text-accentColor w-[160px] rounded-md px-4 py-1 text-center hover:text-white focus-visible:text-white ${book.isBorrowed ? "bg-red-400 hover:bg-red-600 focus-visible:bg-red-600" : "bg-green-400 hover:bg-green-600 focus-visible:bg-green-600"} transition duration-300`}
          >
            {" "}
            {book.isBorrowed ? "Borrowed" : "Available"}
          </button>
        </td>
        <td className="table-cell space-x-4">
          <button onClick={toggleModal}>
            <AiOutlineEdit
              size={24}
              className="fill-green-600 transition duration-300 hover:scale-[1.15] focus-visible:scale-[1.15]"
            />
          </button>
          <button onClick={handleDeleteClick}>
            <AiOutlineDelete
              size={22}
              className="fill-red-600 transition duration-300 hover:scale-[1.15] focus-visible:scale-[1.15]"
            />
          </button>
        </td>
      </tr>
      {isOpen && (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <BookForm
            toggleModal={toggleModal}
            onSaveBook={onSaveBook}
            book={book}
          />
        </Modal>
      )}
    </>
  );
};
