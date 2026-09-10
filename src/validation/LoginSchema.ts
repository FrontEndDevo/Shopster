import { z } from "zod";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

type TLoginInputs = z.infer<typeof LoginSchema>;

export { LoginSchema, type TLoginInputs };
