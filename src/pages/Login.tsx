import Input from "@/components/forms/Input";
import Heading from "@/components/common/Heading";
import { useLogin } from "@/hooks";

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Heading title="Log in" />
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

          <button
            className="font-semibold text-white py-2 px-6 my-2 cursor-pointer bg-blue-600 rounded transition duration-200 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-default"
            type="submit"
            disabled={loading === "pending" || loading === "succeeded"}
          >
            {loading === "pending" ? "Logining..." : "Login"}
          </button>

          {error && loading === "failed" && (
            <p className="text-sm font-semibold text-red-600 my-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};
export default Login;
