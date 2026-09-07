import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetWishlist, clearWishlist } from "@/store/wishlist/wishlistSlice";
function useWishlist() {
  const dispatch = useAppDispatch();
  const { productsWithFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist,
  );
  const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(clearWishlist());
    };
  }, [dispatch]);

  const wishlistProducts = productsWithFullInfo.map((el) => ({
    ...el,
    amount: items[el.id],
    isFavorite: true,
  }));

  return { wishlistProducts, loading, error };
}

export default useWishlist;
