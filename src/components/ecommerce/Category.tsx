import { Link } from "react-router-dom";
import type { TCategory } from "../../types/category";

const Category = ({ title, img }: TCategory) => {
  return (
    <Link to="/">
      <img src={img} alt={title} />
      <h2>{title}</h2>
    </Link>
  );
};

export default Category;
