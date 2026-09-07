import Heading from "@/components/common/Heading";
import CartItemList from "@/components/ecommerce/CartItem/CartItemList";
import CartTotalPrice from "@/components/ecommerce/CartItem/CartTotalPrice";
import Loading from "@/components/feedback/Loading";
import { actGetCartProductsByIDs, clearCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, productsWithFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  );
  useEffect(() => {
    dispatch(actGetCartProductsByIDs());

    return () => {
      dispatch(clearCart());
    };
  }, [dispatch]);

  const products = productsWithFullInfo.map((product) => ({
    ...product,
    amount: items[product.id],
  }));

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
