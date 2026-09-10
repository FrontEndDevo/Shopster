import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actAuthRegister, clearAuth } from "@/store/auth/authSlice";
import { useCheckEmailAvailability } from "@/hooks/";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  type TRegistrationInputs,
} from "@/validation/SignUpSchema";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors: formErrors },
  } = useForm<TRegistrationInputs>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  // Email Availability:
  const {
    enteredEmail,
    emailAvailabilityStatus,
    handleCheckEmailAvailability,
    handleResetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  useEffect(() => {
    // Redirect the user to home page if he tries to access Register page.
    if (token) navigate("/");

    // Clear auth (loading and error) when component unmount:
    return () => {
      dispatch(clearAuth());
    };
  }, [dispatch, navigate, token]);

  const handleSubmitForm: SubmitHandler<TRegistrationInputs> = (data) => {
    // API needs the full name in one shot.
    const name = `${data.firstName} ${data.lastName}`;
    // API has attribute called rePassword not confirmPassword like us.
    const rePassword = data.confirmPasaword;

    const { email, password } = data;
    dispatch(actAuthRegister({ name, email, password, rePassword }))
      .unwrap()
      .then(() => navigate("/"));
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

    // Check if the email is not empty & valid.
    if (isDirty && !invalid && value !== enteredEmail)
      handleCheckEmailAvailability(value);
  };
  return {
    loading,
    error,
    emailAvailabilityStatus,
    formErrors,
    register,
    handleSubmit,
    handleSubmitForm,
    handleEmailOnBlur,
  };
};

export default useRegister;
