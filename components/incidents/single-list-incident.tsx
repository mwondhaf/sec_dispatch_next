"use client";
import { Incident } from "@/typings";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import moment from "moment";

interface SingleListIncidentProps {
  incident: Incident;
}

const SingleListIncident: React.FC<SingleListIncidentProps> = ({
  incident,
}) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const isActive = pathname.includes(incident.referenceNumber);

  return (
    <div
      className={clsx(
        isActive && "bg-accent",
        clsx(
          incident.severity === "Medium"
            ? "border-yellow-300"
            : incident.severity === "High" && "border-red-100",
          "justify-between gap-2 rounded-lg border p-3 hover:bg-accent",
        ),
      )}
    >
      <Link href={`/incidents/${incident.referenceNumber}/view?${params}`}>
        <div className="space-y-1">
          <div className="flex  items-center justify-between ">
            <div className="flex gap-1">
              <p className="text-xs text-gray-500">{incident.reporterName}</p>
              <p className="text-xs text-gray-500">
                /{incident.reporterDepartment.name}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-foreground">
                {moment(incident.incidentTime).format("lll")}
              </p>
            </div>
          </div>

          {/* <h3 className="text-xl">{incident.title}</h3> */}
          <p className="text-sm font-semibold">{incident.category.name}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {incident.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SingleListIncident;
