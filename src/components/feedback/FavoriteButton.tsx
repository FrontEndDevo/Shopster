import { useState } from "react";
import Favorite from "@/assets/favorite.svg?react";
import { useAppDispatch } from "@/store/hooks";
import { actWishlistToggle } from "@/store/wishlist/wishlistSlice";
import PopupModal from "./modals/PopupModal";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFavoriteProduct = () => {
    if (isAuthenticated) {
      setIsLoading(true);
      dispatch(actWishlistToggle({ id, type: favorite ? "remove" : "add" }))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    } else {
      setShowModal(true);
    }
  };

  if (isLoading)
    return (
      <div className="w-10 h-10 lg:h-6 lg:w-6 absolute top-3 right-3 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    );

  return (
    <>
      {showModal && <PopupModal closeModal={() => setShowModal(false)} />}
      <Favorite
        onClick={handleFavoriteProduct}
        className={`w-10 h-10 lg:h-7 lg:w-7 absolute top-3 right-3 transition duration-200 hover:cursor-pointer hover:text-red-600 ${favorite ? "text-red-600" : ""}`}
      />
    </>
  );
};

export default FavoriteButton;
