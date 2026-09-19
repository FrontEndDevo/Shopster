import { z } from "zod";

const passwordRegularExpression =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.email(),
    password: z.string().regex(passwordRegularExpression, {
      message: "Password must contains at least 1 special character.",
    }),
    confirmPasaword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((input) => input.password === input.confirmPasaword, {
    message: "Passwords do not match.",
    path: ["confirmPasaword"],
  });

type TRegistrationInputs = z.infer<typeof signUpSchema>;

export { signUpSchema, type TRegistrationInputs };
