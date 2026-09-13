import { memo } from "react";
import { useAppDispatch } from "@/store/hooks";
// import CalcProductPriceAfterDiscount from "@/utils/CalcProductPriceAfterDiscount";
import type { TCartProduct } from "@/types";
import Remove from "@/assets/remove.svg?react";
import {
  actRemoveProductFromCart,
  actUpdateCartProductQuantity,
} from "@/store/cart/cartSlice";

const CartItem = memo(({ count, price, product }: TCartProduct) => {
  const dispatch = useAppDispatch();
  // Remove item from the cart
  const handleRemoveItemFromCart = () => {
    dispatch(actRemoveProductFromCart(product.id));
  };

  // Increment 1 to the amout of a product in the cart:
  const handleIncrementQuantity = () => {
    dispatch(
      actUpdateCartProductQuantity({
        productId: product.id,
        amount: count + 1,
      }),
    );
  };

  // Decrement 1 from the amout of a product in the cart:
  const handleDecrementQuantity = () => {
    dispatch(
      actUpdateCartProductQuantity({
        productId: product.id,
        amount: count - 1,
      }),
    );
  };

  // const { finalPrice } = CalcProductPriceAfterDiscount({
  //   price,
  //   priceAfterDiscount,
  // });

  const subTotal = price * count;

  return (
    <div className="grid grid-cols-12 items-center gap-4 border-b border-dashed border-gray-200 py-4 px-2">
      <div className="col-span-12 md:col-span-8 flex items-center gap-4">
        <img
          className="w-24 h-24 md:w-28 md:h-28 rounded-lg object-cover shrink-0 shadow-sm"
          src={product.imageCover}
          alt={product.title}
        />
        <div className="flex flex-col justify-center gap-1">
          <h2
            title={product.title}
            className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2"
          >
            {product.title}
          </h2>
          <p className="text-sm md:text-base font-medium text-gray-500">
            {price}
          </p>
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 flex items-center justify-around py-2 border rounded border-red-500 font-semibold text-lg">
        <button
          onClick={handleDecrementQuantity}
          className="transition duration-200 hover:text-white hover:bg-red-500 rounded px-2 cursor-pointer"
        >
          -
        </button>
        <span>{count}</span>
        <button
          onClick={handleIncrementQuantity}
          className="transition duration-200 hover:text-white hover:bg-red-500 rounded px-2 cursor-pointer"
        >
          +
        </button>
      </div>

      <div className="col-span-7 md:col-span-1 grid grid-cols-subgrid text-gray-600">
        <div className="col-start-4">${subTotal.toFixed(2)}</div>
      </div>

      <div className="col-span-1 flex justify-end">
        <Remove
          onClick={handleRemoveItemFromCart}
          className="w-6 h-6 text-gray-400 transition duration-200 hover:cursor-pointer hover:text-red-600"
        />
      </div>
    </div>
  );
});

export default CartItem;
