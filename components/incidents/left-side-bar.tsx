import React from "react";
import IncidentsList from "@/app/(home)/incidents/incident-list";
import LeftBarTopMenu from "./left-bar-top-menu";

const IncidentsLeftSideBar = () => {
  return (
    <div className="">
      <LeftBarTopMenu />
      <IncidentsList />
    </div>
  );
};

export default IncidentsLeftSideBar;
