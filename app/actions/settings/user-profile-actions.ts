"use server";
import { personSchema } from "@/lib/schemas/create-user-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchData, postData, deleteData, patchData } from "../fetch-helper";
import { User } from "@/typings";

const personSchemaNoNameAndEmail = personSchema.omit({
  name: true,
  email: true,
  companyId: true,
  employeeType: true,
  idNumber: true,
  isActive: true,
  role: true,
  password: true,
});
type CreateUserInput = z.infer<typeof personSchemaNoNameAndEmail>;

export const createUserProfile = async (data: CreateUserInput) => {
  const result = personSchemaNoNameAndEmail.safeParse(data);

  if (result.success) {
    let response = await postData("user-profiles", data);

    revalidatePath("/settings/users");
    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// update
const personUpdate = personSchema.omit({
  name: true,
  email: true,
  companyId: true,
  employeeType: true,
  idNumber: true,
  userEmail: true,
  isActive: true,
  role: true,
  password: true,
});
type UpdateUserProfileInput = z.infer<typeof personUpdate>;

export const updateUserProfile = async (
  id: string,
  data: UpdateUserProfileInput,
) => {
  const result = personUpdate.safeParse(data);

  if (result.success) {
    let response = await patchData(`user-profiles/${id}`, data);

    revalidatePath("/settings/users");
    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const getUserProfiles = async () => {
  try {
    let response = await fetchData("/user-profiles/own");
    return response;
  } catch (error) {
    throw error;
  }
};

// export const getAllUsers = async (): Promise<User[]> => {
//   let response: User[] = await fetchData("users");
//   return response;
// };

// export const deleteUser = async (id: string) => {
//   await deleteData(`users/${id}`);
//   revalidatePath("/settings/users");
// };
