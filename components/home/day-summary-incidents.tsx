"use client";
import { useIncidentsQuery } from "@/app/hooks/incidents-hook";
import React from "react";
import SingleListIncident from "../incidents/single-list-incident";

// date fns 24hrs ago
var today = new Date();
today.setHours(today.getHours() - 24);

const DaySummaryIncidents = () => {
  const { incidents, error, isLoading } = useIncidentsQuery({
    start_date: today.toISOString(),
  });

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!incidents) return <div>No incidents</div>;
  return (
    <div className="space-y-3">
      <h3 className="">Past 24hr Summary</h3>
      <div className="max-h-[50vh] space-y-3 overflow-scroll">
        {incidents
          ?.filter((i) => i.severity !== "Low")
          .map((incident) => (
            <SingleListIncident key={incident.id} incident={incident} />
          ))}
      </div>
    </div>
  );
};

export default DaySummaryIncidents;
