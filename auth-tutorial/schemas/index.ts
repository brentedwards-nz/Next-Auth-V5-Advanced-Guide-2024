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
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({
    message: "Email is required",
  }),
  confirmEmail: z.string().email({
    message: "Confirm Email is required",
  }),
  password: z.string().min(6, { message: "Password not long enough" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm Password not long enough" }),
});
