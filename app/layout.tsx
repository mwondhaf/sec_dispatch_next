import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { auth } from "@/auth";
import * as jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { logOut } from "./actions/login";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { Providers } from "./Providers";

const sans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dispatch Report",
  description: "An Occurrence Reporting System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <SessionProvider>
          <CookiesProvider>
            <Providers>{children}</Providers>
          </CookiesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
