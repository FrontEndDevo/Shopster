// React Hooks:
import { useEffect } from "react";

// Redux Hooks:
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Redux Actions:
import { actGetProducts, productsCleanUp } from "@/store/productsSlice";

function useProducts() {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const { productsIds } = useAppSelector((state) => state.wishlist);
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const promise = dispatch(actGetProducts());

    // Clean up the products state when the component unmounts
    return () => {
      promise.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch]);

  const wishlistProducts = records.map((el) => ({
    ...el,
    isFavorite: productsIds.includes(el.id),
    isAuthenticated: token ? true : false,
  }));
  return { wishlistProducts, records, loading, error };
}

export default useProducts;
