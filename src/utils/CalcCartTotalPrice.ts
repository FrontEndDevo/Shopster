import type { TCartItemListProps } from "@/components/ecommerce/CartItem/CartItemList";
import CalcProductPriceAfterDiscount from "./CalcProductPriceAfterDiscount";

function CalcCartTotalPrice({ products }: TCartItemListProps) {
  const { totalPrices, totalDiscounts } = products.reduce(
    (acc, el) => {
      const { finalPrice, finalDiscount } = CalcProductPriceAfterDiscount({
        price: el.price,
        priceAfterDiscount: el.priceAfterDiscount,
      });

      if (el.amount && typeof el.amount === "number") {
        return {
          totalPrices: acc.totalPrices + +finalPrice * el.amount,
          totalDiscounts: acc.totalDiscounts + +finalDiscount * el.amount,
        };
      } else {
        return {
          totalPrices: acc.totalPrices,
          totalDiscounts: acc.totalDiscounts,
        };
      }
    },
    { totalPrices: 0, totalDiscounts: 0 },
  );
  return { totalPrices, totalDiscounts };
}

export default CalcCartTotalPrice;
