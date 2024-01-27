import {
  useCategoriesQuery,
  useIncidentsQuery,
} from "@/app/hooks/incidents-hook";
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
  const { incidents, isLoading: incidentsLoading } = useIncidentsQuery();

  const filteredByType = categories?.filter(
    (category) => category.incidentTypeId === cat_type.id,
  );

  // find all incidents by each category and count them and group them by highest count and limit to 10
  const graphData = filteredByType?.map((category) => {
    const count = incidents?.filter(
      (incident) => incident.category.name === category.name,
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
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber", "red"]}
      />
    </Card>
  );
};

export default IncidentTypeDonut;
