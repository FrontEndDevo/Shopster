import { useNavigate } from "react-router-dom";
import Shopster from "@/assets/Shopster.svg?react";

import { Navbar } from "flowbite-react";
import Nav from "../ecommerce/Nav";
import NavIcons from "../ecommerce/NavIcons";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <Navbar fluid rounded>
        <div
          onClick={() => navigate("/")}
          className="flex justify-center items-center cursor-pointer"
        >
          <Shopster className="w-10 h-10 rotate-3 mr-3 text-amber-300" />
          <span className="italic self-center whitespace-nowrap text-xl font-semibold text-white">
            Shopster
          </span>
        </div>

        <NavIcons />

        <Nav />
      </Navbar>
    </header>
  );
};

export default Header;
