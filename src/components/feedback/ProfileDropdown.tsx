import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authLogout } from "@/store/auth/authSlice";
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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
    <>
      {token ? (
        <Dropdown label="Dropdown button" color={"gray"}>
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
        <div className="flex gap-2">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
