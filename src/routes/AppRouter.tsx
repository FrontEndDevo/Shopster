import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="categories" element={<Categories />} />
      <Route path="products" element={<Products />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route errorElement={<h1>Error</h1>} />
    </Routes>
  );
};

export default AppRouter;
