"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchData, postData, deleteData, patchData } from "../fetch-helper";
import { Entity, User } from "@/typings";
import { entitySchema } from "@/lib/schemas/create-entity-schema";

type CreateEntityInput = z.infer<typeof entitySchema>;

export const createEntity = async (data: CreateEntityInput) => {
  const result = entitySchema.safeParse(data);

  if (result.success) {
    let response = await postData("organisations", result.data);

    revalidatePath("/settings/entities");
    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const updateEntity = async (id: string, data: Omit<Entity, "id">) => {
  const result = entitySchema.safeParse(data);

  if (result.success) {
    let response = await patchData(`organisations/${id}`, data);

    revalidatePath("/settings/entities");
    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const getAllEntities = async (): Promise<Entity[]> => {
  try {
    let response: Entity[] = await fetchData("organisations");
    return response;
  } catch (error) {
    return [];
  }
};

export const deleteEntity = async (id: string) => {
  try {
    await deleteData(`organisations/${id}`);
    revalidatePath("/settings/entities");
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong");
  }
};
