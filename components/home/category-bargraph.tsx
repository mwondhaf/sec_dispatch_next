"use client";
import React, { useState } from "react";
import {
  BarList,
  Bold,
  Card,
  DateRangePickerValue,
  Flex,
  Text,
} from "@tremor/react";
import {
  useCategoriesQuery,
  useIncidentsQuery,
} from "@/app/hooks/incidents-hook";
// import { DateRangePicker } from "./date-range-picker";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@tremor/react";

interface CategoryBarGraphProps {}
var today = new Date();
const startOfMonthDate = startOfMonth(today);

const defaultDateRange: DateRange = {
  from: startOfMonthDate,
  to: new Date(),
};

const CategoryBarGraph: React.FC<CategoryBarGraphProps> = (props) => {
  const { categories } = useCategoriesQuery();

  const [dateRange, setDateRange] = useState<DateRangePickerValue | undefined>(
    defaultDateRange,
  );

  let { incidents } = useIncidentsQuery({
    start_date: dateRange?.from
      ? new Date(dateRange?.from).toISOString()
      : new Date(startOfMonthDate).toISOString(),
    end_date: dateRange?.to
      ? new Date(dateRange?.to).toISOString()
      : dateRange?.to?.toISOString(),
  });

  if (!incidents || !categories) return null;

  // find all incidents by each category and count them and group them by highest count and limit to 10
  const graphData = categories
    ?.map((category) => {
      const count = incidents?.filter(
        (incident) => incident.category.name === category.name,
      ).length;
      return {
        name: category.name,
        value: count,
      };
    })
    .sort((a, b) => b.value! - a.value!)
    .slice(0, 10);

  if (!graphData) return null;

  return (
    <>
      <div className="mb-3 ">
        <div className="gap-2">
          <div className="col-span-2">
            <h3 className="text-sm font-semibold">
              Categories Statistics - Top 10
            </h3>
          </div>
          <div className="">
            <DateRangePicker
              placeholder="Select date range"
              onValueChange={(value) => {
                setDateRange(value);
              }}
              defaultValue={defaultDateRange}
              value={dateRange}
              weekStartsOn={1}
            />
          </div>
        </div>
      </div>
      <Card className="max-w-lg">
        <Flex className="">
          <Text>
            <Bold>Category</Bold>
          </Text>
          <Text>
            <Bold>Count</Bold>
          </Text>
        </Flex>
        <BarComponent data={graphData as []} className="mt-2" />
      </Card>
    </>
  );
};

// memoize component to prevent re-rendering
function BarComponent({ data, className }: any) {
  return <BarList className={className} data={data} />;
}

export default CategoryBarGraph;
