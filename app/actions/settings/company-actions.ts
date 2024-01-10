"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchData, postData, deleteData, patchData } from "../fetch-helper";
import { Company } from "@/typings";
import { companySchema } from "@/lib/schemas/create-company-schema";

type CreateCompanyInput = z.infer<typeof companySchema>;

export const createCompany = async (data: CreateCompanyInput) => {
  const result = companySchema.safeParse(data);

  if (result.success) {
    let response = await postData("company", result.data);
    revalidatePath("/settings/companies");
    return { success: true, data: response.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    let response: Company[] = await fetchData("company");
    return response;
  } catch (error) {
    return [];
  }
};

export const updateCompany = async (id: string, data: Omit<Company, "id">) => {
  const result = companySchema.safeParse(data);

  if (result.success) {
    let response = await patchData(`company/${id}`, data);
    revalidatePath("/settings/companies");
    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const deleteCompany = async (id: string) => {
  try {
    await deleteData(`company/${id}`);
    revalidatePath("/settings/companies");
  } catch (error) {
    console.log({ error });
    throw new Error("Error deleting company");
  }
};
