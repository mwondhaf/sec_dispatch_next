"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(data: any) {
  // TODO add api url to the .env file
  const apiResponse = await fetch("http://localhost:3003/auth/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ destination: data.email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!apiResponse.ok) {
    throw new Error(`HTTP error! Status: ${apiResponse.status}`);
  }

  if (apiResponse.ok) {
    redirect("/login/email");
  }
}

export async function userEmailLogin(token: string) {
  // TODO add api url to the .env file
  const apiResponse = await fetch(
    `http://localhost:3003/auth/login/callback?token=${token}`,
    {
      method: "GET",
      // credentials: "include",
    }
  );

  if (!apiResponse.ok) {
    throw new Error(`HTTP error! Status: ${apiResponse.status}`);
  }
  const result = await apiResponse.json();
  cookies().set("user_token", result.access_token);

  redirect("/");

  // if (result) {
  //   redirect("/login/email");
  // }
}

export const setUserCookies = async (token: string) => {
  await cookies().set("user_token", token);
};
