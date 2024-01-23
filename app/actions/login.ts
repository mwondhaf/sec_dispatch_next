"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";

export const login = async ({
  idNumber,
  password,
}: {
  idNumber: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      idNumber,
      password,
      redirectTo: DEFAULT_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export const logOut = async () => {
  await signOut();
};
