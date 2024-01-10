"use server";

import { IncidentCategory } from "@/typings";
import { deleteData, fetchData, patchData, postData } from "../fetch-helper";
import { z } from "zod";
import { incidentTypeSchema } from "@/lib/schemas/create-incident-type-schema";
import { revalidatePath } from "next/cache";
import { incidentCategorySchema } from "@/lib/schemas/create-incident-category-schema";

export const getAllIncidentCategories = async () => {
  try {
    let response: IncidentCategory[] = await fetchData("incident-categories");

    return response;
  } catch (error) {
    return [];
  }
};

/// Creating an incident category

type IncidentCategoryInput = z.infer<typeof incidentCategorySchema>;

export const createIncidentCategory = async (data: IncidentCategoryInput) => {
  const result = incidentCategorySchema.safeParse(data);

  if (result.success) {
    let result = await postData("incident-categories", data);
    if (!result.error) {
      revalidatePath("/settings/incident-categories");
    }

    return result;
  } else {
    return { success: false, error: result.error.format() };
  }
};

/// Updating an incident category
export const updateIncidentCategory = async (
  id: string,
  data: IncidentCategoryInput,
) => {
  const result = incidentTypeSchema.safeParse(data);

  if (result.success) {
    let response = await patchData(`incident-categories/${id}`, data);

    revalidatePath("/settings/categories");

    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

/// Deleting an incident category
export const deleteIncidentCategory = async (id: string) => {
  try {
    await deleteData(`incident-categories/${id}`);
    revalidatePath("/settings/incident-categories");
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong");
  }
};
