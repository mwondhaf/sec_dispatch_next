import { getAllCompanies } from "@/app/actions/settings/company-actions";
import { DataTable } from "@/components/datatable/data-table";
import React from "react";
import { columns } from "./company-columns";
import { CreateCompanyDialog } from "@/components/company/create-company-dialog";

const CompanyPage = async () => {
  const companies = await getAllCompanies();

  return (
    <div>
      <div className="pr-5 pt-5">
        <div className="flex items-center justify-between pb-5">
          <div className=""></div>
          <div className="">
            <CreateCompanyDialog />
          </div>
        </div>
        <DataTable columns={columns} data={companies} />
      </div>
    </div>
  );
};

export default CompanyPage;
