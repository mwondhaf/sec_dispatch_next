import { z } from "zod";

export const incidentTypeSchema = z.object({
  name: z.string(),
});
