import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "../store/productsSlice";
import { useParams } from "react-router-dom";
import Product from "../components/ecommerce/Product";
import Loading from "../components/feedback/Loading";
import RenderList from "../components/common/RenderList";

const Products = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);

  const params = useParams();

  useEffect(() => {
    if (params.prefix && typeof params.prefix === "string") {
      dispatch(actGetProductsByCatPrefix(params.prefix));
    }
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch]);

  return (
    <div>
      <Loading status={loading} error={error}>
        <RenderList
          records={records}
          handleRenderList={(record) => (
            <Product key={record.title} {...record} />
          )}
        />

        {records.length > 0 ? "" : <p>There are no products right now.</p>}
      </Loading>
    </div>
  );
};

export default Products;
