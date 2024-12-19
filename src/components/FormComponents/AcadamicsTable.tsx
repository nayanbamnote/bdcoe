import React, { useState } from "react";
import TableSection from "../TableComponents/TableSection";
import { useToast } from "@/hooks/use-toast"; // Import toast hook

const AcademicDetails = () => {
  const academicColumns = [
    { key: "label", label: "Year and Semester", editable: false },
    { key: "year", label: "Year of Passing", editable: true },
    { key: "totalMarks", label: "Total Marks", editable: true, type: "number" },
    { key: "outOfMarks", label: "Out of Marks", editable: true, type: "number" },
    { key: "percentage", label: "Percentage/CGPA", editable: true },
  ];

  const initialAcademicData = [
    { label: "SSC", year: "2015", totalMarks: 500, outOfMarks: 600, percentage: "83.33%" },
    { label: "HSC", year: "2017", totalMarks: 450, outOfMarks: 500, percentage: "90%" },
    { label: "DIPLOMA", year: "2018", totalMarks: 700, outOfMarks: 800, percentage: "87.5%" },
    { label: "Sem-1", year: "2020", totalMarks: 600, outOfMarks: 700, percentage: "85.71%" },
    { label: "Sem-2", year: "2020", totalMarks: 600, outOfMarks: 700, percentage: "85.71%" },
    { label: "Sem-3", year: "2020", totalMarks: 600, outOfMarks: 700, percentage: "85.71%" },
    { label: "Sem-4", year: "2020", totalMarks: 600, outOfMarks: 700, percentage: "85.71%" },
    { label: "Sem-5", year: "2020", totalMarks: 600, outOfMarks: 700, percentage: "85.71%" },
    { label: "Sem-6", year: "2020", totalMarks: 600, outOfMarks: 700, percentage: "85.71%" },
    { label: "Sem-7", year: "2020", totalMarks: 600, outOfMarks: 700, percentage: "85.71%" },
    { label: "Sem-8", year: "2020", totalMarks: 600, outOfMarks: 700, percentage: "85.71%" },
  ];

  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: Record<string, any>[]) => {
    try {
      setIsSaving(true);

      const formattedData = data.map(row => ({
        ...row,
        percentage: row.percentage || ((row.totalMarks / row.outOfMarks) * 100).toFixed(2),
      }));

      const response = await fetch("/api/academicDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || "Failed to save data");
      }

      toast({
        title: "Success",
        description: "Academic details saved successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TableSection
      title="ACADEMIC DETAILS"
      columns={academicColumns}
      initialData={initialAcademicData}
      onSave={handleSave}
      isSaving={isSaving}
    />
  );
};

export default AcademicDetails;
