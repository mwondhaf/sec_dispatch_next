"use client";
import { fetchData } from "@/app/actions/fetch-helper";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React from "react";
import IncidentEditForm from "./incident-edit-form";
import { getAllDepartments } from "@/app/actions/settings/department-actions";
import { getAllIncidentCategories } from "@/app/actions/settings/incident-category-actions";
import { useParams, useSearchParams } from "next/navigation";
import { Incident } from "@/typings";

const DetailsPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  console.log({ params });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => await getAllDepartments(),
  });

  const { data: categories } = useQuery({
    queryKey: ["incident_categories"],
    queryFn: async () => await getAllIncidentCategories(),
  });

  const { data: incident, isLoading } = useQuery<Incident>({
    queryKey: ["incidents", params.referenceNumber],
    queryFn: async () => await fetchData(`incidents/${params.referenceNumber}`),
    initialData: () => {
      const data = queryClient.getQueryData(["incidents", ""]);
      //  @ts-ignore
      const incident: Incident = data?.find(
        (d: Incident) => d.referenceNumber === params.referenceNumber,
      );
      return incident;
    },
    enabled: !!departments && !!categories,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!departments || !categories) return <div>Loading...</div>;
  if (!incident) return <div>Incident not found</div>;

  return (
    <div>
      <IncidentEditForm {...{ departments, categories, incident }} />
    </div>
  );
};

export default DetailsPage;
