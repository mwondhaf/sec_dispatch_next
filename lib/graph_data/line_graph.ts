import { Incident, IncidentType } from "@/typings";
import { eachDayOfInterval, subDays, format } from "date-fns";

interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
}

const graphColors = [
  "rgba(255, 99, 132, 0.9)",
  "rgba(54, 162, 235, 0.9)",
  "rgba(75, 192, 192, 0.9)",
  "rgba(255, 206, 86, 0.2)",
];

export const weeklyLineGraph = (
  incidents: Incident[],
  incidentTypes: IncidentType[],
) => {
  const daysOfWeek = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  const weekdays = daysOfWeek.map((day) => format(day, "EEE"));

  // return an object with the month and date
  const days = daysOfWeek.map((day) => format(day, "dd-MM-yyyy"));

  let datasets: Dataset[] = [];
  incidentTypes.forEach((type, index) => {
    const incidentsByWeekday: Record<string, Array<Incident>> = {};

    const filteredIncidents = incidents?.filter((incident) => {
      return (
        incident.category.incidentType?.name.toLocaleLowerCase() ===
        type.name.toLocaleLowerCase()
      );
    });

    days.forEach((day) => {
      incidentsByWeekday[day] = filteredIncidents?.filter((incident) => {
        return format(new Date(incident.incidentTime), "dd-MM-yyyy") === day;
      });
    });

    const incidentsByWeekdayArray = Object.entries(incidentsByWeekday).map(
      ([key, value]) => {
        return value?.length;
      },
    );

    datasets.push({
      label: type.name.toUpperCase(),
      data: incidentsByWeekdayArray,
      fill: false,
      borderColor: graphColors[index],
      tension: 0.1,
    });
  });

  return { weekdays, datasets };
};

export const monthlyLineGraph = (
  incidents: Incident[],
  incidentTypes: IncidentType[],
) => {
  const currentYearMonths: string[] = [];

  // current year months and year
  for (let i = 0; i < 13; i++) {
    currentYearMonths.push(format(subDays(new Date(), i * 30), "MMM yy"));
  }

  let monthDatasets: Dataset[] = [];
  incidentTypes.forEach((type, index) => {
    const incidentsByMonth: Record<string, Array<Incident>> = {};

    const filteredIncidents = incidents?.filter((incident) => {
      return (
        incident.category.incidentType?.name.toLocaleLowerCase() ===
        type.name.toLocaleLowerCase()
      );
    });

    currentYearMonths.forEach((month) => {
      incidentsByMonth[month] = filteredIncidents?.filter((incident) => {
        return format(new Date(incident.incidentTime), "MMM yy") === month;
      });
    });

    const incidentsByMonthArray = Object.entries(incidentsByMonth).map(
      ([key, value]) => {
        return value?.length;
      },
    );

    monthDatasets.push({
      label: type.name.toUpperCase(),
      data: incidentsByMonthArray.reverse(),
      fill: false,
      borderColor: graphColors[index],
      tension: 0.1,
    });
  });

  return { months: currentYearMonths.reverse(), monthDatasets };
};

export const monthWeekLineGraph = (
  incidents: Incident[],
  incidentTypes: IncidentType[],
) => {
  const weeks: string[] = [];

  // current month weeks
  const currentMonthWeeks: string[] = [];

  for (let i = 0; i < 5; i++) {
    weeks.push(format(subDays(new Date(), i * 7), "MMM d"));
  }

  for (let i = 0; i < 5; i++) {
    currentMonthWeeks.push(format(subDays(new Date(), i * 7), "MMM d yy"));
  }

  let monthWeekDatasets: Dataset[] = [];
  incidentTypes.forEach((type, index) => {
    const incidentsByWeek: Record<string, Array<Incident>> = {};

    const filteredIncidents = incidents?.filter((incident) => {
      return (
        incident.category.incidentType?.name.toLocaleLowerCase() ===
        type.name.toLocaleLowerCase()
      );
    });

    currentMonthWeeks.forEach((week) => {
      incidentsByWeek[week] = filteredIncidents?.filter((incident) => {
        return format(new Date(incident.incidentTime), "MMM d yy") === week;
      });
    });

    const incidentsByWeekArray = Object.entries(incidentsByWeek).map(
      ([key, value]) => {
        return value?.length;
      },
    );

    monthWeekDatasets.push({
      label: type.name.toUpperCase(),
      data: incidentsByWeekArray.reverse(),
      fill: false,
      borderColor: graphColors[index],
      tension: 0.1,
    });
  });

  return { weeks: weeks.reverse(), monthWeekDatasets };
};
