import { useMemo, useState } from "react";
import type { TCartItemListProps } from "./CartItemList";
import CalcCartTotalPrice from "@/utils/CalcCartTotalPrice";

const CartTotalPrice = ({ products }: TCartItemListProps) => {
  const [isPurchase, setIsPurchase] = useState(false);

  const handleCartPurchase = () => {
    // Do something here:
    setIsPurchase(true);
  };

  // I used useMemo to prevent calling this heavy function again in vain.
  const { totalPrices, totalDiscounts } = useMemo(
    () => CalcCartTotalPrice({ products }),
    [products],
  );

  return (
    <div className="sticky top-8 bg-white rounded border-2 border-gray-200 flex flex-col gap-8 h-fit items-start p-8">
      <h4 className="text-xl font-semibold">Cart total</h4>

      <div className="w-full py-2">
        <div className="flex justify-between border-dashed border-b items-center gap-2 my-2">
          <p className="font-semibold text-lg text-neutral-500 capitalize">
            Total:
          </p>
          <span className="text-green-700 font-semibold text-lg">
            ${totalPrices.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-500">
          You saved{" "}
          <span className="line-through text-green-700 font-semibold">
            ${totalDiscounts.toFixed(2)}
          </span>{" "}
          overall
        </p>
      </div>

      <button
        disabled={isPurchase}
        className="font-semibold text-lg bg-red-500 py-1 px-3 mx-auto rounded text-white transition duration-100 hover:bg-red-600 cursor-pointer disabled:bg-red-300 disabled:cursor-default"
        onClick={handleCartPurchase}
      >
        Procced to checkout
      </button>
    </div>
  );
};

export default CartTotalPrice;
