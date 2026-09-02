import { getTotalCartQuantitySelector } from "../../store/cart/cartSlice";
import { useAppSelector } from "../../store/hooks";

const ShoppingCart = () => {
  const totalQuantity = useAppSelector(getTotalCartQuantitySelector);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>{totalQuantity}</p>
    </div>
  );
};

export default ShoppingCart;
