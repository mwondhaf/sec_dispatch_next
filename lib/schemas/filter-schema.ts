import { z } from "zod";

export const filterSchema = z.object({
  start_date: z.date().optional(),
  start_time: z.string().optional(),
  end_date: z.date().optional(),
  end_time: z.string().optional(),
  search: z.string().optional(),
  severity: z.string().optional(),
  cat_id: z.string().optional(),
  cat_type_id: z.string().optional(),
  involved_nationality: z.string().optional(),
  involved_name: z.string().optional(),
  involved_dept: z.string().optional(),
  involved_id: z.string().optional(),
  reporter_dept: z.string().optional(),
  reporter_name: z.string().optional(),
  compiler_email: z.string().optional(),
});
