"use client";
import {
  useCategoryTypesQuery,
  useIncidentsQuery,
} from "@/app/hooks/incidents-hook";
import React from "react";
import _ from "lodash";
import { Card, Title as TremorTitle } from "@tremor/react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
} from "chart.js";
import {
  monthWeekLineGraph,
  monthlyLineGraph,
  weeklyLineGraph,
} from "@/lib/graph_data/line_graph";
import { Button } from "../ui/button";
import { Incident, IncidentType } from "@/typings";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

interface LineGraphProps {
  incidents: Incident[];
  category_types: IncidentType[];
}

const periods = ["Daily", "Weekly", "Monthly"];

const LineGraph: React.FC<LineGraphProps> = ({ incidents, category_types }) => {
  const [activePeriod, setActivePeriod] = React.useState("Daily");
  // const { incidents } = useIncidentsQuery();
  // const { category_types } = useCategoryTypesQuery();

  if (!incidents || !category_types) return null;

  const { weekdays, datasets } = weeklyLineGraph(incidents, category_types);
  const { months, monthDatasets } = monthlyLineGraph(incidents, category_types);
  const { weeks, monthWeekDatasets } = monthWeekLineGraph(
    incidents,
    category_types,
  );

  const data = {
    labels:
      activePeriod === "Daily"
        ? weekdays
        : activePeriod === "Weekly"
          ? weeks
          : months,
    datasets:
      activePeriod === "Daily"
        ? datasets
        : activePeriod === "Weekly"
          ? monthWeekDatasets
          : monthDatasets,
  };

  return (
    <div className="hidden md:flex">
      <Card>
        <div className="flex items-center justify-between">
          <TremorTitle>Incidents Faring</TremorTitle>
          <div className="flex-items-center pb-4">
            {periods.map((period, index) => (
              <Button
                key={index}
                size={"sm"}
                onClick={() => {
                  setActivePeriod(period);
                }}
                variant={`${activePeriod === period ? "outline" : "ghost"}`}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
        <Line
          options={options}
          data={data}
          {...{ incidents, category_types }}
        />
      </Card>
    </div>
  );
};

export default LineGraph;
