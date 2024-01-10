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
import { Company } from "@/typings";
import { createCompany } from "@/app/actions/settings/company-actions";

export function CreateCompanyDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<Company>({});

  const onSubmit: SubmitHandler<Company> = async (data) => {
    const result = await createCompany(data);

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
        <Button>Create Company</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
          <DialogDescription>
            Enter the details and click Create Company when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
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
              name="trade_license_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trade License No.</FormLabel>
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
              name="workScope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Scope</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton label="Create Company" pendingLabel="Creating..." />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
