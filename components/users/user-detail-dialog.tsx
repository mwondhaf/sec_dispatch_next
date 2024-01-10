import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Company, Entity, User } from "@/typings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProfileUpdateForm from "./details/profile-update-form";
import { useState } from "react";
import { deleteUser } from "@/app/actions/settings/users-actions";

interface UserDetailDialogProps {
  user: User;
  companies: Company[];
  orgs: Entity[];
}

export function UserDetailDialog({
  user,
  companies,
  orgs,
}: UserDetailDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteUser(user.email);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover:cursor-pointer">
          <h4 className="text-sm font-bold capitalize text-gray-600">
            {user.name}
          </h4>
          <p className="text-xs lowercase text-gray-500">{user.email}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle className="my-5">Profile Settings</DialogTitle>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="danger">Danger</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <ProfileUpdateForm {...{ user, companies, orgs, handleClose }} />
            </TabsContent>
            <TabsContent
              value="danger"
              className="space-y-5 py-5 md:min-h-[300px]"
            >
              <p className="text-red-400">
                Deleting this account will result in the removal of all
                information associated with their account. This includes
                personal details, preferences, and any content or data created
                by the user within this platform
              </p>
              <Button variant="destructive" size={"lg"} onClick={handleDelete}>
                Delete User
              </Button>
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
