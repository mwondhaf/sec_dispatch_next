import { updateUserProfile } from "@/app/actions/settings/user-profile-actions";
import { updateUser } from "@/app/actions/settings/users-actions";
import { SubmitButton } from "@/components/common/submit-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { personSchema } from "@/lib/schemas/create-user-schema";
import { Company, Entity, User } from "@/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface ProfileUpdateFormProps {
  user: User;
  companies: Company[];
  orgs: Entity[];
  handleClose: () => void;
}

const employeeTypes = ["INHOUSE", "CONTRACTOR", "OTHER"];
const employeeRoles = ["BASIC", "ADMIN", "MANAGER", "SUPERVISOR"];

const personSchemaNoUserEmail = personSchema.omit({ userEmail: true });

type PersonProfile = z.infer<typeof personSchemaNoUserEmail>;

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
  user,
  companies,
  orgs,
  handleClose,
}) => {
  const form = useForm<PersonProfile>({
    resolver: zodResolver(personSchemaNoUserEmail),
    defaultValues: {
      name: user.name,
      email: user.email,
      companyId: user.companyId,
      entityId: user.UserProfile[0]?.entityId,
      employeeType: user.employeeType,
      idNumber: user.idNumber,
      isActive: user.isActive,
      role: user.role,
      password: user.password,
    },
  });

  const onSubmit: SubmitHandler<PersonProfile> = async (data) => {
    const { entityId, ...userData } = data;

    const [result, profile] = await Promise.all([
      updateUser(userData),
      updateUserProfile(user.UserProfile[0].id, {
        entityId: data.entityId,
      }),
    ]);

    if (!result || !profile) {
      console.log("Something went wrong");
      return;
    }

    if (result?.error || profile?.error) {
      console.log(result.error);
      return;
    }
    form.reset();
    handleClose();
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-4 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input readOnly {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entity</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an entity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {orgs.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a employment status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employeeTypes.map((employee, index) => (
                      <SelectItem key={index} value={employee}>
                        {employee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID No.</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">User Status</FormLabel>
                  <FormDescription>
                    Enable or Disable user active status
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a employment status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employeeRoles.map((role, index) => (
                      <SelectItem key={index} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SubmitButton label="Save Changes" pendingLabel="Saving..." />
        </form>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
