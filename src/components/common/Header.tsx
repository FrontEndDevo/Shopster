import { Link } from "react-router-dom";
import ShoppingCart from "../ecommerce/ShoppingCart";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center mb-4">
        eCommerce App
        <ShoppingCart />
      </div>

      <div className="flex justify-between items-center bg-neutral-700 text-white p-2">
        <ul className="flex gap-2">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
        </ul>
        <div className="flex gap-2">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
