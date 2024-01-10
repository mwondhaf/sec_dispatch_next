import { z } from "zod";

export const personSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter a valid name with at least 2 characters",
  }),

  email: z.string().email({ message: "Please enter a valid email address" }),

  companyId: z.string().refine((data) => data.trim().length > 0, {
    message: "Select Company",
  }),

  employeeType: z.string().refine((data) => data.trim().length > 0, {
    message: "Employee type is required",
  }),

  idNumber: z.string().refine((data) => data.trim().length > 0, {
    message: "ID number is required",
  }),

  isActive: z.boolean(),
  role: z.string(),

  // password field
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),

  // used to create profile
  entityId: z.string().refine((data) => data.trim().length > 0, {
    message: "Entity is required",
  }),

  userEmail: z
    .string()
    .email({ message: "Please enter a valid user email address" })
    .refine((data) => data.trim().length > 0, {
      message: "User email is required",
    }),
});
