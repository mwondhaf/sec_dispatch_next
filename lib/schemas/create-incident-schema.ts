import { z } from "zod";

const severityEnum = z.enum(["High", "Medium", "Low"]);

export const incidentSchema = z.object({
  severity: severityEnum.optional().nullable().default("Low"),
  description: z.string().trim(),
  location: z.string().trim(),

  investigation: z.string().trim(),
  incidentCategoryId: z.string().trim(),
  // occurrenceTime: z.coerce.date().optional(),
  incidentTime: z.string().optional(),
  incidentClosedTime: z.string().optional(),

  entityId: z.string().optional(),

  compilerEmail: z.string().optional(),
  editorEmail: z.string().optional(),

  reporterName: z.string().trim(),
  occurrenceDate: z.date().optional(),
  time: z.string(),

  closureDate: z.date().optional(),
  closureTime: z.string().optional(),

  departmentId: z.string(),
  referenceNumber: z.string().optional(),
});
