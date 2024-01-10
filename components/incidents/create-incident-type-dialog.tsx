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
import { incidentTypeSchema } from "@/lib/schemas/create-incident-type-schema";

type IncidentTypeInput = z.infer<typeof incidentTypeSchema>;

export function CreateIncidentTypeDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<IncidentTypeInput>({
    resolver: zodResolver(incidentTypeSchema),
  });

  const onSubmit: SubmitHandler<IncidentTypeInput> = async (data) => {
    const result = await createIncidentType(data);

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
        <Button>Create Incident Type</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Incident Type</DialogTitle>
          <DialogDescription>
            Enter the details and click Create Type when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

            <SubmitButton label="Create Type" pendingLabel="Creating..." />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
