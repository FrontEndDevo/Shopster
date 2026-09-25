// React Hooks:
import { useEffect } from "react";

// Redux Hooks:
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Redux Actions:
import { actGetLoggedUserCart } from "@/store/cart/cartSlice";
import { actClearUserCart } from "@/store/cart/cartSlice";

// Toast:
import toast from "react-hot-toast";

function useCart() {
  const dispatch = useAppDispatch();
  const { productsWithFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(actGetLoggedUserCart());
  }, [dispatch]);

  const handleClearUserCart = () => {
    toast.promise(dispatch(actClearUserCart()).unwrap(), {
      loading: "Clearing cart...",
      success: "Cart cleared successfully.",
      error: "Failed to clear cart.",
    });
    // .finally(() => setIsLoading(false));
  };

  return { productsWithFullInfo, loading, error, handleClearUserCart };
}
export default useCart;
