// React Hooks:
import { useEffect } from "react";

// Redux Hooks:
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Redux Actions:
import { actGetWishlist, clearWishlist } from "@/store/wishlist/wishlistSlice";

function useWishlist() {
  const dispatch = useAppDispatch();
  const { productsWithFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist,
  );
  const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const promise = dispatch(actGetWishlist("productsWithFullInfo"));

    return () => {
      promise.abort();
      dispatch(clearWishlist());
    };
  }, [dispatch]);

  const wishlistProducts = productsWithFullInfo.map((el) => ({
    ...el,
    amount: items[el.id],
    isFavorite: true,
    isAuthenticated: true,
  }));

  return { wishlistProducts, loading, error };
}

export default useWishlist;
