import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import Cart from "@/assets/cart.svg?react";
import Wishlist from "@/assets/wishlist.svg?react";
import Shopster from "@/assets/Shopster.svg?react";
import HeaderBadgeItem from "../feedback/HeaderBadgeItem";
import { getTotalCartQuantitySelector } from "@/store/selectors";
import ProfileDropdown from "../feedback/ProfileDropdown";

import { Navbar, NavbarToggle } from "flowbite-react";
import Nav from "../ecommerce/Nav";

const Header = () => {
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector(getTotalCartQuantitySelector);
  const totalProducts = useAppSelector(
    (state) => state.wishlist.productsIds.length,
  );

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

        <div className="flex items-center gap-4 md:order-2">
          <div className="flex gap-3 md:gap-6 items-center justify-center">
            <HeaderBadgeItem
              label="wishlist"
              count={token ? totalProducts : 0}
              icon={Wishlist}
            />

            <span className="w-0.5 h-6 md:h-10 bg-gray-600" />

            <HeaderBadgeItem
              label="cart"
              count={token ? totalQuantity : 0}
              icon={Cart}
            />

            <span className="w-0.5 h-6 md:h-10 bg-gray-600" />

            <div className="flex items-center gap-1">
              <div className="hidden md:block">
                <ProfileDropdown />
              </div>
              <NavbarToggle className="text-white hover:bg-gray-700/50 focus:ring-gray-600" />
            </div>
          </div>
        </div>

        <Nav />
      </Navbar>
    </header>
  );
};

export default Header;
