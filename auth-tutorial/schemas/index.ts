import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, {
      message: "Password is required",
    }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  confirmEmail: z.string().email(),
  password: z.string().min(6),
  consfirmPassword: z.string().min(6),
});
