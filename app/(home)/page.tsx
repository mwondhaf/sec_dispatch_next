import React from "react";
import LineGraph from "@/components/home/line-graph";
import IntroDetails from "@/components/home/intro-details";
import CategoryBarGraph from "@/components/home/category-bargraph";
import { Card } from "@tremor/react";
import DaySummaryIncidents from "@/components/home/day-summary-incidents";

const HomePage = () => {
  return (
    <div className="container h-screen">
      <IntroDetails />
      <div className="flex grid-cols-5 flex-col-reverse gap-6 md:grid">
        <div className="col-span-3">
          <LineGraph />
          <Card className="mt-6">
            <DaySummaryIncidents />
          </Card>
        </div>
        <div className="col-span-2">
          <CategoryBarGraph />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
