// Validation:
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

// Types:
import type { TEmailAvailabilityStatus } from "@/types";

type TInputProps<TFieldValue extends FieldValues> = {
  label?: string;
  name: Path<TFieldValue>;
  type?: string;
  error: string;
  register: UseFormRegister<TFieldValue>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  emailStatus?: TEmailAvailabilityStatus;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  error,
  register,
  onBlur,
  emailStatus,
}: TInputProps<TFieldValue>) => {
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
    register(name).onBlur(e);
  };

  // Tailwind Classes to keep JSX more lean.
  const containerClasses = "mb-2 py-2 border-dashed relative";

  const inputClasses =
    "block w-full px-4 py-2 duration-200 transition bg-neutral-100 border border-gray-300 focus:outline-none text-sm rounded-sm placeholder:text-body";

  const labelClasses =
    "text-start block mb-1 text-sm font-semibold text-heading";

  const errorClasses = "text-sm text-red-600 mt-2 text-start";

  const emailAvailabilityClasses =
    emailStatus === "available"
      ? "text-green-500"
      : emailStatus === "checking"
        ? "text-gray-500"
        : emailStatus === "failed" || emailStatus === "notAvailable"
          ? "text-red-500"
          : "";

  return (
    <div className={containerClasses}>
      <label className={labelClasses}>{label}</label>
      <input
        type={type}
        {...register(name)}
        onBlur={handleOnBlur}
        placeholder={label}
        className={`${inputClasses} ${error ? "border-red-500" : ""}`}
        disabled={emailStatus === "checking"}
      />
      <p className={errorClasses}>{error}</p>
      <p
        className={`absolute bottom-6 right-1 text-sm ${emailAvailabilityClasses}`}
      >
        {emailStatus !== "idle" && emailStatus}
      </p>
    </div>
  );
};

export default Input;
