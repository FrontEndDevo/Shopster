import type { TProducts } from "@/types/products";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cart/cartSlice";
import Favorite from "@/assets/favorite.svg?react";
const Product = ({
  id,
  title,
  imageCover,
  price,
  priceAfterDiscount,
  quantity,
}: TProducts) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };

  const discount = priceAfterDiscount ? price - priceAfterDiscount : 0;

  return (
    <div className="relative transform transition duration-300 border-2 bg-white rounded-md overflow-hidden border-gray-300 flex flex-col gap-2">
      <img
        className="w-full h-full rounded-t-sm object-cover"
        src={imageCover}
        alt={title}
      />
      <div>
        <div className="flex flex-col justify-between items-start mx-2">
          <h2 className="text-lg font-bold my-2 text-gray-800 transition duration-200 hover:cursor-pointer hover:text-red-600">
            {title}
          </h2>
          <div className="flex justify-center items-center gap-2">
            <p className="text-lg font-bold text-green-700">
              $
              {priceAfterDiscount
                ? priceAfterDiscount.toFixed(2)
                : price.toFixed(2)}
            </p>
            <span className="text-sm line-through text-gray-400">
              {discount ? `$${discount.toFixed(2)}` : ""}
            </span>
          </div>
        </div>
        <button
          className="border-2 border-neutral-700 py-1 px-4 rounded-lg hover:cursor-pointer transition duration-200 text-black font-semibold hover:text-white hover:bg-neutral-800 my-4"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
      <span className="absolute text-lg lg:text-sm top-3 left-3 bg-blue-500 text-white rounded-full p-1">
        {quantity}
      </span>
      <Favorite className="w-10 h-10 lg:h-7 lg:w-7 absolute top-3 right-3 transition duration-200 hover:cursor-pointer hover:text-red-600" />
    </div>
  );
};

export default Product;
