import {
  useCategoriesQuery,
  useIncidentsQuery,
} from "@/app/hooks/incidents-hook";
import { IncidentType } from "@/typings";
import { Card, DonutChart, Title } from "@tremor/react";
import { FC } from "react";

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
        colors={[
          "slate",
          "violet",
          "gray",
          "indigo",
          "rose",
          "cyan",
          "amber",
          "red",
          "orange",
          "yellow",
          "lime",
          "green",
          "zinc",
          "neutral",
          "stone",
          "emerald",
          "teal",
          "sky",
          "blue",
          "purple",
          "fuchsia",
          "pink",
        ]}
      />
    </Card>
  );
};

export default IncidentTypeDonut;
