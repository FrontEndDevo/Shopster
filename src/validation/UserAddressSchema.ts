import { z } from "zod";

const UserAddressSchema = z.object({
  details: z.string().min(1, { message: "Address is required." }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be more than 11 digits." }),
  city: z.string().min(1, { message: "City is required." }),
});

type TUserAddressInputs = z.infer<typeof UserAddressSchema>;

export { UserAddressSchema, type TUserAddressInputs };
