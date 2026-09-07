import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetProducts, productsCleanUp } from "@/store/productsSlice";

function useProducts() {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const { productsIds } = useAppSelector((state) => state.wishlist);

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
  }));
  return { wishlistProducts, records, loading, error };
}

export default useProducts;
