"use client";
import { fetchData } from "@/app/actions/fetch-helper";
import { getIncident } from "@/app/actions/incident.actions";
import { getAllDepartments } from "@/app/actions/settings/department-actions";
import { getAllIncidentCategories } from "@/app/actions/settings/incident-category-actions";
import { countries } from "@/lib/countries";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { format } from "date-fns";
// import moment from "moment";
import React from "react";

interface PageProps {
  params: {
    referenceNumber: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { data: incident_categories } = useQuery({
    queryKey: ["incident_categories"],
    queryFn: async () => await getAllIncidentCategories(),
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => await getAllDepartments(),
  });

  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => await fetchData("user-profiles/own"),
  });

  const {
    data: incident,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["incident", params.referenceNumber],
    queryFn: async () => await getIncident(params.referenceNumber),
    enabled:
      !!params.referenceNumber &&
      !!departments &&
      !!incident_categories &&
      !!profiles,
  });

  if (error) {
    return <>An error has occurred: {error.message}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!incident) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="border-b">
          <div className="flex items-center justify-between gap-4 p-4">
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-primary/80">
                {incident.category?.name}
              </p>
              <p className="text-xs">{incident.category.incidentType?.name}</p>
              <div className="text-sm text-muted-foreground">
                Severity:{" "}
                <span
                  className={clsx(
                    incident.severity === "Medium"
                      ? "text-orange-400"
                      : incident.severity === "High" && "text-red-500",
                    "text-sm font-semibold",
                  )}
                >
                  {incident.severity}
                </span>
              </div>
            </div>
            <div className="flex justify-end text-sm text-muted-foreground">
              <div className="">
                <p className="">Ref: {incident.referenceNumber}</p>
                <p className="text-xs">
                  <span>Time:</span>{" "}
                  {format(new Date(incident.incidentTime), "d/MM/yyyy HH:mm")}
                  hrs
                </p>
                <p className="text-xs">
                  <span>Completed:</span>{" "}
                  {format(
                    new Date(incident.incidentClosedTime),
                    "d/MM/yyyy HH:mm",
                  )}
                  hrs
                </p>
              </div>
            </div>
            <div className=" text-muted-foreground">
              <p className="text-xs">
                Reported By: {incident.reporterName}/{" "}
                {incident.reporterDepartment.name}
              </p>
              <p className="text-xs">
                <span>Compiled By:</span> {incident.compiler.name} - ID:
                {incident.compiler.idNumber}
              </p>
              {incident.compilerEmail !== incident.editorEmail && (
                <p className="text-xs">
                  <span>Edited By:</span> {incident.editor?.name} - ID:
                  {incident.editor.idNumber}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="px-4">
          <h6 className="text-sm font-semibold">Description</h6>

          <div className="flex-1 whitespace-pre-wrap text-sm text-muted-foreground">
            {incident.description}
          </div>
        </div>
        <div className="px-4">
          <h6 className="text-sm font-semibold">Action Taken</h6>
          <p className="text-justify text-sm text-muted-foreground">
            {incident.investigation}
          </p>
        </div>
        {incident.PeopleInvolved.length > 0 && (
          <div className="px-4">
            <h6 className="text-sm font-semibold">People Involved</h6>

            {incident.PeopleInvolved.map((person) => {
              const nationality = countries.find(
                (country) => country.code === person.nationality,
              );

              return (
                <div className="mb-5" key={person.id}>
                  <div className="grid grid-cols-4 gap-3">
                    <p className="col-span-2 text-xs text-muted-foreground">
                      {person.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {nationality?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID:{person.identity_number}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {person.remarks}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
