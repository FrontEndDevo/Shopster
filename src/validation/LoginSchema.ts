import { z } from "zod";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {
    message: "Password must contains at least 8 characters.",
  }),
});

type TLoginInputs = z.infer<typeof LoginSchema>;

export { LoginSchema, type TLoginInputs };
