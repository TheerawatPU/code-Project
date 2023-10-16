import React from "react";
import { Document, Page, Text, View, StyleSheet , PDFDownloadLink } from "@react-pdf/renderer";
import { jsPDF } from "jspdf";

const InvoiceJsPDF = ({order}) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  // Create Document Component

  return (
    <div>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #10</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #20</Text>
          </View>
        </Page>
      </Document>
    </div>
  );
};

export default InvoiceJsPDF;
