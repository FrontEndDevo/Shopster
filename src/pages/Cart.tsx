import Heading from "@/components/common/Heading";
import CartItemList from "@/components/ecommerce/CartItem/CartItemList";
import CartTotalPrice from "@/components/ecommerce/CartItem/CartTotalPrice";
import Loading from "@/components/feedback/Loading";
import { useCart } from "@/hooks";
import { actClearUserCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";

const Cart = () => {
  const { productsWithFullInfo, loading, error } = useCart();
  const dispatch = useAppDispatch();

  const handleClearUserCart = () => {
    dispatch(actClearUserCart());
  };
  return (
    <>
      <Heading title="Your cart" />

      <Loading status={loading} error={error}>
        {productsWithFullInfo.products.length > 0 ? (
          <div className="my-10 mx-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
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
    </>
  );
};

export default Cart;
