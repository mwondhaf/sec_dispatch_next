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
  "rgba(255, 206, 86, 0.9)", // corrected opacity value
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

  const days = daysOfWeek.map((day) => format(day, "dd-MM-yyyy"));

  let datasets: Dataset[] = [];
  incidentTypes.forEach((type, index) => {
    const incidentsByWeekday: Record<string, Array<Incident>> = {};

    const filteredIncidents = incidents.filter((incident) => {
      return (
        incident.category.incidentType?.name.toLowerCase() ===
        type.name.toLowerCase()
      );
    });

    days.forEach((day) => {
      incidentsByWeekday[day] = filteredIncidents.filter((incident) => {
        return format(new Date(incident.incidentTime), "dd-MM-yyyy") === day;
      });
    });

    const incidentsByWeekdayArray = Object.values(incidentsByWeekday).map(
      (value) => value.length,
    );

    datasets.push({
      label: type.name.toUpperCase(),
      data: incidentsByWeekdayArray,
      fill: false,
      borderColor: graphColors[index % graphColors.length], // Corrected color selection
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
  let monthDatasets: Dataset[] = [];

  for (let i = 0; i < 13; i++) {
    currentYearMonths.push(format(subDays(new Date(), i * 30), "MMM yy"));
  }

  const incidentsByMonth: Record<string, Array<Incident>> = {};

  incidentTypes.forEach((type, index) => {
    const filteredIncidents = incidents.filter((incident) => {
      return (
        incident.category.incidentType?.name.toLowerCase() ===
        type.name.toLowerCase()
      );
    });

    currentYearMonths.forEach((month) => {
      incidentsByMonth[month] = filteredIncidents.filter((incident) => {
        return format(new Date(incident.incidentTime), "MMM yy") === month;
      });
    });

    const incidentsByMonthArray = Object.values(incidentsByMonth).map(
      (value) => value.length,
    );

    monthDatasets.push({
      label: type.name.toUpperCase(),
      data: incidentsByMonthArray.reverse(),
      fill: false,
      borderColor: graphColors[index % graphColors.length], // Corrected color selection
      tension: 0.1,
    });
  });

  return { months: currentYearMonths.reverse().slice(1), monthDatasets };
};

export const monthWeekLineGraph = (
  incidents: Incident[],
  incidentTypes: IncidentType[],
) => {
  const weeks: string[] = [];
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

    const filteredIncidents = incidents.filter((incident) => {
      return (
        incident.category.incidentType?.name.toLowerCase() ===
        type.name.toLowerCase()
      );
    });

    currentMonthWeeks.forEach((week) => {
      incidentsByWeek[week] = filteredIncidents.filter((incident) => {
        return format(new Date(incident.incidentTime), "MMM d yy") === week;
      });
    });

    const incidentsByWeekArray = Object.values(incidentsByWeek).map(
      (value) => value.length,
    );

    monthWeekDatasets.push({
      label: type.name.toUpperCase(),
      data: incidentsByWeekArray.reverse(),
      fill: false,
      borderColor: graphColors[index % graphColors.length], // Corrected color selection
      tension: 0.1,
    });
  });

  return { weeks: weeks.reverse(), monthWeekDatasets };
};
