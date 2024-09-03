import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

import { useEscapeKeyClose } from "../hooks";
import { handleClickOnBackdrop } from "../helpers";

interface ModalProps {
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
  toggleModal: () => void;
}

const modalRoot = document.querySelector("#modalRoot")!;

export const Modal = ({
  isOpen,
  className,
  children,
  toggleModal,
}: ModalProps) => {
  useEscapeKeyClose(isOpen, toggleModal);

  return ReactDOM.createPortal(
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#191a1599]"
      onClick={(e) => handleClickOnBackdrop(toggleModal, e)}
    >
      <div
        className={`relative max-h-[95%] max-w-[330px] rounded bg-white sm-max:max-w-[300px] md:max-w-[700px] lg:max-w-[1180px] ${className}`}
      >
        <button
          type="button"
          onClick={toggleModal}
          className="absolute right-3 top-3"
        >
          <AiOutlineClose size={24} />
        </button>

        {children}
      </div>
    </div>,
    modalRoot
  );
};
