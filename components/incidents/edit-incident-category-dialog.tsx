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
import { IncidentCategory, IncidentType } from "@/typings";
import { getAllIncidentTypes } from "@/app/actions/settings/incident-type-actions";
import { incidentCategorySchema } from "@/lib/schemas/create-incident-category-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateIncidentCategory } from "@/app/actions/settings/incident-category-actions";

type IncidentCategoryInput = z.infer<typeof incidentCategorySchema>;

export function EditIncidentCategoryDialog({
  incident_category,
}: {
  incident_category: IncidentCategory;
}) {
  const [open, setOpen] = useState(false);
  const [incidentTypes, setIncidentTypes] = useState<IncidentType[]>([]);

  useEffect(() => {
    const fetchIncidentTypes = async () => {
      const result = await getAllIncidentTypes();
      if (!result) {
        console.log("something went wrong");
        return;
      }
      setIncidentTypes(result);
    };
    fetchIncidentTypes();
  }, []);

  const form = useForm<IncidentCategoryInput>({
    resolver: zodResolver(incidentCategorySchema),
  });

  useEffect(() => {
    form.setValue("name", incident_category.name);
    form.setValue("incidentTypeId", incident_category.incidentTypeId);
  }, [incident_category, form]);

  const onSubmit: SubmitHandler<IncidentCategoryInput> = async (data) => {
    const result = await updateIncidentCategory(incident_category.id, data);

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
        <div>{incident_category.name}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Incident Type</DialogTitle>
          <DialogDescription>
            Enter the details and click Save Changes when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
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
              name="incidentTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incidentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
