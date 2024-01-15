"use client";
import {
  useCategoriesQuery,
  useDepartmentsQuery,
  useIncidentsQuery,
} from "@/app/hooks/incidents-hook";
import SingleListIncident from "@/components/incidents/single-list-incident";
import { filterSchema } from "@/lib/schemas/filter-schema";
import { useSearchParams } from "next/navigation";
import React from "react";
import { z } from "zod";

const IncidentsList = () => {
  const params = useSearchParams();
  // const parameters = {
  //   severity: params.get("severity"),
  //   search: params.get("search"),
  // };

  const search = params.get("search");
  const cat_type_id = params.get("cat_type_id");
  const cat_id = params.get("cat_id");
  const severity = params.get("severity");
  const start_date = params.get("start_date");
  const end_date = params.get("end_date");
  const involved_nationality = params.get("involved_nationality");
  const involved_name = params.get("involved_name");
  const involved_dept = params.get("involved_dept");
  const involved_id = params.get("involved_id");
  const reporter_dept = params.get("reporter_dept");
  const reporter_name = params.get("reporter_name");

  const parameters = {
    search,
    cat_type_id,
    cat_id,
    severity,
    start_date,
    end_date,
    involved_nationality,
    involved_name,
    involved_dept,
    involved_id,
    reporter_dept,
    reporter_name,
  } as any;

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
