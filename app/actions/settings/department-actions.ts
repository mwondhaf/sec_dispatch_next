"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchData, postData, deleteData, patchData } from "../fetch-helper";
import { Department } from "@/typings";
import { departmentSchema } from "@/lib/schemas/create-department-schema";

type DepartmentInput = z.infer<typeof departmentSchema>;

export const createDepartment = async (data: DepartmentInput) => {
  const result = departmentSchema.safeParse(data);

  if (result.success) {
    let response = await postData("departments", data);

    revalidatePath("/settings/reporter-departments");
    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const updateDepartment = async (
  id: string,
  data: Omit<Department, "id">,
) => {
  const result = departmentSchema.safeParse(data);

  if (result.success) {
    let response = await patchData(`departments/${id}`, data);

    revalidatePath("/settings/reporter-departments");

    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const getAllDepartments = async (): Promise<Department[]> => {
  try {
    let response: Department[] = await fetchData("departments");
    return response;
  } catch (error) {
    return [];
  }
};

export const deleteDepartment = async (id: string) => {
  try {
    await deleteData(`departments/${id}`);
    revalidatePath("/settings/reporter-departments");
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong");
  }
};
