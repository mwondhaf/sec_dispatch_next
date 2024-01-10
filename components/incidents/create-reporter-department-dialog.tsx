"use client";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { createIncidentType } from "@/app/actions/settings/incident-type-actions";
import { z } from "zod";
import { departmentSchema } from "@/lib/schemas/create-department-schema";
import { createDepartment } from "@/app/actions/settings/department-actions";

type DepartmentInput = z.infer<typeof departmentSchema>;

export function CreateReporterDepartmentDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
  });

  const onSubmit: SubmitHandler<DepartmentInput> = async (data) => {
    const result = await createDepartment(data);

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
        <Button>Create Department</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Department</DialogTitle>
          <DialogDescription>
            Enter the details and click Create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton label="Create" pendingLabel="Creating..." />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
