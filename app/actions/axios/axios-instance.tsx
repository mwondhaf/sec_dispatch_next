"use server";
import axios from "axios";
import { getCookies } from "next-client-cookies/server";

import { cookies } from "next/headers";

let baseURL = "http://localhost:3003";

// const user_token = cookies().get("user_token")?.value;

const api = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  // headers: { Cookie: `user_token=${user_token}` },
});

// add a cookie to the request to an interceptor

api.interceptors.request.use(
  (config) => {
    // const cookies = getCookies();
    config.headers.Cookie = `user_token=${cookies().get("user_token")?.value}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
