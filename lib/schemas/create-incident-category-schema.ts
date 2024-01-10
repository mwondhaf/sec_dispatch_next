import { z } from "zod";

export const incidentCategorySchema = z.object({
  name: z.string(),
  incidentTypeId: z.string().min(1),
});
