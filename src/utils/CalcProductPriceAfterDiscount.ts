type TProductPriceResult = {
  price: number;
  priceAfterDiscount?: number;
};

function CalcProductPriceAfterDiscount({
  price,
  priceAfterDiscount,
}: TProductPriceResult) {
  // Check first if this product has a discount:
  const hasDiscount =
    (priceAfterDiscount !== undefined || priceAfterDiscount != null) &&
    priceAfterDiscount < price;

  // Calculate the discount:
  const discount = hasDiscount ? price - priceAfterDiscount : 0;

  // Handle the discount to render it:
  const finalDiscount = discount > 0 ? discount.toFixed(2) : "";

  // Handle the price of product:
  const finalPrice =
    hasDiscount && discount > 0
      ? priceAfterDiscount.toFixed(2)
      : price.toFixed(2);

  return { finalPrice, finalDiscount };
}

export default CalcProductPriceAfterDiscount;
