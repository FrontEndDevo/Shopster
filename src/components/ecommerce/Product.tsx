import { memo, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { actAddProductToCart } from "@/store/cart/cartSlice";
import type { TProducts } from "@/types";
import CalcProductPriceAfterDiscount from "@/utils/CalcProductPriceAfterDiscount";
import FavoriteButton from "../feedback/FavoriteButton";
import toast from "react-hot-toast";
const Product = memo(
  ({
    id,
    title,
    imageCover,
    price,
    priceAfterDiscount,
    quantity,
    description,
    isFavorite,
    isAuthenticated,
  }: TProducts) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = () => {
      setIsLoading(true);
      toast
        .promise(dispatch(actAddProductToCart(String(id))).unwrap(), {
          loading: "Adding item to cart...",
          success: "Item added to cart successfully 🛒",
          error: "Failed to add item to cart.",
        })
        .finally(() => setIsLoading(false));
    };

    const { finalPrice, finalDiscount } = CalcProductPriceAfterDiscount({
      price,
      priceAfterDiscount,
    });

    return (
      <div className="relative transform transition duration-300 border-2 bg-white rounded-md overflow-hidden border-gray-300 flex flex-col gap-2">
        <img
          className="w-full h-full rounded-t-sm object-cover"
          src={imageCover}
          alt={title}
        />
        <div>
          <div className="flex flex-col justify-between items-start mx-2">
            <h2
              title={title}
              className="line-clamp-2 text-lg font-bold my-2 text-gray-800 transition duration-200 hover:cursor-pointer hover:text-red-600"
            >
              {title}
            </h2>
            <div className="mx-auto my-2">
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="text-lg font-bold text-green-700">${finalPrice}</p>
              <span className="text-sm line-through text-gray-400">
                {finalDiscount && `$${finalDiscount}`}
              </span>
            </div>
          </div>
          <button
            className="border-2 border-neutral-700 py-1 px-4 rounded-lg hover:cursor-pointer transition duration-200 text-black font-semibold hover:text-white hover:bg-neutral-800 my-4"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add to cart"}
          </button>
        </div>
        <span className="absolute text-lg lg:text-sm top-3 left-3 bg-blue-500 text-white rounded-full p-1">
          {quantity}
        </span>
        <FavoriteButton
          id={id}
          favorite={isFavorite}
          isAuthenticated={isAuthenticated}
        />
      </div>
    );
  },
);

export default Product;
