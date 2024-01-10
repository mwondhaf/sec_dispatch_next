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
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IncidentType } from "@/typings";
import { createIncidentCategory } from "@/app/actions/settings/incident-category-actions";
import { toast } from "../ui/use-toast";
import { incidentCategorySchema } from "@/lib/schemas/create-incident-category-schema";

type IncidentCategoryInput = z.infer<typeof incidentCategorySchema>;

export function CreateIncidentCategoryDialog({
  incidentTypes,
}: {
  incidentTypes: IncidentType[];
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<IncidentCategoryInput>({
    resolver: zodResolver(incidentCategorySchema),
  });

  const onSubmit: SubmitHandler<IncidentCategoryInput> = async (data) => {
    const result = await createIncidentCategory(data);

    if (result.error) {
      toast({
        variant: "destructive",
        title: `${result.error} ${result.statusCode}`,
        description: result.message,
      });
      return;
    }
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Incident Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Incident Category</DialogTitle>
          <DialogDescription>
            Enter the details and click Create Category when you&apos;re done.
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
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incidentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton label="Create Category" pendingLabel="Creating..." />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
