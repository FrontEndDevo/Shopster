// React Hooks:
import { useState } from "react";

// Redux Hooks:
import { useAppDispatch } from "@/store/hooks";

// Redux Actions:
import { actWishlistToggle } from "@/store/wishlist/wishlistSlice";

// Components:
import PopupModal from "./modals/PopupModal";
import Spinner from "./Spinner";

// Toast:
import toast from "react-hot-toast";

// Images:
import Favorite from "@/assets/favorite.svg?react";

type TFavoriteButtonProps = {
  id: number;
  favorite?: boolean;
  isAuthenticated?: boolean;
};

const FavoriteButton = ({
  id,
  favorite,
  isAuthenticated,
}: TFavoriteButtonProps) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteProduct = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    setIsLoading(true);
    toast
      .promise(
        dispatch(actWishlistToggle({ id, type: favorite ? "remove" : "add" })),
        {
          loading: favorite
            ? "Removing from wishlist..."
            : "Adding to wishlist...",
          success: favorite
            ? "Removed from wishlist 🖤"
            : "Added to wishlist ❤️",
          error: "Something went wrong. Please try again ❌",
        },
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {showModal && <PopupModal closeModal={() => setShowModal(false)} />}
      {isLoading ? (
        <Spinner />
      ) : (
        <Favorite
          onClick={handleFavoriteProduct}
          className={`w-10 h-10 lg:h-7 lg:w-7 absolute top-3 right-3 transition duration-200 hover:cursor-pointer hover:text-red-600 ${favorite ? "text-red-600" : ""}`}
        />
      )}
    </>
  );
};

export default FavoriteButton;
