"use server";

import { IncidentType } from "@/typings";
import { deleteData, fetchData, patchData, postData } from "../fetch-helper";
import { z } from "zod";
import { incidentTypeSchema } from "@/lib/schemas/create-incident-type-schema";
import { revalidatePath } from "next/cache";

export const getAllIncidentTypes = async () => {
  try {
    let response: IncidentType[] = await fetchData("incident-types");
    return response;
  } catch (error) {
    return [];
  }
};

/// Creating a new incident type
// const incidentTypeSchema = incidentTypeSchema.omit({
//   incidentTypeId: true,
// });

type IncidentTypeInput = z.infer<typeof incidentTypeSchema>;

export const createIncidentType = async (data: IncidentTypeInput) => {
  const result = incidentTypeSchema.safeParse(data);

  if (result.success) {
    let response = await postData("incident-types", data);

    revalidatePath("/settings/incident-types");

    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

/// Updating an incident type
export const updateIncidentType = async (
  id: string,
  data: IncidentTypeInput,
) => {
  const result = incidentTypeSchema.safeParse(data);

  if (result.success) {
    let response = await patchData(`incident-types/${id}`, data);

    revalidatePath("/settings/incident-types");

    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

/// Deleting an incident type
export const deleteIncidentType = async (id: string) => {
  try {
    await deleteData(`incident-types/${id}`);
    revalidatePath("/settings/incident-types");
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong");
  }
};
