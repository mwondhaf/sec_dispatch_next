"use server";
import { auth } from "@/auth";

let apiBaseUrl = process.env.BACKEND_URL;

export const fetchData = async (endpoint: string) => {
  const session = await auth();
  const user_token = session?.user?.accessToken;

  // const user_token = cookies().get("user_token")?.value;

  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "GET",
      headers: {
        Cookie: `user_token=${user_token}`,
      },
    });
    // network error in the 4xx–5xx range
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const postData = async (endpoint: string, data: any = {}) => {
  const session = await auth();
  const user_token = session?.user?.accessToken;

  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Cookie: `user_token=${user_token}`,
        Accept: "application/json",
      },
    });
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);

    return response.json();
  } catch (error) {
    throw new Error("Failed to create data");
  }
};

export const patchData = async (endpoint: string, data: any = {}) => {
  const session = await auth();
  const user_token = session?.user?.accessToken;

  try {
    const res = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Cookie: `user_token=${user_token}`,
        Accept: "application/json",
      },
    });

    const result = await res.json();

    return result;
  } catch (error) {
    throw new Error("Failed to update data");
  }
};

export const deleteData = async (endpoint: string) => {
  const session = await auth();
  const user_token = session?.user?.accessToken;

  try {
    await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "DELETE",
      headers: {
        Cookie: `user_token=${user_token}`,
      },
    });
  } catch (error) {
    console.log(error);

    throw new Error("Failed to delete data");
  }
};
