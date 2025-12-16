import { z } from "zod";

const signupSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 8 characters long" }),
  // confirmPassword: z.string().min(3, {
  //   message: "Confirm password must be at least 8 characters long",
  // }),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password is required" }),
});

export { signupSchema, loginSchema };
