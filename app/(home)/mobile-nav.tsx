"use client";
import React from "react";
import { menu } from "./navbar";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between border-b p-6 md:hidden">
      {menu.map((menu, index) => (
        <Link
          key={index}
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
      ))}
    </div>
  );
};

export default MobileNav;
