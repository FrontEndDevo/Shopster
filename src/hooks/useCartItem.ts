// Redux Hooks:
import { useAppDispatch } from "@/store/hooks";

// Redux Actions:
import {
  actRemoveProductFromCart,
  actUpdateCartProductQuantity,
} from "@/store/cart/cartSlice";

// Toast:
import toast from "react-hot-toast";

// Types:
import type { TCartProduct } from "@/types";

const useCartItem = ({ count, price, product }: TCartProduct) => {
  const dispatch = useAppDispatch();
  // Remove item from the cart
  const handleRemoveItemFromCart = () => {
    toast.promise(dispatch(actRemoveProductFromCart(product.id)).unwrap(), {
      loading: "Removing item...",
      success: "Item removed from cart.",
      error: "Could not remove item from cart.",
    });
    // .finally(() => setIsLoading(false));
  };

  // Increment 1 to the amout of a product in the cart:
  const handleIncrementQuantity = () => {
    toast.promise(
      dispatch(
        actUpdateCartProductQuantity({
          productId: product.id,
          amount: count + 1,
        }),
      ).unwrap(),
      {
        loading: "Increment quantity (+)",
        success: "Cart updated.",
        error: "Failed to update quantity.",
      },
    );
    // .finally(() => setIsLoading(false));
  };

  // Decrement 1 from the amout of a product in the cart:
  const handleDecrementQuantity = () => {
    toast.promise(
      dispatch(
        actUpdateCartProductQuantity({
          productId: product.id,
          amount: count - 1,
        }),
      ).unwrap(),
      {
        loading: "Decrement quantity (-)",
        success: "Cart updated.",
        error: "Failed to update quantity.",
      },
    );
    // .finally(() => setIsLoading(false));
  };

  // const { finalPrice } = CalcProductPriceAfterDiscount({
  //   price,
  //   priceAfterDiscount,
  // });

  const subTotal = price * count;

  return {
    subTotal,
    handleRemoveItemFromCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
  };
};

export default useCartItem;
