"use client";
import { Building2, ClipboardList, Hotel, Users2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-2 p-5">
      <Link
        href={"/settings/users"}
        className={clsx(
          pathname === "/settings/users" && "bg-gray-100 text-gray-800",
          "flex items-center gap-5 rounded-md px-4 py-2 text-gray-500",
        )}
      >
        <div className="">
          <Users2 />
        </div>
        <div className="">
          <h5 className="text-sm">Users</h5>
          <p className="text-xs">View and manage user information</p>
        </div>
      </Link>
      <Link
        href={"/settings/entities"}
        className={clsx(
          pathname === "/settings/entities" && "bg-gray-100 text-gray-800",
          "flex items-center gap-5 rounded-md px-4 py-2 text-gray-500",
        )}
      >
        <div className="">
          <Hotel />
        </div>
        <div className="">
          <h5 className="text-sm">Entities</h5>
          <p className="text-xs">Explore and configure entity settings</p>
        </div>
      </Link>
      <Link
        href={"/settings/companies"}
        className={clsx(
          pathname === "/settings/companies" && "bg-gray-100 text-gray-800",
          "flex items-center gap-5 rounded-md px-4 py-2 text-gray-500",
        )}
      >
        <div className="">
          <Building2 />
        </div>
        <div className="">
          <h5 className="text-sm">Companies</h5>
          <p className="text-xs">Manage and customize company details</p>
        </div>
      </Link>
      <Link
        href={"/settings/incident-types"}
        className={clsx(
          pathname === "/settings/incident-types" &&
            "bg-gray-100 text-gray-800",
          "flex items-center gap-5 rounded-md px-4 py-2 text-gray-500",
        )}
      >
        <div className="">
          <ClipboardList />
        </div>
        <div className="">
          <h5 className="text-sm ">Incident Settings</h5>
          <p className="text-xs">Manage and customize company details</p>
        </div>
      </Link>
    </div>
  );
};

export default LeftSideBar;
