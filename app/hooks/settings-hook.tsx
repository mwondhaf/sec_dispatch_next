import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../actions/settings/users-actions";
import { User } from "@/typings";
import { personSchema } from "@/lib/schemas/create-user-schema";
import { z } from "zod";
import { postData } from "../actions/fetch-helper";

export const useUsersQuery = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({ queryKey: ["users"], queryFn: () => getAllUsers() });

  return { users, isLoading, error };
};

// create a new user
export const useCreateUserQuery = () => {
  const queryClient = useQueryClient();
  const personSchemaNoEntityIdAndUserEmail = personSchema.omit({
    entityId: true,
    userEmail: true,
    isActive: true,
    role: true,
  });
  type UserInput = z.infer<typeof personSchemaNoEntityIdAndUserEmail>;

  const { mutate: createNewUser, error: user_error } = useMutation({
    mutationFn: async (data: UserInput) => {
      return await postData("users", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { createNewUser, user_error };
};

// update user
export const useUpdateUserQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, error: user_error } = useMutation({
    mutationFn: async (data: User) => {
      return await postData(`users/${data.email}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { updateUser, user_error };
};

// create user profile
export const useCreateUserProfileQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: createUserProfile, error: profile_error } = useMutation({
    mutationFn: async (data: { userEmail: string; entityId: string }) => {
      return await postData("user-profiles", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { createUserProfile, profile_error };
};
