"use client";
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
import { entitySchema } from "@/lib/schemas/create-entity-schema";
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
import {
  createEntity,
  updateEntity,
} from "@/app/actions/settings/entity-actions";
import { useEffect, useState } from "react";
import { Company } from "@/typings";
import { companySchema } from "@/lib/schemas/create-company-schema";
import { updateCompany } from "@/app/actions/settings/company-actions";

type CompanyInput = z.infer<typeof companySchema>;

export function EditCompanyDialog({ company }: { company: Company }) {
  const [open, setOpen] = useState(false);

  const form = useForm<CompanyInput>({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    if (company) {
      form.reset({
        name: company.name,
        workScope: company.workScope,
        trade_license_number: company.trade_license_number,
      });
    }
  }, [company, form]);

  const onSubmit: SubmitHandler<CompanyInput> = async (data) => {
    const result = await updateCompany(company.id, data);

    if (!result) {
      console.log("something went wrong");
      return;
    }

    if (result.error) {
      console.log(result.error);
      return;
    }
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="">{company.name}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Entity Details</DialogTitle>
          <DialogDescription>
            Update the details and click Save Changes when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity Name</FormLabel>
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
                  <FormLabel>WorkScope</FormLabel>
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
