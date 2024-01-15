"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useIncidentsQuery } from "../hooks/incidents-hook";
import { z } from "zod";
import { filterSchema } from "@/lib/schemas/filter-schema";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Dispatch from "./dispatch/mainpage";
import Link from "next/link";
import { Incident } from "@/typings";

// interface FilterResultsProps {
//   params?: { [key: string]: string | string[] | undefined };
// }

const FilterResults = ({
  incidents,
  filter,
}: {
  incidents: Incident[];
  filter: string;
}) => {
  // const params = useSearchParams();
  // const search = params.get("search");
  // const cat_type_id = params.get("cat_type_id");
  // const cat_id = params.get("cat_id");
  // const severity = params.get("severity");
  // const start_date = params.get("start_date");
  // const end_date = params.get("end_date");
  // const involved_nationality = params.get("involved_nationality");
  // const involved_name = params.get("involved_name");
  // const involved_dept = params.get("involved_dept");
  // const involved_id = params.get("involved_id");
  // const reporter_dept = params.get("reporter_dept");
  // const reporter_name = params.get("reporter_name");

  // const parameters: z.infer<typeof filterSchema> = {
  //   search,
  //   cat_type_id,
  //   cat_id,
  //   severity,
  //   start_date,
  //   end_date,
  //   involved_nationality,
  //   involved_name,
  //   involved_dept,
  //   involved_id,
  //   reporter_dept,
  //   reporter_name,
  // } as any;

  // console.log({ parameters });

  // // @ts-ignore
  // const { incidents } = useIncidentsQuery(parameters);

  return (
    <div className="space-y-3 p-5">
      <div className=" space-y-3">
        <h1 className="text-2xl font-bold">Filter Results</h1>
        <p className="text-sm">{incidents?.length} Found</p>
        <div className="text-sm">
          <Link href={`/incidents?${filter}`}>View Found</Link>
        </div>
        <div className="">
          {incidents && (
            <PDFDownloadLink
              document={<Dispatch incidents={incidents} />}
              fileName={`${incidents[0]?.entity.code}-Dispatch-Report-${moment(
                incidents[0]?.incidentTime,
              ).format("DD-MM-YYYY")}`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  `Loading document...`
                ) : (
                  <Button>Download Report</Button>
                )
              }
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterResults;
