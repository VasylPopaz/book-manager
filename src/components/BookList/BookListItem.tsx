import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

import type { Book } from "../../types";
import { useModal } from "../../hooks";
import { Modal } from "../Modal";
import { deleteBook } from "../../api";
import { toast } from "react-toastify";

interface BookListItemProps {
  book: Book;
  index: number;
  onDeleteBook: (id: string) => void;
}

export const BookListItem = ({
  book,
  index,
  onDeleteBook,
}: BookListItemProps) => {
  const [isOpen, toggleModal] = useModal();

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
      <tr className="even:bg-[#aea4b9]">
        <td className="p-1">{index + 1}</td>
        <td className="p-1">{book.title}</td>
        <td className="p-1">{book.author}</td>
        <td className="p-1">{book.isbn}</td>
        <td className={`p-1`}>
          <button
            className={`w-[100px] rounded-md px-4 py-1 text-center ${book.isBorrowed ? "bg-red-400" : "bg-green-400"}`}
          >
            {" "}
            {book.isBorrowed ? "Borrowed" : "Available"}
          </button>
        </td>
        <td className="flex h-[40px] items-center gap-2">
          <button onClick={toggleModal}>
            <AiOutlineEdit size={24} className="fill-green-600" />
          </button>
          <button onClick={handleDeleteClick}>
            <AiOutlineDelete size={22} className="fill-red-600" />
          </button>
        </td>
      </tr>
      {isOpen && (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <div></div>
        </Modal>
      )}
    </>
  );
};
