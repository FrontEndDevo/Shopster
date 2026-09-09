import { useState } from "react";
import Favorite from "@/assets/favorite.svg?react";
import { useAppDispatch } from "@/store/hooks";
import { actWishlistToggle } from "@/store/wishlist/wishlistSlice";

type TFavoriteButtonProps = {
  id: number;
  favorite?: boolean;
};

const FavoriteButton = ({ id, favorite }: TFavoriteButtonProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteProduct = () => {
    setIsLoading(true);
    dispatch(actWishlistToggle({ id, type: favorite ? "remove" : "add" }))
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  if (isLoading)
    return (
      <div className="w-10 h-10 lg:h-6 lg:w-6 absolute top-3 right-3 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    );

  return (
    <Favorite
      onClick={handleFavoriteProduct}
      className={`w-10 h-10 lg:h-7 lg:w-7 absolute top-3 right-3 transition duration-200 hover:cursor-pointer hover:text-red-600 ${favorite ? "text-red-600" : ""}`}
    />
  );
};

export default FavoriteButton;
