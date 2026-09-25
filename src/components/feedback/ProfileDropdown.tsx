// Redux Hooks:
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Redux Actions:
import { authLogout } from "@/store/auth/authSlice";

// Flowbite ui:
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

// React Router:
import { Link, useNavigate } from "react-router-dom";

// Toast:
import toast from "react-hot-toast";

// Images:
import UserIcon from "@/assets/user.svg?react";

const ProfileDropdown = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, token } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/login");
    toast.success("Logout successfully.");
  };

  return (
    <div className="flex md:order-2">
      {token ? (
        <Dropdown
          arrowIcon={false}
          inline
          renderTrigger={() => (
            <button
              type="button"
              className="p-1 cursor-pointer text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors focus:outline-none"
              aria-label="User menu"
            >
              <UserIcon className="w-8 h-8" />
            </button>
          )}
        >
          <DropdownHeader>
            <h3 className="block text-sm text-amber-300 animate-pulse transition duration-150 font-bold capitalize text-start">
              {user?.name}
            </h3>
            <p className="block truncate text-sm font-medium">{user?.email}</p>
          </DropdownHeader>

          <DropdownItem onClick={() => navigate("/profile")}>
            Profile
          </DropdownItem>
          <DropdownItem onClick={() => navigate("/orders")}>
            Orders
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>
      ) : (
        <div className="flex items-center gap-4 text-white font-semibold">
          <Link className="hover:text-amber-300" to="/login">
            Login
          </Link>
          <span className="w-0.5 h-10 bg-gray-600" />
          <Link className="hover:text-amber-300" to="/register">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
