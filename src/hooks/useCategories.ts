import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCategories, clearCategories } from "@/store/categoriesSlice";

function useCategories() {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    const promise = dispatch(actGetCategories());

    return () => {
      promise.abort();
      dispatch(clearCategories());
    };
  }, [dispatch, records]);

  return { records, loading, error };
}

export default useCategories;
