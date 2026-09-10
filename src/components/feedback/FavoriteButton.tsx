import { useState } from "react";
import Favorite from "@/assets/favorite.svg?react";
import { useAppDispatch } from "@/store/hooks";
import { actWishlistToggle } from "@/store/wishlist/wishlistSlice";
import PopupModel from "./PopupModel";

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
  const [showModel, setShowModel] = useState(false);

  const handleFavoriteProduct = () => {
    if (isAuthenticated) {
      setIsLoading(true);
      dispatch(actWishlistToggle({ id, type: favorite ? "remove" : "add" }))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    } else {
      setShowModel(true);
    }
  };

  if (isLoading)
    return (
      <div className="w-10 h-10 lg:h-6 lg:w-6 absolute top-3 right-3 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    );

  return (
    <>
      {showModel && <PopupModel closeModel={() => setShowModel(false)} />}
      <Favorite
        onClick={handleFavoriteProduct}
        className={`w-10 h-10 lg:h-7 lg:w-7 absolute top-3 right-3 transition duration-200 hover:cursor-pointer hover:text-red-600 ${favorite ? "text-red-600" : ""}`}
      />
    </>
  );
};

export default FavoriteButton;
