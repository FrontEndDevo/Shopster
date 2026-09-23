import { useAppSelector } from "@/store/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import Cart from "@/assets/cart.svg?react";
import Wishlist from "@/assets/wishlist.svg?react";
import Shopster from "@/assets/Shopster.svg?react";
import HeaderBadgeItem from "../feedback/HeaderBadgeItem";
import { getTotalCartQuantitySelector } from "@/store/selectors";
import ProfileDropdown from "../feedback/ProfileDropdown";

import { Navbar } from "flowbite-react";

const Header = () => {
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector(getTotalCartQuantitySelector);
  const totalProducts = useAppSelector(
    (state) => state.wishlist.productsIds.length,
  );

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-amber-300 font-bold" : "text-white hover:text-amber-300";

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <Navbar fluid rounded>
        <div
          onClick={() => navigate("/")}
          className="flex justify-center items-center cursor-pointer"
        >
          <Shopster className="w-10 h-10 rotate-3 mr-3" />
          <span className="italic self-center whitespace-nowrap text-xl font-semibold text-white">
            Shopster
          </span>
        </div>

        <div className="flex justify-between items-center p-2">
          <ul className="flex gap-4 py-2 rounded-sm">
            <NavLink className={getNavLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={getNavLinkClass} to="/categories">
              Categories
            </NavLink>
            <NavLink className={getNavLinkClass} to="/products">
              Products
            </NavLink>
            <NavLink className={getNavLinkClass} to="/about">
              About
            </NavLink>
          </ul>
        </div>

        <div className="flex justify-between items-center px-8">
          <div className="flex gap-6 items-center justify-center">
            <HeaderBadgeItem
              label="wishlist"
              count={token ? totalProducts : 0}
              icon={Wishlist}
            />

            <span className="w-0.5 h-10 bg-gray-600" />

            <HeaderBadgeItem
              label="cart"
              count={token ? totalQuantity : 0}
              icon={Cart}
            />

            <ProfileDropdown />
            <span className="w-0.5 h-10 bg-gray-600" />
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
