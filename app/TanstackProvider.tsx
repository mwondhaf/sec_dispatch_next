"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useSession } from "next-auth/react";

export function TanstackProvider(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
