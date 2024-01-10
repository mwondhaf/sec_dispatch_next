"use client";

import { deleteCompany } from "@/app/actions/settings/company-actions";
import { deleteEntity } from "@/app/actions/settings/entity-actions";
import { EditCompanyDialog } from "@/components/company/edit-company-dialog";
import { EditEntityDialog } from "@/components/entities/edit-entity-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Company, Entity } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

export const columns: ColumnDef<Company>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const company = row.original as Company;
      return (
        <div className="hover:cursor-pointer">
          <EditCompanyDialog {...{ company }} />
        </div>
      );
    },
  },
  {
    accessorKey: "workScope",
    header: "Work Scope",
  },
  {
    accessorKey: "trade_license_number",
    header: "Trade License No.",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original as Company;

      const handleDelete = async () => {
        await deleteCompany(company.id);
      };

      return (
        <div>
          <Button onClick={handleDelete} variant="destructive" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
