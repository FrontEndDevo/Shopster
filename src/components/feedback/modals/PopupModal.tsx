import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const PopupModal = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();
  return createPortal(
    <div className="fixed top-1/12 right-2/12 md:right-1/4 lg:right-1/3 xl:right-2/5 h-fit w-fit py-6 px-20 z-50 rounded-lg bg-neutral-600 text-white">
      <div className="relative">
        <button
          onClick={() => closeModal()}
          className="absolute -top-4 -right-16 text-2xl hover:text-red-600 transition duration-150 cursor-pointer p-1"
        >
          x
        </button>
        <div className="text-center lg:py-4 lg:px-12">
          <div>
            <p className="text-lg lg:text-2xl font-semibold">Login Required!</p>
            <p className="my-4 text-sm lg:text-base">
              You need to login first.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => closeModal()}
            className="rounded-sm bg-red-600 hover:shadow-red-400 hover:shadow-lg transition duration-150 py-2 px-6 font-semibold italic text-lg cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => navigate("/login")}
            className="rounded-sm bg-blue-600 hover:shadow-blue-400 hover:shadow-lg transition duration-150 py-2 px-6 font-semibold italic text-lg cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PopupModal;
