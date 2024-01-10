"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  useCategoriesQuery,
  useCategoryTypesQuery,
  useDepartmentsQuery,
  useIncidentsQuery,
} from "../hooks/incidents-hook";
import { filterSchema } from "@/lib/schemas/filter-schema";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { countries } from "@/lib/countries";
import FilterResults from "./filter-results";

const severityOptions = ["Low", "Medium", "High"];

const FilterForm = () => {
  const router = useRouter();

  const [selectedCatType, setSelectedCatType] = React.useState<string | null>();

  const { category_types } = useCategoryTypesQuery();
  const { categories } = useCategoriesQuery();
  const { departments } = useDepartmentsQuery();

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      start_date: moment().toDate(),
      start_time: moment().format("HH:mm"),
      end_date: moment().toDate(),
      end_time: moment().format("HH:mm"),
    },
  });

  const onSubmit = async (data: z.infer<typeof filterSchema>) => {
    const { start_date, end_date, start_time, end_time, ...rest } = data;
    // convert dates to iso string
    const startDate = moment(start_date).format("YYYY-MM-DD");
    const startTime = moment(start_time, "HH:mm").format("HH:mm:ss");

    const endDate = moment(end_date).format("YYYY-MM-DD");
    const endTime = moment(end_time, "HH:mm").format("HH:mm:ss");

    const exact_start_date_and_time = moment(
      `${startDate} ${startTime}`,
    ).toISOString();
    const exact_end_date_and_time = moment(
      `${endDate} ${endTime}`,
    ).toISOString();

    const finalData = {
      ...rest,
      start_date: exact_start_date_and_time,
      end_date: exact_end_date_and_time,
    };

    const removeUndefined = (finalData: Record<string, string>) => {
      Object.keys(finalData).forEach(
        (key) =>
          (finalData[key] === undefined && delete finalData[key]) ||
          (finalData[key].length === 0 && delete finalData[key]),
      );
      return finalData;
    };

    const queryData = removeUndefined(finalData);

    function createQueryString(queryData: Record<string, string>) {
      const queryString = Object.keys(queryData)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(queryData[key])}`,
        )
        .join("&");

      return queryString;
    }

    // Example usage
    // const parameters = { search: "yell", cat_type: "name" };
    const urlString = `?${createQueryString(queryData)}`;
    router.push(urlString);
  };

  // const { incidents } = useIncidentsQuery(data);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-1 space-y-4 py-5"
        >
          <div className="flex gap-10">
            {/* from date and time */}
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className=" flex flex-col">
                    <FormLabel className="text-gray-500">From Date</FormLabel>
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="text-gray-500"></FormLabel> */}
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        value={field.value!}
                        className="mt-5 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* to date and time */}
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className=" flex flex-col">
                    <FormLabel className="text-gray-500">To Date</FormLabel>
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        value={field.value!}
                        className="mt-5 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* search  */}
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Search</FormLabel> */}
                <FormControl>
                  <Input className="h-12" placeholder="Search..." {...field} />
                </FormControl>
                <FormDescription>
                  Search by reference number, description content or
                  investigation content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="cat_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Incident Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setSelectedCatType(value);
                      form.setValue("cat_type_id", value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {category_types?.map((category_type) => (
                        <SelectItem
                          key={category_type.id}
                          value={category_type.id}
                        >
                          {category_type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cat_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Category Name</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCatType
                        ? categories
                            ?.filter(
                              (cat) => cat.incidentTypeId === selectedCatType,
                            )
                            .map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                        : categories?.map((category) => (
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
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Severity Level</FormLabel>
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
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="involved_nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Involved Person Nationality</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country, index) => (
                        <SelectItem key={index} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="involved_dept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Involved Person Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category of person" />
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
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="involved_name"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Involved Person's Name" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="involved_id"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Involved Person's ID Number"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-5">
            <FormField
              control={form.control}
              name="reporter_dept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">
                    Reporter/Requestor Department
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department of reporter" />
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
            <FormField
              control={form.control}
              name="reporter_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">
                    Reporter/ Requestor&apos;s Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      // placeholder="Reporter/ Requestor's Name"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" size={"lg"} type="submit">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FilterForm;
