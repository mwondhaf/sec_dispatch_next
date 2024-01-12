"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../actions/fetch-helper";
import { UserProfile } from "@/typings";
import { signOut } from "next-auth/react";

export const menu = [
  { name: "Analytics", uri: "/" },
  { name: "Occurrences", uri: "/incidents" },
  { name: "Settings", uri: "/settings" },
  { name: "Search", uri: "/filter" },
];

const MainNav = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data: profiles, error } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () =>
      (await fetchData("user-profiles/own")) as UserProfile[],
  });

  const handleLogout = async () => {
    queryClient.clear();
    signOut();
  };

  return (
    <nav className="top-0 z-50 flex min-h-[10vh] border-b bg-white md:sticky">
      <div className="container flex  items-center justify-between  bg-white px-6">
        <div className="">
          <Link className="font-bold" href={"/"}>
            logo
          </Link>
        </div>
        <div className="hidden md:flex">
          {menu.map((menu, index) => (
            <Button key={index} asChild variant={"ghost"}>
              <Link
                href={menu.uri}
                className={clsx(
                  pathname.toLowerCase() === menu.uri.toLowerCase() ||
                    (pathname.toLowerCase().includes(menu.name.toLowerCase()) &&
                      "text-primary"),
                  "text-xs font-bold",
                )}
              >
                {menu.name}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {profiles && (
            <div>
              <p className="text-xs font-semibold text-primary/80">
                {profiles[0]?.user?.name}
              </p>
              <p className="text-xs font-semibold text-gray-700">
                {profiles[0]?.userEmail}
              </p>
            </div>
          )}
          <Button onClick={handleLogout} variant="outline" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
