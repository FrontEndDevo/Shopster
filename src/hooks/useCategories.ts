// React Hooks:
import { useEffect } from "react";

// Redux Hooks:
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Redux Actions:
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
  }, [dispatch]);

  return { records, loading, error };
}

export default useCategories;
