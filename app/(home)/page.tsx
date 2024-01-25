"use client";
import React from "react";
import LineGraph from "@/components/home/line-graph";
import CategoryBarGraph from "@/components/home/category-bargraph";
import { Card } from "@tremor/react";
import DaySummaryIncidents from "@/components/home/day-summary-incidents";
import {
  useCategoriesQuery,
  useCategoryTypesQuery,
  useIncidentsQuery,
} from "../hooks/incidents-hook";
import IntroDetails from "@/components/home/intro-details";
import LoadingComponent from "@/components/LoadingComponent";
import IncidentTypeDonut from "@/components/home/donut_graph";

const HomePage = () => {
  const { categories, isLoading: categoriesLoading } = useCategoriesQuery();
  const { category_types, isLoading: typesLoading } = useCategoryTypesQuery();
  const { incidents, isLoading: incidentsLoading } = useIncidentsQuery();

  if (categoriesLoading || typesLoading || incidentsLoading)
    return <LoadingComponent />;

  if (!incidents || !category_types || !categories)
    return <div>Something went wrong</div>;

  return (
    <div className="container h-screen">
      <IntroDetails />
      <div className="flex grid-cols-5 flex-col-reverse gap-6 md:grid">
        <div className="col-span-3">
          <LineGraph {...{ incidents, category_types }} />
          <Card className="mt-6">
            <DaySummaryIncidents />
          </Card>
        </div>
        <div className="col-span-2 space-y-5">
          <CategoryBarGraph />
          {/* <Card> */}
          <div className="grid grid-cols-2 gap-3">
            {category_types.map((cat_type) => (
              <IncidentTypeDonut key={cat_type.id} {...{ cat_type }} />
            ))}
          </div>
          {/* </Card> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
