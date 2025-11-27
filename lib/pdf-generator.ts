import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PerformanceMetrics } from "@/components/ai-elements/feedback-dashboard";

export async function downloadPDF(
  element: HTMLElement,
  metrics: PerformanceMetrics
) {
  try {
    // Create canvas from HTML
    const canvas = await html2canvas(element, {
      backgroundColor: "#020617",
      scale: 2,
    });

    // Get dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add multiple pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Add metadata
    pdf.setProperties({
      title: "Interview Performance Report",
      subject: `${metrics.domain} - ${metrics.topic}`,
      author: "Interview Preparation System",
    });

    // Download
    pdf.save(
      `interview-report-${metrics.domain}-${Date.now()}.pdf`
    );
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw error;
  }
}
