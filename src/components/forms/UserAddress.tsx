// Components:
import Input from "@/components/forms/Input";

// Custom Hooks:
import useAddress from "@/hooks/useAddress";

type TUserAddressProps = {
  closeModal: () => void;
};

const UserAddress = ({ closeModal }: TUserAddressProps) => {
  const {
    loading,
    error,
    formErrors,
    register,
    handleSubmit,
    handleLoginForm,
  } = useAddress({
    closeModal,
  });

  // Tailwind Classes:
  const buttonClasses =
    "rounded-sm disabled:cursor-default disabled:bg-gray-300 hover:shadow-lg transition duration-150 py-2 px-6 font-semibold italic text-lg cursor-pointer";
  return (
    <form
      className="sticky top-1/3 my-2 border border-gray-200 rounded-sm p-2"
      onSubmit={handleSubmit(handleLoginForm)}
    >
      <Input
        label="Details"
        name="details"
        register={register}
        error={formErrors.details?.message as string}
      />
      <Input
        label="Phone Number"
        name="phone"
        register={register}
        error={formErrors.phone?.message as string}
      />
      <Input
        label="City"
        name="city"
        register={register}
        error={formErrors.city?.message as string}
      />
      <div className="flex justify-center text-white items-center gap-4">
        <button
          disabled={loading === "pending"}
          onClick={() => closeModal()}
          className={`${buttonClasses} bg-red-600 hover:shadow-red-400`}
        >
          Close
        </button>
        <button
          disabled={loading === "pending"}
          className={`${buttonClasses} bg-blue-600 hover:shadow-blue-400`}
        >
          {loading === "pending" ? "Saving..." : "Save"}
        </button>
      </div>
      {error && loading === "failed" && (
        <p className="text-sm font-semibold text-red-600 my-2">{error}</p>
      )}
    </form>
  );
};

export default UserAddress;
