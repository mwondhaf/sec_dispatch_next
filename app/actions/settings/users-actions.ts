"use server";
import { personSchema } from "@/lib/schemas/create-user-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchData, postData, deleteData, patchData } from "../fetch-helper";
import { User } from "@/typings";
import * as bcrypt from "bcrypt";

const personSchemaNoEntityIdAndUserEmail = personSchema.omit({
  entityId: true,
  userEmail: true,
  isActive: true,
  role: true,
});
type UserInput = z.infer<typeof personSchemaNoEntityIdAndUserEmail>;

export const createUser = async (data: UserInput) => {
  const result = personSchemaNoEntityIdAndUserEmail.safeParse(data);

  if (result.success) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    let response = await postData("users", data);

    revalidatePath("/settings/users");
    return { success: true, data: response };
  }

  if (result.error) {
    console.log(result.error);

    return { success: false, error: result.error.format() };
  }
};

export const updateUser = async (data: UserInput) => {
  const result = personSchemaNoEntityIdAndUserEmail.safeParse(data);

  const { email, ...updatedUserData } = data;

  if (result.success) {
    if (updatedUserData.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updatedUserData.password, salt);
      updatedUserData.password = hashedPassword;
    }
    let response = await patchData(`users/${email}`, updatedUserData);

    revalidatePath("/settings/users");
    return { success: true, data: response };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    let response: User[] = await fetchData("users");
    return response;
  } catch (error) {
    return [];
  }
};

export const deleteUser = async (email: string) => {
  try {
    await deleteData(`users/${email}`);
    revalidatePath("/settings/users");
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong");
  }
};
