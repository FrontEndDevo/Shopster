import Category from "@/components/ecommerce/Category";
import Loading from "@/components/feedback/Loading";
import RenderList from "@/components/common/RenderList";
import Heading from "@/components/common/Heading";
import { useCategories } from "@/hooks";

const Categories = () => {
  const { records, loading, error } = useCategories();

  return (
    <>
      <Heading title="Categories" />
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
    </>
  );
};

export default Categories;
