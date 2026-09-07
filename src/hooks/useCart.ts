import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCartProductsByIDs, clearCart } from "@/store/cart/cartSlice";

function useCart() {
  const dispatch = useAppDispatch();
  const { items, productsWithFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  );
  useEffect(() => {
    const promise = dispatch(actGetCartProductsByIDs());

    return () => {
      promise.abort();
      dispatch(clearCart());
    };
  }, [dispatch]);

  const products = productsWithFullInfo.map((product) => ({
    ...product,
    amount: items[product.id],
  }));

  return { products, loading, error };
}
export default useCart;
