import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetLoggedUserCart } from "@/store/cart/cartSlice";

function useCart() {
  const dispatch = useAppDispatch();
  const { productsWithFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(actGetLoggedUserCart());
  }, [dispatch]);

  return { productsWithFullInfo, loading, error };
}
export default useCart;
