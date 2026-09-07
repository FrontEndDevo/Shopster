import { actGetWishlist, clearWishlist } from "@/store/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import Loading from "@/components/feedback/Loading";
import RenderList from "@/components/common/RenderList";
import Product from "@/components/ecommerce/Product";
import Heading from "@/components/common/Heading";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { productsWithFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist,
  );
  const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(clearWishlist());
    };
  }, [dispatch]);

  const wishlistProducts = productsWithFullInfo.map((el) => ({
    ...el,
    amount: items[el.id],
    isFavorite: true,
  }));

  return (
    <>
      <Heading title="Your wishlist" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-8 my-6">
        <Loading status={loading} error={error}>
          <RenderList
            records={wishlistProducts}
            handleRenderList={(record) => (
              <Product key={record.id} {...record} />
            )}
          />

          {wishlistProducts.length > 0 ? (
            ""
          ) : (
            <p>Add products to your wishlist.</p>
          )}
        </Loading>
      </div>
    </>
  );
};

export default Wishlist;
