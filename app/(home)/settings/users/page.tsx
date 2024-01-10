import { getAllCompanies } from "@/app/actions/settings/company-actions";
import { getAllEntities } from "@/app/actions/settings/entity-actions";
import { getAllUsers } from "@/app/actions/settings/users-actions";
import { Input } from "@/components/ui/input";
import { CreateUserDialog } from "@/components/users/create-user-dialog";
import UserListItem from "@/components/users/user-list-item";
import { UsersFilter } from "@/components/users/users-filter";
import { User } from "@/typings";
import React from "react";

const UsersPage = async () => {
  const [users, orgs, companies] = await Promise.all([
    getAllUsers(),
    getAllEntities(),
    getAllCompanies(),
  ]);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between bg-white pr-5 pt-5">
          <Input className="w-1/2" placeholder="Search user by email" />
          <CreateUserDialog {...{ orgs, companies }} />
        </div>
        <div className="flex justify-between gap-8 py-9">
          <div className="max-h-[70vh] w-3/4 space-y-2 overflow-y-scroll">
            {users?.map((user: User) => (
              <UserListItem key={user.id} {...{ user, companies, orgs }} />
            ))}
          </div>
          <UsersFilter />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
