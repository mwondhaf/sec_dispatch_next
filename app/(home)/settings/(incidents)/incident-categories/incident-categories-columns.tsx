"use client";

import { deleteIncidentCategory } from "@/app/actions/settings/incident-category-actions";
import { EditIncidentCategoryDialog } from "@/components/incidents/edit-incident-category-dialog";
import { IncidentCategory, IncidentType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

export const columns: ColumnDef<IncidentCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const incident_category = row.original as IncidentCategory;
      return (
        <div className="hover:cursor-pointer">
          <EditIncidentCategoryDialog {...{ incident_category }} />
        </div>
      );
    },
  },

  {
    accessorKey: "type",
    header: "Incident Type",
    cell: ({ row }) => {
      const incident_category = row.original as IncidentCategory;
      const incident_type = incident_category.incidentType as IncidentType;
      return <div className="">{incident_type.name}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const incident_category = row.original as IncidentCategory;

      const handleDelete = async () => {
        await deleteIncidentCategory(incident_category.id.toString());
      };

      return (
        <div className="hover:cursor-pointer">
          <Trash onClick={handleDelete} className="h-4 w-4" />
        </div>
      );
    },
  },
];
