import type { TEmailAvailabilityStatus } from "@/types";
import type { TUser } from "@/types/auth.types";
import axios from "axios";
import { useState } from "react";

const USERS_API = import.meta.env.VITE_ECOMMERCE_API;

type TUsersResponseForEmailCheck = {
  users: TUser[];
};

function useCheckEmailAvailability() {
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TEmailAvailabilityStatus>("idle");

  const handleCheckEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    try {
      // Checking...
      setEmailAvailabilityStatus("checking");
      // Sadly, this is the only endpoint I can use to access users.
      const response = await axios.get<TUsersResponseForEmailCheck>(
        `${USERS_API}/users`,
      );

      // Check if the email input is already registered.
      const findEmail = await response.data.users.filter(
        (user) => user.email === email,
      );

      if (findEmail.length === 0) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
      console.log(error);
    }
  };

  const handleResetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  };

  return {
    enteredEmail,
    emailAvailabilityStatus,
    handleCheckEmailAvailability,
    handleResetCheckEmailAvailability,
  };
}

export default useCheckEmailAvailability;
