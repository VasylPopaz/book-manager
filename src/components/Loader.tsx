import { HashLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#191a1599] backdrop-blur-sm">
      <HashLoader size={60} color="#f7f4e9" />
    </div>
  );
};
