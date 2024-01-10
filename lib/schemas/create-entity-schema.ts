import { z } from "zod";

export const entitySchema = z.object({
  name: z.string(),
  code: z.string(),
  makani: z.string(),
});
