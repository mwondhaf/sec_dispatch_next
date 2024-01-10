import React from "react";
import IncidentCreateForm from "./incident-create-form";
import { getAllIncidentCategories } from "@/app/actions/settings/incident-category-actions";
import { getAllDepartments } from "@/app/actions/settings/department-actions";
import { fetchData } from "@/app/actions/fetch-helper";
import { UserProfile } from "@/typings";
import { auth } from "@/auth";

const IncidentHome = async () => {
  const loggedInUser = await auth();

  const [incident_categories, departments] = await Promise.all([
    getAllIncidentCategories(),
    getAllDepartments(),
  ]);

  if (!loggedInUser?.user.UserProfile) return <div>loading...</div>;

  return (
    <div>
      <IncidentCreateForm
        {...{
          incident_categories,
          departments,
          profiles: loggedInUser?.user.UserProfile,
        }}
      />
    </div>
  );
};

export default IncidentHome;
