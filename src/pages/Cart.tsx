// Components:
import Heading from "@/components/common/Heading";
import Loading from "@/components/feedback/Loading";
import CartItemList from "@/components/ecommerce/CartItem/CartItemList";
import CartTotalPrice from "@/components/ecommerce/CartItem/CartTotalPrice";

// Custom Hooks:
import { useCart } from "@/hooks";

const Cart = () => {
  const { productsWithFullInfo, loading, error, handleClearUserCart } =
    useCart();

  return (
    <div className="my-20 mx-auto max-w-3/4">
      <Heading title="Your cart" />

      <Loading status={loading} error={error}>
        {productsWithFullInfo.products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <CartItemList products={productsWithFullInfo.products} />
            </div>
            <div className="lg:col-span-1">
              <CartTotalPrice productsFull={productsWithFullInfo} />
            </div>
          </div>
        ) : (
          <p className="text-lg">Add some products to the cart</p>
        )}
        {productsWithFullInfo.products.length > 0 && (
          <div className="flex justify-center">
            <button
              className="text-white cursor-pointer my-4 bg-red-500 py-2 px-4 font-bold hover:bg-red-700 transition duration-150 rounded-sm"
              onClick={handleClearUserCart}
            >
              Clear Cart?
            </button>
          </div>
        )}
      </Loading>
    </div>
  );
};

export default Cart;
