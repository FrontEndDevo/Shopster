import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetLoggedUserCart } from "@/store/cart/cartSlice";
import { actGetWishlist } from "@/store/wishlist/wishlistSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(actGetWishlist("productsIds"));
      dispatch(actGetLoggedUserCart());
    }
  }, [dispatch, token]);

  return <div>Home</div>;
};

export default Home;
