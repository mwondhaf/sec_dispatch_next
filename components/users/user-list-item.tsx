"use client";
import { Company, Entity, User } from "@/typings";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical, Pencil, Trash, View } from "lucide-react";
import Link from "next/link";
import { UserDetailDialog } from "./user-detail-dialog";

interface UserListItemProps {
  user: User;
  companies: Company[];
  orgs: Entity[];
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  companies,
  orgs,
}) => {
  return (
    <>
      <div
        key={user.id}
        className="flex items-start justify-between rounded-md border p-3"
      >
        <div className="grid w-full grid-cols-7 gap-3">
          <div className="col-span-3">
            <UserDetailDialog {...{ user, companies, orgs }} />
          </div>
          <div className="col-span-2">
            <h4 className="text-sm font-bold capitalize text-gray-600">
              {user.employeeType}
            </h4>
            <p className="text-xs text-gray-500">{user?.company?.name}</p>
          </div>
          <div className="col-span-2">
            <h4 className="text-sm font-bold text-primary/80">Properties</h4>
            <div className="">
              {user.UserProfile.map((org) => (
                <p key={org.id} className="text-xs text-gray-500">
                  {org.entity?.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListItem;
