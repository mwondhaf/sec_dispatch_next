"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export function TanstackProvider(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        // make data stale after 5 minutes
        // default staleTime is 5 minutes
        // defaultOptions: {
        //   queries: {
        //     refetchOnWindowFocus: true,
        //     retry: false,
        //     staleTime: 1000 * 60 * 5,
        //   },
        // },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
