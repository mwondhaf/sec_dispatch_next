import React from "react";
import FilterForm from "./filter-form";
import FilterResults from "./filter-results";
import { fetchData } from "../actions/fetch-helper";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // console.log({ searchParams });

  // const search = searchParams.search
  //   ? searchParams.search.toString()
  //   : undefined;
  // const cat_type_id = searchParams.cat_type_id
  //   ? searchParams.cat_type_id.toString()
  //   : undefined;
  // const cat_id = searchParams.cat_id
  //   ? searchParams.cat_id.toString()
  //   : undefined;
  // const severity = searchParams.severity
  //   ? searchParams.severity.toString()
  //   : undefined;
  // const start_date = searchParams.start_date
  //   ? searchParams.start_date.toString()
  //   : undefined;
  // const end_date = searchParams.end_date
  //   ? searchParams.end_date.toString()
  //   : undefined;
  // const involved_nationality = searchParams.involved_nationality
  //   ? searchParams.involved_nationality.toString()
  //   : undefined;
  // const involved_name = searchParams.involved_name
  //   ? searchParams.involved_name.toString()
  //   : undefined;
  // const involved_dept = searchParams.involved_dept
  //   ? searchParams.involved_dept.toString()
  //   : undefined;
  // const involved_id = searchParams.involved_id
  //   ? searchParams.involved_id.toString()
  //   : undefined;
  // const reporter_dept = searchParams.reporter_dept
  //   ? searchParams.reporter_dept.toString()
  //   : undefined;
  // const reporter_name = searchParams.reporter_name
  //   ? searchParams.reporter_name.toString()
  //   : undefined;

  // construct a query string from the parameters object
  const result = Object.entries(searchParams || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const generateQueryString = (
    result: { name: string; value: string | string[] | undefined }[],
  ) => {
    return result
      .filter((param) => param.value) // Filter out falsy values
      .map((param) => `${param.name}=${param.value}`)
      .join("&");
  };

  const filter = generateQueryString(result);

  const fetchIncidents = async () => {
    const data = await fetchData(`incidents?${filter}`);
    return data;
  };

  const incidents = await fetchIncidents();

  return (
    <div className="flex gap-5">
      <FilterForm />
      <FilterResults {...{ incidents, filter }} />
    </div>
  );
};

export default page;
