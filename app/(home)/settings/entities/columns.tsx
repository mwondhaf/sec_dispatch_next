"use client";

import { deleteEntity } from "@/app/actions/settings/entity-actions";
import { EditEntityDialog } from "@/components/entities/edit-entity-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Entity } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Entity>[] = [
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
      const entity = row.original as Entity;
      return (
        <div className="hover:cursor-pointer">
          <EditEntityDialog {...{ entity }} />
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Entity Code",
  },
  {
    accessorKey: "makani",
    header: "Makani No.",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const entity = row.original as Entity;

      const handleDelete = async () => {
        await deleteEntity(entity.id);
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
