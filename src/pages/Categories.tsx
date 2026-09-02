import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetCategories } from "@/store/categoriesSlice";
import Category from "@/components/ecommerce/Category";
import Loading from "@/components/feedback/Loading";
import RenderList from "@/components/common/RenderList";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    // Check first if I have the categories already or not, not to send a request again fetch them again.
    if (records.length === 0) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

  return (
    <div>
      <Loading status={loading} error={error}>
        <RenderList
          records={records}
          handleRenderList={(record) => (
            <Category key={record.title} {...record} />
          )}
        />

        {records.length > 0 ? "" : <p>There are no categories.</p>}
      </Loading>
    </div>
  );
};

export default Categories;
