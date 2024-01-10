import { z } from "zod";

export const loginSchema = z.object({
  idNumber: z.string().min(2, { message: "Please enter a valid ID number" }),
  password: z.string().min(2, { message: "Please enter a valid password" }),
});
