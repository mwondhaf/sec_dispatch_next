import React from "react";
import FilterForm from "./filter-form";
import FilterResults from "./filter-results";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex gap-5">
      <FilterForm />
      <FilterResults params={searchParams} />
    </div>
  );
};

export default page;
