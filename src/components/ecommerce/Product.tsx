import { Link } from "react-router-dom";
import type { TProducts } from "@/types/products";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cart/cartSlice";

const Product = ({ id, title, imageCover, price, quantity }: TProducts) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };

  return (
    <Link to="/">
      <img src={imageCover} alt={title} />
      <h2>{title}</h2>
      <p>{price}</p>
      <span>{quantity}</span>
      <button onClick={handleAddToCart}>Add to cart</button>
    </Link>
  );
};

export default Product;
