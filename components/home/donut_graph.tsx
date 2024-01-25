import { useCategoriesQuery } from "@/app/hooks/incidents-hook";
import { IncidentType } from "@/typings";
import { Card, DonutChart, Title } from "@tremor/react";
import { FC } from "react";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

interface IncidentTypeDonutProps {
  cat_type: IncidentType;
}

const IncidentTypeDonut: FC<IncidentTypeDonutProps> = ({ cat_type }) => {
  const { categories, isLoading: categoriesLoading } = useCategoriesQuery();

  const filteredByType = categories?.filter(
    (category) => category.incidentTypeId === cat_type.id,
  );

  // array reduce to get the count of each category
  const graphData = categories?.map((category) => {
    const count = filteredByType?.filter(
      (incident) => incident.name === category.name,
    ).length;
    return {
      name: category.name,
      value: count,
    };
  });

  return (
    <Card className="max-w-lg">
      <Title>{cat_type.name}</Title>
      <DonutChart
        className="mt-6"
        data={graphData as []}
        category="value"
        index="name"
        // valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
};

export default IncidentTypeDonut;
