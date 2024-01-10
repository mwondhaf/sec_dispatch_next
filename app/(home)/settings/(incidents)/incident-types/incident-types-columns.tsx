"use client";

import { deleteEntity } from "@/app/actions/settings/entity-actions";
import { deleteIncidentType } from "@/app/actions/settings/incident-type-actions";
import { EditIncidentTypeDialog } from "@/components/incidents/edit-incident-type-dialog";
import { Entity, IncidentType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

export const columns: ColumnDef<IncidentType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const incident_type = row.original as IncidentType;
      return (
        <div className="hover:cursor-pointer">
          <EditIncidentTypeDialog {...{ incident_type }} />
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const incident_type = row.original as IncidentType;

      const handleDelete = async () => {
        await deleteIncidentType(incident_type.id.toString());
      };

      return (
        <div className="hover:cursor-pointer">
          <Trash onClick={handleDelete} className="h-4 w-4" />
        </div>
      );
    },
  },
];
