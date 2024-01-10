import { z } from "zod";

export const personInvolvedSchema = z.object({
  name: z.string(),
  identity_number: z.string().optional(),
  nationality: z.string().optional(),
  incidentReferenceNumber: z.string(),
  departmentId: z.string(),
  remarks: z.string().optional(),
});
