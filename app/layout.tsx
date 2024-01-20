import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "./TanstackProvider";
import { CookiesProvider } from "next-client-cookies/server";
import { auth, signOut } from "@/auth";
import * as jwt from "jsonwebtoken";

const sans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dispatch Report",
  description: "An Occurrence Reporting System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();
  const token = user?.user.accessToken;

  if (token) {
    const currentToken = token && jwt.decode(token);
    const isExpired = currentToken && currentToken.exp < Date.now() / 1000;

    if (isExpired) {
      signOut();
    }
  }

  return (
    <html lang="en">
      <body className={sans.className}>
        <CookiesProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
