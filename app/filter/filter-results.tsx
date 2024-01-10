"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useIncidentsQuery } from "../hooks/incidents-hook";
import { z } from "zod";
import { filterSchema } from "@/lib/schemas/filter-schema";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Dispatch from "./dispatch/page";

interface FilterResultsProps {
  params?: { [key: string]: string | string[] | undefined };
}

const FilterResults: React.FC<FilterResultsProps> = () => {
  const params = useSearchParams();
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

  const parameters: z.infer<typeof filterSchema> = {
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

  const { incidents } = useIncidentsQuery(parameters);

  // use font that supports Arabic

  return (
    <div className="p-5">
      {incidents && (
        <PDFDownloadLink
          document={<Dispatch incidents={incidents} />}
          fileName={`${incidents[0]?.entity.code}-Dispatch-Report-${moment(
            incidents[0]?.incidentTime,
          ).format("DD-MM-YYYY")}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? `Loading document...` : <Button>Download now</Button>
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default FilterResults;
