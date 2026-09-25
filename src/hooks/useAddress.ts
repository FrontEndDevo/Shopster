// Redux Actions:
import { actAddUserAddress } from "@/store/auth/addressSlice";

// Redux Hooks:
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Validation:
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserAddressSchema,
  type TUserAddressInputs,
} from "@/validation/UserAddressSchema";

// Toast:
import toast from "react-hot-toast";

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
    toast
      .promise(dispatch(actAddUserAddress(data)).unwrap(), {
        loading: "Adding new address.",
        success: "Address added successfully.",
        error: "Failed to add address.",
      })
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
