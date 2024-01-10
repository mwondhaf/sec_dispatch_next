"use server";

import { jwtVerify } from "jose";

export const verify = async (jwt: string, secret: string) => {
  const { payload } = await jwtVerify(
    jwt ?? "",
    new TextEncoder().encode(secret),
  );

  return payload;
};
