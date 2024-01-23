"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { signOut, useSession } from "next-auth/react";
import * as jwt from "jsonwebtoken";

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({}));

  const { data: session } = useSession();

  const currentToken =
    session?.user.accessToken && jwt.decode(session?.user.accessToken);
  const isExpired = currentToken && currentToken.exp < Date.now() / 1000;

  useEffect(() => {
    if (isExpired) {
      signOut();
    }
  }, [currentToken, isExpired]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
