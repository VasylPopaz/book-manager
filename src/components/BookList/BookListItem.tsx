import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

import type { Book } from "../../types";
import { useModal } from "../../hooks";
import { Modal } from "../Modal";

interface BookListItemProps {
  book: Book;
  index: number;
}

export const BookListItem = ({ book, index }: BookListItemProps) => {
  const [isOpen, toggleModal] = useModal();
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
            <AiOutlineEdit size={24} />
          </button>
          <button>
            <AiOutlineDelete size={22} />
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
