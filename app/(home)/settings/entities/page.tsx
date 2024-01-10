import { getAllEntities } from "@/app/actions/settings/entity-actions";
import { DataTable } from "@/components/datatable/data-table";
import React from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { CreateEntityDialog } from "@/components/entities/create-entity-dialog";

const EntitiesPage = async () => {
  const entities = await getAllEntities();

  return (
    <div className="pr-5 pt-5">
      <div className="flex items-center justify-between pb-5">
        <div className=""></div>
        <div className="">
          <CreateEntityDialog />
        </div>
      </div>
      <DataTable columns={columns} data={entities} />
    </div>
  );
};

export default EntitiesPage;
