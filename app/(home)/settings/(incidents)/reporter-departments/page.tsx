import { getAllIncidentTypes } from "@/app/actions/settings/incident-type-actions";
import { DataTable } from "@/components/datatable/data-table";
import React from "react";
import { CreateIncidentTypeDialog } from "@/components/incidents/create-incident-type-dialog";
import { getAllDepartments } from "@/app/actions/settings/department-actions";
import { columns } from "./reporter-departments-columns";
import { CreateReporterDepartmentDialog } from "@/components/incidents/create-reporter-department-dialog";

const ReporterDepartments = async () => {
  const departments = await getAllDepartments();

  return (
    <div className="space-y-5">
      <div className="items center flex justify-between">
        <h5 className="text-md font-semibold text-gray-500">
          Reporter Departments
        </h5>
        <CreateReporterDepartmentDialog />
        {/* <CreateIncidentTypeDialog /> */}
      </div>
      <DataTable columns={columns} data={departments} />
    </div>
  );
};

export default ReporterDepartments;
