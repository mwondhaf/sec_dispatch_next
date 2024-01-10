import { Button, buttonVariants } from "@/components/ui/button";
import { Cog, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <div className="w-1/5 space-y-2 h-screen overflow-y-scroll p-3">
            <Link
              href={"/dashboard"}
              className={`w-full justify-start gap-2 items-center ${buttonVariants(
                { variant: "ghost" }
              )}`}
            >
              <div className="flex items-center justify-start w-full gap-2">
                <LayoutDashboard size={24} />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              href={"/settings"}
              className={`w-full justify-start gap-2 items-center ${buttonVariants(
                { variant: "ghost" }
              )}`}
            >
              <div className="flex items-center justify-start w-full gap-2">
                <Cog size={24} />
                <span>Settings</span>
              </div>
            </Link>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
