import { Link } from "react-router-dom";
import type { TProducts } from "../../types/products";

const Product = ({ id, title, img, price, cat_prefix }: TProducts) => {
  return (
    <Link to="/">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>{price}</p>
      <button>Add to cart</button>
    </Link>
  );
};

export default Product;
