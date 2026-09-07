import type { TProducts } from "@/types";
import CartItem from "./CartItem";

export type TCartItemListProps = { products: TProducts[] };

const CartItemList = ({ products }: TCartItemListProps) => {
  return (
    <div>
      <div className="border-b py-4 grid grid-cols-12 items-center font-semibold">
        <p className="col-span-8 md:col-span-8 text-left">Product</p>
        <p className="col-span-3 md:col-span-2 md:block hidden">Quantity</p>
        <p className="col-span-1 md:block hidden">Subtotal</p>
      </div>
      {products.map((el) => (
        <CartItem key={el.id} {...el} />
      ))}
    </div>
  );
};

export default CartItemList;
