import { fetchData } from "@/app/actions/fetch-helper";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import IncidentEditForm from "./incident-edit-form";
import { getAllDepartments } from "@/app/actions/settings/department-actions";
import { getAllIncidentCategories } from "@/app/actions/settings/incident-category-actions";

const DetailsPage = async ({
  params,
}: {
  params: { referenceNumber: string };
}) => {
  const [departments, categories] = await Promise.all([
    getAllDepartments(),
    getAllIncidentCategories(),
  ]);

  return (
    <div>
      <IncidentEditForm
        referenceNumber={params.referenceNumber}
        {...{ departments, categories }}
      />
    </div>
  );
};

export default DetailsPage;
