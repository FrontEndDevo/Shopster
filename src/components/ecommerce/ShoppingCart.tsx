import { getTotalCartQuantitySelector } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/hooks";
import Cart from "@/assets/cart.svg?react";

const ShoppingCart = () => {
  const totalQuantity = useAppSelector(getTotalCartQuantitySelector);

  return (
    <div className="relative">
      <Cart className="w-10 h-10" />
      <p className="absolute -top-2 -right-2 bg-blue-500 font-bold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {totalQuantity}
      </p>
    </div>
  );
};

export default ShoppingCart;
