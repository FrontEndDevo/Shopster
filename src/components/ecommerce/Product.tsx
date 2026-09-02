import { Link } from "react-router-dom";
import type { TProducts } from "../../types/products";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cart/cartSlice";

const Product = ({ id, title, img, price }: TProducts) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };

  return (
    <Link to="/">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>{price}</p>
      <button onClick={handleAddToCart}>Add to cart</button>
    </Link>
  );
};

export default Product;
