import { Link } from "react-router-dom";
import ShoppingCart from "@/components/ecommerce/ShoppingCart";
import Shopster from "@/assets/Shopster.svg?react";
const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-center items-center flex-col">
          <Shopster className="w-10 h-10 rotate-3" />
          <h1 className="italic text-xl font-semibold text-mist-900">
            Shopster
          </h1>
        </div>
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
