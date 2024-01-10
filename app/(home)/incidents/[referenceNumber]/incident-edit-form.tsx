"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import moment from "moment";
import { incidentSchema } from "@/lib/schemas/create-incident-schema";
import {
  deletePersonInvolved,
  getIncident,
} from "@/app/actions/incident.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "@/app/actions/fetch-helper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import clsx from "clsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreatePersonInvolvedDialog } from "@/components/incidents/create-person-involved-dialog";
import { PeopleInvolvedAccord } from "./people-involved-accord";
import { useUpdateIncidentMutation } from "@/app/hooks/incidents-hook";
import { Department, IncidentCategory } from "@/typings";

const severityOptions = ["Low", "Medium", "High"];

function IncidentEditForm({
  referenceNumber,
  departments,
  categories: incident_categories,
}: {
  referenceNumber: string;
  departments: Department[];
  categories: IncidentCategory[];
}) {
  const queryClient = useQueryClient();
  const { updateIncidentData } = useUpdateIncidentMutation();

  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => await fetchData("user-profiles/own"),
  });

  const fetchIncident = async () => {
    const incident = await getIncident(`${referenceNumber}`);
    if (incident) {
      form.setValue("departmentId", incident.departmentId);
      form.setValue("incidentCategoryId", incident.incidentCategoryId);
      form.setValue("severity", incident.severity);
      form.setValue("description", incident.description);
      form.setValue("location", incident.location);
      form.setValue("entityId", incident.entityId);

      form.setValue("occurrenceDate", moment(incident.incidentTime).toDate());
      form.setValue("time", moment(incident.incidentTime).format("HH:mm"));

      form.setValue(
        "closureDate",
        moment(incident.incidentClosedTime).toDate(),
      );
      form.setValue(
        "closureTime",
        moment(incident.incidentClosedTime).format("HH:mm"),
      );

      form.setValue("reporterName", incident.reporterName);
      form.setValue("investigation", incident.investigation);
      form.setValue("referenceNumber", incident.referenceNumber);

      form.setValue("compilerEmail", incident.compilerEmail);
      form.setValue("editorEmail", incident.editorEmail);
    }
    return incident;
  };

  const {
    data: incident,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["incident", referenceNumber],
    queryFn: async () => await fetchIncident(),
    enabled:
      !!referenceNumber && !!departments && !!incident_categories && !!profiles,
  });

  const form = useForm<z.infer<typeof incidentSchema>>({
    resolver: zodResolver(incidentSchema),
  });

  //  form errors

  async function onSubmit(data: z.infer<typeof incidentSchema>) {
    const date = moment(data.occurrenceDate).format("YYYY-MM-DD");
    const time = moment(data.time, "HH:mm").format("HH:mm:ss");

    const closingDate = moment(data.closureDate).format("YYYY-MM-DD");
    const closingTime = moment(data.closureTime, "HH:mm").format("HH:mm:ss");

    data.incidentTime = moment(`${date} ${time}`).toISOString();
    data.incidentClosedTime = moment(
      `${closingDate} ${closingTime}`,
    ).toISOString();
    data.editorEmail = profiles[0].userEmail;

    const { closureTime, closureDate, ...finalData } = data;

    updateIncidentData(finalData);
  }

  const handleDeletePerson = async (id: string) => {
    await deletePersonInvolved(id, incident?.referenceNumber!);
    queryClient.invalidateQueries({
      queryKey: ["incident", incident?.referenceNumber],
    });
  };

  if (error) {
    return <>An error has occurred: {error.message}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!incident) {
    return <>Incident not found</>;
  }

  return (
    <div className="py-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={clsx(
            incident.severity === "Medium"
              ? "border-yellow-300"
              : incident.severity === "High"
                ? "border-red-300"
                : "border-green-50",
            "space-y-2 border-2 p-5",
          )}
        >
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
                      {/* <FormLabel>Username</FormLabel> */}
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          // defaultValue={moment().format("HH:mm")}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {incident_categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
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
                    <FormLabel className="text-gray-500">
                      Reporter Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full text-gray-600" />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments?.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
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
                    {/* <FormLabel></FormLabel> */}
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={7}
                        className="w-full text-gray-600"
                        placeholder="Description"
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
                        rows={7}
                        className="w-full text-gray-600"
                        placeholder="Action Taken/ Investigation"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 flex w-full items-center justify-between ">
              <div className="">
                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">
                        Severity Level
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value!}
                      >
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
              {departments && (
                <CreatePersonInvolvedDialog
                  {...{ departments, incident_ref: incident.referenceNumber }}
                />
              )}
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-1">
                <FormField
                  control={form.control}
                  name="closureDate"
                  render={({ field }) => (
                    <FormItem className=" flex flex-col">
                      <FormLabel className="text-gray-500">
                        Incident Closure Time
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[200px] pl-3 text-left font-normal",
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
                    name="closureTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="time" className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* people involved */}
          <PeopleInvolvedAccord
            {...{
              peopleInvolved: incident.PeopleInvolved,
              handleDeletePerson,
            }}
          />
          <div className="flex gap-3">
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default IncidentEditForm;
