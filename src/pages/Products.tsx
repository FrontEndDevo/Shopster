import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "../store/productsSlice";
import { useParams } from "react-router-dom";
import Product from "../components/ecommerce/Product";

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
      {records.length > 0 ? (
        records.map((record) => <Product key={record.title} {...record} />)
      ) : (
        <p>There are no products right now.</p>
      )}
    </div>
  );
};

export default Products;
