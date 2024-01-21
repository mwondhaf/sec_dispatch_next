"use client ";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createIncident, updateIncident } from "../actions/incident.actions";
import { incidentSchema } from "@/lib/schemas/create-incident-schema";
import { z } from "zod";
import { fetchData } from "../actions/fetch-helper";
import { Incident } from "@/typings";
import { useRouter } from "next/navigation";
import { getAllIncidentTypes } from "../actions/settings/incident-type-actions";
import { getAllIncidentCategories } from "../actions/settings/incident-category-actions";
import { getAllDepartments } from "../actions/settings/department-actions";
import { toast } from "@/components/ui/use-toast";

export function useIncidentsQuery(
  parameters?: {
    severity?: string | null;
    search?: string | null;
    start_date?: string | null;
    end_date?: string | null;
  } | null,
) {
  // construct a query string from the parameters object
  const result = Object.entries(parameters || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const generateQueryString = (
    result: { name: string; value: string | null }[],
  ) => {
    return result
      .filter((param) => param.value) // Filter out falsy values
      .map((param) => `${param.name}=${param.value}`)
      .join("&");
  };

  const filter = generateQueryString(result);

  const {
    data: incidents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["incidents", filter],
    queryFn: async () => (await fetchData(`incidents?${filter}`)) as Incident[],
  });

  return { incidents, error, isLoading };
}

export function useCreateIncidentMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createNewIncident } = useMutation({
    mutationFn: async (data: z.infer<typeof incidentSchema>) => {
      return await createIncident(data);
    },
    onSuccess: (data) => {
      router.replace(`/incidents/${data.referenceNumber}`);
      queryClient.invalidateQueries({ queryKey: ["incidents"] });

      // toaster
      toast({
        title: "Incident Created",
        description: "Incident created successfully",
      });
    },
    onError: (error) => {
      console.log("error", error.message);
    },
  });
  return { createNewIncident };
}

export function useUpdateIncidentMutation() {
  const queryClient = useQueryClient();

  const { mutate: updateIncidentData } = useMutation({
    mutationFn: async (data: z.infer<typeof incidentSchema>) => {
      return await updateIncident(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["incidents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["incident"],
      });
      // toaster
      toast({
        title: "Incident Updated",
        description: "Incident updated successfully",
      });
    },
    onError: (error) => {
      console.log("error", error.message);
    },
  });
  return { updateIncidentData };
}

export function useCategoryTypesQuery() {
  const {
    data: category_types,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoryTypes"],
    queryFn: () => getAllIncidentTypes(),
  });
  return { category_types, isLoading, error };
}

export function useCategoriesQuery() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["incident_categories"],
    queryFn: () => getAllIncidentCategories(),
  });
  return { categories, isLoading, error };
}

export function useDepartmentsQuery() {
  const {
    data: departments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getAllDepartments(),
  });
  return { departments, isLoading, error };
}

const useIncidentsHook = () => {
  return {
    useIncidentsQuery,
    useCreateIncidentMutation,
    // FetchIncidentQuery,
    useCategoryTypesQuery,
    useCategoriesQuery,
    useDepartmentsQuery,
  };
};

export default useIncidentsHook;
