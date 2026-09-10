import { actAddUserAddress } from "@/store/auth/addressSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UserAddressSchema,
  type TUserAddressInputs,
} from "@/validation/UserAddressSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

type TUserAddressHookProps = {
  closeModal: () => void;
};

const useAddress = ({ closeModal }: TUserAddressHookProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.address);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<TUserAddressInputs>({
    mode: "onBlur",
    resolver: zodResolver(UserAddressSchema),
  });

  const handleLoginForm: SubmitHandler<TUserAddressInputs> = (data) => {
    dispatch(actAddUserAddress(data))
      .unwrap()
      .then(() => closeModal())
      .catch(() => closeModal());
  };
  return {
    loading,
    error,
    formErrors,
    register,
    handleSubmit,
    handleLoginForm,
  };
};

export default useAddress;
