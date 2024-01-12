"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SubmitButton } from "../common/submit-button";
import { useEffect, useState } from "react";
import { IncidentType } from "@/typings";
import { departmentSchema } from "@/lib/schemas/create-department-schema";
import { updateDepartment } from "@/app/actions/settings/department-actions";

type DepartmentInput = z.infer<typeof departmentSchema>;

export function EditReporterDepartmentDialog({
  department,
}: {
  department: IncidentType;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
  });

  useEffect(() => {
    form.setValue("name", department.name);
  }, [department, form]);

  const onSubmit: SubmitHandler<DepartmentInput> = async (data) => {
    const result = await updateDepartment(department.id.toString(), data);

    if (!result) {
      console.log("something went wrong");
      return;
    }

    if (result.error) {
      console.log(result.error);
      return;
    }
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>{department.name}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Incident Type</DialogTitle>
          <DialogDescription>
            Enter the details and click Save Changes when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton label="Save Changes" pendingLabel="Saving..." />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
