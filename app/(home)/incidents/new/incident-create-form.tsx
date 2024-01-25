"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import React from "react";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department, IncidentCategory, UserProfile } from "@/typings";
import { incidentSchema } from "@/lib/schemas/create-incident-schema";
import { createIncident } from "@/app/actions/incident.actions";
import { customAlphabet } from "nanoid";
import { Textarea } from "@/components/ui/textarea";
import { useCreateIncidentMutation } from "@/app/hooks/incidents-hook";

const nanoid = customAlphabet("1234567890", 10);

const severityOptions = ["Low", "Medium", "High"];

function IncidentCreateForm({
  incident_categories,
  departments,
  profiles,
}: {
  incident_categories: IncidentCategory[];
  departments: Department[];
  profiles: UserProfile[];
}) {
  const { createNewIncident } = useCreateIncidentMutation();

  const form = useForm<z.infer<typeof incidentSchema>>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      occurrenceDate: moment().toDate(),
      time: moment().format("HH:mm"),

      // closure time
      closureDate: moment().toDate(),

      severity: "Low",
    },
  });

  async function onSubmit(data: z.infer<typeof incidentSchema>) {
    // combine dob and time
    const date = moment(data.occurrenceDate).format("YYYY-MM-DD");
    const time = moment(data.time, "HH:mm").format("HH:mm:ss");

    data.incidentTime = moment(`${date} ${time}`).toISOString();
    data.incidentClosedTime = moment(`${date} ${time}`).toISOString();

    data.compilerEmail = profiles[0]?.userEmail;
    data.editorEmail = profiles[0]?.userEmail;
    data.entityId = profiles[0]?.entityId;
    data.referenceNumber = `${moment().format("MMDDYY")}-${nanoid(6)}`;

    const { closureDate, ...final } = data;

    createNewIncident(final);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <FormField
              control={form.control}
              name="occurrenceDate"
              render={({ field }) => (
                <FormItem className=" flex flex-col">
                  <FormLabel className="text-gray-500">
                    Date of Incident
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-5">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        value={field.value!}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-1/2 pb-3">
            <FormField
              control={form.control}
              name="incidentCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">
                    Incident Category
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incident_categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-4 ">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="text-gray-500">
                    Location of Incident
                  </FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Location of Incident"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 ">
            <FormField
              control={form.control}
              name="reporterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Reporter Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">
                    Reporter Department
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={department.id.toString()}
                        >
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4 ">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full text-gray-600"
                      placeholder="Description"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4 ">
            <FormField
              control={form.control}
              name="investigation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full text-gray-600"
                      placeholder="Action Taken/ Investigation"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">
                    Severity Level
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value!}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a severity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {severityOptions.map((severity, index) => (
                        <SelectItem key={index} value={severity}>
                          {severity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Create Occurrence</Button>
      </form>
    </Form>
  );
}

export default IncidentCreateForm;
