import type { TCartItemListProps } from "@/components/ecommerce/CartItem/CartItemList";
import CalcProductPriceAfterDiscount from "./CalcProductPriceAfterDiscount";

function CalcCartTotalPrice({ products }: TCartItemListProps) {
  const { totalPrices, totalDiscounts } = products.reduce(
    (acc, el) => {
      const { finalPrice, finalDiscount } = CalcProductPriceAfterDiscount({
        price: el.price,
        priceAfterDiscount: el.product.priceAfterDiscount,
      });

      if (el.count && typeof el.count === "number") {
        return {
          totalPrices: acc.totalPrices + +finalPrice * el.count,
          totalDiscounts: acc.totalDiscounts + +finalDiscount * el.count,
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
