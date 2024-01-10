import { DataTable } from "@/components/datatable/data-table";
import React from "react";
import { columns } from "./incident-categories-columns";
import { getAllIncidentCategories } from "@/app/actions/settings/incident-category-actions";
import { CreateIncidentCategoryDialog } from "@/components/incidents/create-incident-category-dialog";
import { getAllIncidentTypes } from "@/app/actions/settings/incident-type-actions";

const IncidentCategories = async () => {
  const [incidentCategories, incidentTypes] = await Promise.all([
    getAllIncidentCategories(),
    getAllIncidentTypes(),
  ]);

  return (
    <div className="space-y-5">
      <div className="items center flex justify-between">
        <h5 className="text-md font-semibold text-gray-500">
          Incident Categories
        </h5>
        <CreateIncidentCategoryDialog {...{ incidentTypes }} />
      </div>
      <DataTable columns={columns} data={incidentCategories} />
    </div>
  );
};

export default IncidentCategories;
