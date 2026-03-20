"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { TechnologyBrochure } from "@/components/brochures/TechnologyBrochure";


export default function DownloadBrochure() {
  return (
    <PDFDownloadLink
      document={<TechnologyBrochure />}
      fileName="Myria-Technology-Brochure.pdf"
      style={{
        padding: "10px 20px",
        backgroundColor: "#1f2937",
        color: "#ffffff",
        borderRadius: 6,
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      {({ loading }) => (loading ? "Generating PDF..." : "Download Brochure")}
    </PDFDownloadLink>
  );
}
