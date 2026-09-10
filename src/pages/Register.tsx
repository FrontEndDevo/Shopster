import Input from "@/components/forms/Input";
import Heading from "@/components/common/Heading";
import { useRegister } from "@/hooks";

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
    <>
      <Heading title="Register" />
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

        <div className="flex items-center justify-between">
          <button
            className="font-semibold text-white py-2 px-6 my-2 cursor-pointer bg-blue-600 rounded transition duration-200 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-default"
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
    </>
  );
};
export default Register;
