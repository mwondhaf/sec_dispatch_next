"use client";
import {
  useCategoriesQuery,
  useDepartmentsQuery,
  useIncidentsQuery,
} from "@/app/hooks/incidents-hook";
import SingleListIncident from "@/components/incidents/single-list-incident";
import { useSearchParams } from "next/navigation";
import React from "react";

const IncidentsList = () => {
  const params = useSearchParams();
  const parameters = {
    severity: params.get("severity"),
    search: params.get("search"),
  };

  const { incidents, error, isLoading } = useIncidentsQuery(parameters);

  if (error) return <div>{error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  if (!incidents) return <div>No incidents</div>;

  return (
    <div className="space-y-3 px-6 py-3">
      {incidents?.map((incident) => (
        <SingleListIncident key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentsList;
