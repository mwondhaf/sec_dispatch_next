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
import { useState } from "react";
import { IncidentType } from "@/typings";
import { incidentTypeSchema } from "@/lib/schemas/create-incident-type-schema";
import { updateIncidentType } from "@/app/actions/settings/incident-type-actions";

type IncidentTypeInput = z.infer<typeof incidentTypeSchema>;

export function EditIncidentTypeDialog({
  incident_type,
}: {
  incident_type: IncidentType;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<IncidentTypeInput>({
    resolver: zodResolver(incidentTypeSchema),
    defaultValues: {
      name: incident_type.name,
    },
  });

  const onSubmit: SubmitHandler<IncidentTypeInput> = async (data) => {
    const result = await updateIncidentType(incident_type.id.toString(), data);

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
        <div>{incident_type.name}</div>
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
