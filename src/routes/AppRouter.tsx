import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("@/pages/Home"));
const Categories = lazy(() => import("@/pages/Categories"));
const Products = lazy(() => import("@/pages/Products"));
const Cart = lazy(() => import("@/pages/Cart"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const About = lazy(() => import("@/pages/About"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Orders = lazy(() => import("@/pages/Orders"));
const Profile = lazy(() => import("@/pages/Profile"));
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback="Loading... please wait.">
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Suspense fallback="Loading... please wait.">
              <Cart />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Suspense fallback="Loading... please wait.">
              <Wishlist />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="categories"
        element={
          <Suspense fallback="Loading... please wait.">
            <Categories />
          </Suspense>
        }
      />
      <Route
        path="products"
        element={
          <Suspense fallback="Loading... please wait.">
            <Products />
          </Suspense>
        }
      />
      <Route
        path="about"
        element={
          <Suspense fallback="Loading... please wait.">
            <About />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback="Loading... please wait.">
            <Login />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback="Loading... please wait.">
            <Register />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Suspense fallback="Loading... please wait.">
              <Profile />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute>
            <Suspense fallback="Loading... please wait.">
              <Orders />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
