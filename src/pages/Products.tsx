import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetProducts, productsCleanUp } from "@/store/productsSlice";
import Product from "@/components/ecommerce/Product";
import Loading from "@/components/feedback/Loading";
import RenderList from "@/components/common/RenderList";
import Heading from "@/components/common/Heading";

const Products = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const { productsIds } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(actGetProducts());

    // Clean up the products state when the component unmounts
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch]);

  const wishlistProducts = records.map((el) => ({
    ...el,
    isFavorite: productsIds.includes(el.id),
  }));

  return (
    <>
      <Heading title="Products" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-8 my-6">
        <Loading status={loading} error={error}>
          <RenderList
            records={wishlistProducts}
            handleRenderList={(record) => (
              <Product key={record.id} {...record} />
            )}
          />

          {records.length > 0 ? "" : <p>There are no products right now.</p>}
        </Loading>
      </div>
    </>
  );
};

export default Products;
