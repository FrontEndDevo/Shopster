import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetLoggedUserCart } from "@/store/cart/cartSlice";
import { actGetWishlist } from "@/store/wishlist/wishlistSlice";
import Hero from "../assets/images/hero.jpg";

const Home = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(actGetWishlist("productsIds"));
      dispatch(actGetLoggedUserCart());
    }
  }, [dispatch, token]);

  return (
    <div className="h-screen w-full overflow-hidden">
      <img
        src={Hero}
        alt="hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 flex h-full items-center justify-start mx-10 text-white">
        <div className="flex items-center justify-center flex-col gap-10 lg:gap-20">
          <div>
            <h2 className="text-4xl mb-4 lg:mb-8 md:text-5xl lg:text-6xl xl:text-7xl font-extrabold">
              Brand New Collection
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
              Explore our collection designed to move you
            </p>
          </div>
          <button className="bg-blue-600 py-2 px-6 transition duration-150 rounded hover:bg-blue-800 cursor-pointer text-base md:text-lg lg:text-xl font-bold font-mono italic">
            Explore Now
          </button>
        </div>
      </div>

      <section className="min-h-screen bg-white p-10">
        <h2 className="text-3xl font-bold">Next Section</h2>
      </section>
    </div>
  );
};

export default Home;
