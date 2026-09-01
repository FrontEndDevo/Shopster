import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetCategories } from "../store/categoriesSlice";
import Category from "../components/ecommerce/Category";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    if (records.length === 0) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

  return (
    <div>
      {records.length > 0 ? (
        records.map((record) => <Category key={record.title} {...record} />)
      ) : (
        <p>There are no categories.</p>
      )}
    </div>
  );
};

export default Categories;
