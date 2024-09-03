import { useModal } from "../hooks";
import { Modal } from "./Modal";

interface ToolPanelProps {
  value: string;
  onChangeFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToolPanel = ({ value, onChangeFilter }: ToolPanelProps) => {
  const [isOpen, toggleModal] = useModal();
  return (
    <>
      <div className="mb-4 flex justify-between">
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
          <div></div>
        </Modal>
      )}
    </>
  );
};
