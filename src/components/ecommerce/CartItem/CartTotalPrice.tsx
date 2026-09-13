import { useState } from "react";
import type { TCartItem } from "@/types";
import UserAddress from "@/components/forms/UserAddress";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actPlaceOrder from "@/store/actions/actPlaceOrder";

type TCartItemsProps = { productsFull: TCartItem };

const CartTotalPrice = ({ productsFull }: TCartItemsProps) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { shippingAddresses } = useAppSelector((state) => state.address);

  const handlePlaceOrder = () => {
    // If we have no addresses for the user, Open the model to get one.
    if (shippingAddresses.length === 0) {
      setShowModal(true);
    } else {
      // Do something here:
      console.log(`something here`);
      dispatch(actPlaceOrder());
    }
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
          disabled={showModal}
          className="font-semibold text-lg bg-blue-500 py-1 px-3 mx-auto rounded text-white transition duration-100 hover:bg-blue-600 cursor-pointer disabled:bg-blue-300 disabled:cursor-default"
          onClick={handlePlaceOrder}
        >
          Procced to checkout
        </button>
      </div>
      {showModal && <UserAddress closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default CartTotalPrice;
