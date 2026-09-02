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
  console.log(records);

  useEffect(() => {
    // Check first if I have the categories already or not, not to send a request again.
    if (records.length === 0) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-8 my-6">
      <Loading status={loading} error={error}>
        <RenderList
          records={records}
          handleRenderList={(record) => (
            <Category key={record.id} {...record} />
          )}
        />

        {records.length > 0 ? "" : <p>There are no categories.</p>}
      </Loading>
    </div>
  );
};

export default Categories;
