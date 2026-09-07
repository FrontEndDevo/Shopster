import Loading from "@/components/feedback/Loading";
import RenderList from "@/components/common/RenderList";
import Product from "@/components/ecommerce/Product";
import Heading from "@/components/common/Heading";
import { useWishlist } from "@/hooks";

const Wishlist = () => {
  const { wishlistProducts, loading, error } = useWishlist();

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
