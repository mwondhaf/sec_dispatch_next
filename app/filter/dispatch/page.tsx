import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Incident } from "@/typings";
import moment from "moment";
import { countries } from "@/lib/countries";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
});

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    // backgroundColor: "#E4E4E4",
    padding: 30,
  },
  section: {
    // margin: 10,
    // padding: 10,
    flexGrow: 1,
  },
  table: {
    // display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0.35,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.35,
    borderStyle: "solid",
  },
  tableCell: {
    width: "7.1428%",
    borderStyle: "solid",
    borderWidth: 0.35,
    padding: 5,
    justifyContent: "center",
  },
  tableCell0: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 0.35,
    padding: 5,
    justifyContent: "center",
  },
  tableCell2: {
    width: "9%",
    borderStyle: "solid",
    borderWidth: 0.35,
    padding: 5,
    justifyContent: "center",
  },
  tableCell4: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 0.35,
    padding: 5,
    justifyContent: "center",
  },
  header_text: {
    fontSize: 9,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  row_text: {
    fontSize: 8,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 5,
    fontFamily: "Roboto",
  },
});

const Dispatch = ({ incidents }: { incidents: Incident[] }) => {
  const headers = [
    "Time",
    "Location",
    "Category",
    "Reporter",
    "Description",
    "Compiler",
    "Action Taken",
    "Severity",
    "Completed",
  ];
  const tableData = incidents.map((item) => [
    moment(item.incidentTime).format("HH:mm"),
    item.location,
    item.category.name,
    `${item.reporterName}/\n ${item.reporterDepartment.name}`,
    item.description,
    item.compiler.name,
    `${
      item.PeopleInvolved.length > 0
        ? `${
            item.investigation
          }\n\n People Involved: \n ${item.PeopleInvolved.map(
            (p) =>
              `${`Name: ${p.name}\n Nationality:${countries.find(
                (c) => c.code === p.nationality,
              )?.name}\n Remarks:${p.remarks} \n\n`}`,
          )}
    `
        : `${item.investigation}`
    }`,
    item.severity,
    moment(item.incidentClosedTime).format("HH:mm"),
  ]);

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Text>{incidents[0]?.entity.name}</Text>
          <Text style={styles.subtitle}>
            Dispatch Report -
            {moment(incidents[0]?.incidentTime).format("DD-MM-YYYY HH:mm")} to{" "}
            {moment(incidents.pop()?.incidentTime).format("DD-MM-YYYY HH:mm")}
          </Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              {headers.map((header, index) => (
                <View
                  key={index}
                  style={
                    index === 4 || index === 6
                      ? styles.tableCell4
                      : index === 0
                        ? styles.tableCell0
                        : index === 2 || index === 3
                          ? styles.tableCell2
                          : styles.tableCell
                  }
                >
                  <Text style={styles.header_text}>{header}</Text>
                </View>
              ))}
            </View>

            {tableData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                {row.map((col, colIndex) => (
                  <View
                    key={colIndex}
                    style={
                      colIndex === 4 || colIndex === 6
                        ? styles.tableCell4
                        : colIndex === 0
                          ? styles.tableCell0
                          : colIndex === 2 || colIndex === 3
                            ? styles.tableCell2
                            : styles.tableCell
                    }
                  >
                    <Text style={styles.row_text}>{col}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Dispatch;
