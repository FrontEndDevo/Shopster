import Heading from "@/components/common/Heading";
import CartItemList from "@/components/ecommerce/CartItem/CartItemList";
import CartTotalPrice from "@/components/ecommerce/CartItem/CartTotalPrice";
import Loading from "@/components/feedback/Loading";
import { useCart } from "@/hooks";

const Cart = () => {
  const { products, loading, error } = useCart();
  return (
    <>
      <Heading title="Your cart" />
      <Loading status={loading} error={error}>
        {products.length > 0 ? (
          <div className="my-10 mx-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <CartItemList products={products} />
            </div>
            <div className="lg:col-span-1">
              <CartTotalPrice products={products} />
            </div>
          </div>
        ) : (
          <p className="text-lg">Add some products to the cart</p>
        )}
      </Loading>
    </>
  );
};

export default Cart;
