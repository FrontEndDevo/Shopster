import { useEffect, useState } from "react";
import type { TCartItem } from "@/types";
import UserAddress from "@/components/forms/UserAddress";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actPlaceOrder, ordersInit } from "@/store/orders/ordersSlice";
import { actClearUserCart } from "@/store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import actGetUserAddresses from "@/store/actions/actGetUserAddresses";

type TCartItemsProps = { productsFull: TCartItem };

const CartTotalPrice = ({ productsFull }: TCartItemsProps) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { shippingAddresses } = useAppSelector((state) => state.address);
  const { loading, error } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actGetUserAddresses());
  }, [dispatch]);

  const handlePlaceOrder = () => {
    // If we have no addresses for the user, Open the model to get one.
    if (shippingAddresses.length === 0) {
      setShowModal(true);
      return;
    }

    dispatch(actPlaceOrder())
      .unwrap()
      .then(() => {
        dispatch(actClearUserCart());
        dispatch(ordersInit());
      })
      .finally(() => navigate("/orders"));
  };

  // I used useMemo to prevent calling this heavy function again in vain.
  // const { totalPrices, totalDiscounts } = useMemo(
  //   () => CalcCartTotalPrice({ products }),
  //   [products],
  // );

  return (
    <>
      <div className="sticky top-8 bg-white rounded border-2 border-gray-200 flex flex-col gap-4 h-fit items-start p-8">
        <h4 className="text-xl font-semibold">Cart total</h4>

        <div className="w-full py-2">
          <div className="flex justify-between border-dashed border-b items-center gap-2 my-2">
            <p className="font-semibold text-lg text-neutral-500 capitalize">
              Total:
            </p>
            <span className="text-green-700 font-semibold text-lg">
              ${productsFull.totalCartPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          disabled={showModal || loading == "pending"}
          className="font-semibold text-lg bg-blue-500 py-1 px-3 mx-auto rounded text-white transition duration-100 hover:bg-blue-600 cursor-pointer disabled:bg-blue-300 disabled:cursor-default"
          onClick={handlePlaceOrder}
        >
          Procced to checkout
        </button>
        {error && (
          <p className="text-sm text-center text-red-400">
            Failed to place order: {error}
          </p>
        )}
      </div>
      {showModal && <UserAddress closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default CartTotalPrice;
