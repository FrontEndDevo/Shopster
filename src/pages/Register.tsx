import Input from "@/components/forms/Input";
import { useRegister } from "@/hooks";
import registerIcon from "../assets/images/register-img.jpg";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    loading,
    error,
    emailAvailabilityStatus,
    formErrors,
    register,
    handleSubmit,
    handleSubmitForm,
    handleEmailOnBlur,
  } = useRegister();

  return (
    <div className="bg-white relative h-screen w-full overflow-hidden flex flex-row-reverse items-center gap-10 justify-center lg:justify-start">
      <div className="w-full mx-4 max-w-md mt-12 md:mr-28 lg:mr-20 2xl:mr-60 border-2 border-blue-300 border-dashed py-10 shadow-2xl px-6 rounded-3xl">
        <h2 className="text-neutral-800 font-bold text-4xl text-start">
          Register
        </h2>

        <form
          className="max-w-sm mx-auto"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <Input
            label="First Name"
            name="firstName"
            type="text"
            error={formErrors.firstName?.message as string}
            register={register}
          />

          <Input
            label="Last Name"
            name="lastName"
            type="text"
            error={formErrors.lastName?.message as string}
            register={register}
          />

          <Input
            label="Your email"
            name="email"
            type="email"
            error={formErrors.email?.message as string}
            register={register}
            onBlur={handleEmailOnBlur}
            emailStatus={emailAvailabilityStatus}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            error={formErrors.password?.message as string}
            register={register}
          />

          <Input
            label="Confirm Password"
            name="confirmPasaword"
            type="password"
            error={formErrors.confirmPasaword?.message as string}
            register={register}
          />
          <div className="flex gap-1">
            <label className="text-sm font-light pt-2">
              I accept the Terms and Conditions
            </label>
            <Input
              name="terms"
              type="checkbox"
              error={formErrors.terms?.message as string}
              register={register}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="w-full font-semibold text-white py-2 px-6 my-2 cursor-pointer bg-blue-500 rounded transition duration-200 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-default"
              type="submit"
              disabled={
                emailAvailabilityStatus === "checking" ||
                emailAvailabilityStatus === "notAvailable" ||
                emailAvailabilityStatus === "failed" ||
                loading === "pending" ||
                loading === "succeeded"
              }
            >
              {loading === "pending" ? "Creating account..." : "Sign Up"}
            </button>
            {error && loading === "failed" && (
              <p className="text-sm font-semibold text-red-600 my-2">{error}</p>
            )}
          </div>
          {loading === "succeeded" && (
            <p className="text-sm font-semibold text-green-600 my-2">
              Your account was successfully created, please login now
            </p>
          )}
        </form>

        <div className="flex gap-1 justify-center items-center mt-6 text-sm">
          <p>Already have an account?</p>
          <Link
            className="text-blue-600 font-semibold hover:text-blue-700 transition duration-200"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </div>

      <img
        src={registerIcon}
        alt="register-page"
        className="absolute inset-0 h-full hidden lg:block md:w-1/3 lg:w-1/2 object-cover object-[center_15%]"
      />
    </div>
  );
};
export default Register;
