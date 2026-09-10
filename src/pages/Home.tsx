import actGetWishlist from "@/store/actions/actGetWishlist";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) dispatch(actGetWishlist("productsIds"));
  }, [dispatch, token]);

  return <div>Home</div>;
};

export default Home;
