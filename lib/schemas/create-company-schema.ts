import { z } from "zod";

export const companySchema = z.object({
  name: z.string(),
  workScope: z.string().optional(),
  trade_license_number: z.string(),
});
