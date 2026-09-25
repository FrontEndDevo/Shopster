import Cart from "@/assets/cart.svg?react";
import Wishlist from "@/assets/wishlist.svg?react";
import HeaderBadgeItem from "../feedback/HeaderBadgeItem";
import ProfileDropdown from "../feedback/ProfileDropdown";
import { useAppSelector } from "@/store/hooks";
import { getTotalCartQuantitySelector } from "@/store/selectors";
import { NavbarToggle } from "flowbite-react";

const NavIcons = () => {
  const { token } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector(getTotalCartQuantitySelector);
  const totalProducts = useAppSelector(
    (state) => state.wishlist.productsIds.length,
  );
  return (
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
  );
};

export default NavIcons;
