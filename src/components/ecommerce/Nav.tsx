// React Router Components:
import { NavLink } from "react-router-dom";

// Components:
import ProfileDropdown from "../feedback/ProfileDropdown";

// Flowbite ui:
import { NavbarCollapse } from "flowbite-react";

const Nav = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-amber-300 font-bold" : "text-white hover:text-amber-300";
  return (
    <NavbarCollapse className="w-full md:w-auto mt-4 md:mt-0">
      <ul className="flex flex-col md:flex-row md:items-center md:gap-6 py-2 rounded-lg bg-gray-900/95 md:bg-transparent p-4 md:p-0 gap-3">
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

        <li className="pt-2 border-t border-gray-700 md:hidden flex items-center justify-between">
          <span className="text-sm text-gray-300">Account Settings</span>
          <ProfileDropdown />
        </li>
      </ul>
    </NavbarCollapse>
  );
};

export default Nav;
