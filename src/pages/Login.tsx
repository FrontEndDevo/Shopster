import Heading from "@/components/common/Heading";
import Input from "@/components/forms/Input";
import { LoginSchema, type TLoginInputs } from "@/validation/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginInputs>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const handleLoginForm: SubmitHandler<TLoginInputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Heading title="Log in"/>
      <form onSubmit={handleSubmit(handleLoginForm)}>
        <Input
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email?.message as string}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password?.message as string}
        />

        <button
          className="font-semibold text-white py-2 px-6 my-2 cursor-pointer bg-blue-600 rounded transition duration-200 hover:bg-blue-800"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};
export default Login;
