import { BookForm, Modal } from "../components";

import { useModal } from "../hooks";
import type { Book } from "../types";

interface ToolPanelProps {
  value: string;
  onChangeFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveBook: (book: Book, isEdit: boolean, oldIsbn?: string) => void;
}

export const ToolPanel = ({
  value,
  onChangeFilter,
  onSaveBook,
}: ToolPanelProps) => {
  const [isOpen, toggleModal] = useModal();
  return (
    <>
      <div className="mb-4 flex gap-2 md:justify-between">
        <input
          className="field max-w-[250px]"
          type="text"
          placeholder="Search..."
          onChange={onChangeFilter}
          value={value}
        />
        <button
          type="button"
          className="primary-btn w-[200px]"
          onClick={toggleModal}
        >
          Add book
        </button>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <BookForm toggleModal={toggleModal} onSaveBook={onSaveBook} />
        </Modal>
      )}
    </>
  );
};
