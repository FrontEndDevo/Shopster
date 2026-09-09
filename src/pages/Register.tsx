import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  type TRegistrationInputs,
} from "@/validation/SignUpSchema";
import Input from "@/components/forms/Input";
import Heading from "@/components/common/Heading";
import useCheckEmailAvailability from "@/hooks/useCheckEmailAvailability";

const Register = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<TRegistrationInputs>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const {
    enteredEmail,
    emailAvailabilityStatus,
    handleCheckEmailAvailability,
    handleResetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const handleSubmitForm: SubmitHandler<TRegistrationInputs> = (data) => {
    console.log(data);
  };

  const handleEmailOnBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    // To trigger inpurt validation manually without submitting.
    await trigger("email");

    const value = e.target.value;
    // isDirty gives true if the input not empty, invalid gives true is the input is not valid.
    const { isDirty, invalid } = getFieldState("email");

    // Check if the user exist the email input and return again, in this case We must clear the valuse
    if (enteredEmail && isDirty && invalid) {
      handleResetCheckEmailAvailability();
    }

    // Check if the email is not empty & valid & not equal to the previous written email.
    if (isDirty && !invalid) handleCheckEmailAvailability(value);
  };

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
          error={errors.firstName?.message as string}
          register={register}
        />

        <Input
          label="Last Name"
          name="lastName"
          type="text"
          error={errors.lastName?.message as string}
          register={register}
        />

        <Input
          label="Your email"
          name="email"
          type="email"
          error={errors.email?.message as string}
          register={register}
          onBlur={handleEmailOnBlur}
          emailStatus={emailAvailabilityStatus}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          error={errors.password?.message as string}
          register={register}
        />

        <Input
          label="Confirm Password"
          name="confirmPasaword"
          type="password"
          error={errors.confirmPasaword?.message as string}
          register={register}
        />

        <button
          className="font-semibold text-white py-2 px-6 my-2 cursor-pointer bg-blue-600 rounded transition duration-200 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-default"
          type="submit"
          disabled={
            emailAvailabilityStatus === "checking" ||
            emailAvailabilityStatus === "notAvailable" ||
            emailAvailabilityStatus === "failed"
          }
        >
          Sign Up
        </button>
      </form>
    </>
  );
};
export default Register;
