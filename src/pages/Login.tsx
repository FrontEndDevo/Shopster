import { useLogin } from "@/hooks";
import Input from "@/components/forms/Input";
import loginIcon from "../assets/images/login-img.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    loading,
    error,
    register,
    handleSubmit,
    formErrors,
    handleLoginForm,
  } = useLogin();

  return (
    <div className="bg-white relative h-screen w-full overflow-hidden flex flex-row-reverse items-center gap-10 justify-center lg:justify-start">
      <div className="w-full max-w-md mx-4 lg:mr-20 xl:mr-20 2xl:mr-60 border-2 border-blue-300 border-dashed py-10 shadow-2xl px-6 rounded-3xl">
        <h2 className="text-neutral-800 font-bold text-4xl text-start mb-6">
          Sign in
        </h2>

        <form onSubmit={handleSubmit(handleLoginForm)}>
          <Input
            label="Email"
            type="email"
            name="email"
            register={register}
            error={formErrors.email?.message as string}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            register={register}
            error={formErrors.password?.message as string}
          />

          <div className="flex items-center justify-between">
            <button
              className="w-full font-semibold text-white py-2 px-6 my-2 cursor-pointer bg-blue-500 rounded transition duration-200 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-default"
              type="submit"
              disabled={loading === "pending" || loading === "succeeded"}
            >
              {loading === "pending" ? "Logining..." : "Login"}
            </button>
          </div>

          {error && loading === "failed" && (
            <p className="text-sm font-semibold text-red-600 my-2">{error}</p>
          )}
        </form>
        <div className="flex gap-1 justify-center items-center mt-6 text-sm">
          <p>Don't have an account yet?</p>
          <Link
            className="text-blue-600 font-semibold hover:text-blue-700 transition duration-200"
            to="/register"
          >
            Register for free
          </Link>
        </div>
      </div>

      <img
        src={loginIcon}
        alt="login-page"
        className="absolute inset-0 h-full hidden lg:block lg:w-1/3 xl:w-1/2 object-cover object-[center_15%]"
      />
    </div>
  );
};
export default Login;
