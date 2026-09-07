import { useAppSelector } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";
import Cart from "@/assets/cart.svg?react";
import Wishlist from "@/assets/wishlist.svg?react";
import Shopster from "@/assets/Shopster.svg?react";
import HeaderBadgeItem from "../feedback/HeaderBadgeItem";
import { getTotalCartQuantitySelector } from "@/store/selectors";
const Header = () => {
  const totalQuantity = useAppSelector(getTotalCartQuantitySelector);
  const totalProducts = useAppSelector(
    (state) => state.wishlist.productsIds.length,
  );

  const navigate = useNavigate();
  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center flex-col">
          <Shopster
            className="w-10 h-10 rotate-3"
            onClick={() => navigate("/")}
          />
          <h1 className="italic text-xl font-semibold text-mist-900">
            Shopster
          </h1>
        </div>
        <div className="flex gap-6 items-center justify-center">
          <HeaderBadgeItem
            label="wishlist"
            count={totalProducts}
            icon={Wishlist}
          />
          <span className="w-0.5 h-10 bg-gray-600" />
          <HeaderBadgeItem label="cart" count={totalQuantity} icon={Cart} />
        </div>
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
