"use client";
import { deleteDepartment } from "@/app/actions/settings/department-actions";
import { EditReporterDepartmentDialog } from "@/components/incidents/edit-reporter-department-dialog";
import { Department } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const department = row.original as Department;
      return (
        <div className="hover:cursor-pointer">
          <EditReporterDepartmentDialog {...{ department }} />
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const department = row.original as Department;

      const handleDelete = async () => {
        await deleteDepartment(department.id.toString());
      };

      return (
        <div className="hover:cursor-pointer">
          <Trash onClick={handleDelete} className="h-4 w-4" />
        </div>
      );
    },
  },
];
