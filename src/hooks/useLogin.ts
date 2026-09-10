import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type TLoginInputs } from "@/validation/LoginSchema";
import { actAuthLogin, clearAuth } from "@/store/auth/authSlice";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<TLoginInputs>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    // Redirect the user to home page if he tries to access Login page.
    if (token) navigate("/");

    // Clear auth (loading and error) when component unmount:
    return () => {
      dispatch(clearAuth());
    };
  }, [dispatch, navigate, token]);

  const handleLoginForm: SubmitHandler<TLoginInputs> = (data) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  return {
    loading,
    error,
    register,
    handleSubmit,
    formErrors,
    handleLoginForm,
  };
};

export default useLogin;
