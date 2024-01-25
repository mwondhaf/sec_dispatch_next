import { getAllIncidentTypes } from "@/app/actions/settings/incident-type-actions";
import { DataTable } from "@/components/datatable/data-table";
import React from "react";
import { columns } from "./incident-types-columns";
import { CreateIncidentTypeDialog } from "@/components/incidents/create-incident-type-dialog";

const IncidentTypes = async () => {
  const incidentTypes = await getAllIncidentTypes();

  return (
    <div className="space-y-5">
      <div className="items center flex justify-between">
        <h5 className="text-md font-semibold text-gray-500">
          Occurrence Types
        </h5>

        <CreateIncidentTypeDialog />
      </div>
      <DataTable columns={columns} data={incidentTypes} />
    </div>
  );
};

export default IncidentTypes;
