import React, { useState } from "react";
import TableSection from "../TableComponents/TableSection";

const ScholarshipDetails = () => {
  const scholarshipColumns = [
    { key: "academicYear", label: "Academic Year", editable: true },
    { key: "type", label: "Type of Scholarship", editable: true },
    { key: "criteria", label: "Criteria", editable: true },
    { key: "amount", label: "Amount of Scholarship", editable: true },
  ];

  const initialScholarshipData = [
    { academicYear: "2020-2021", type: "Merit-based", criteria: "Top 10% in class", amount: "$1000" },
    { academicYear: "2021-2022", type: "Need-based", criteria: "Income below $30,000", amount: "$1500" },
    { academicYear: "2022-2023", type: "Sports", criteria: "State-level winner", amount: "$2000" },
    { academicYear: "2023-2024", type: "Research Grant", criteria: "Published paper in a journal", amount: "$2500" },
  ];

  const [isSaving, setIsSaving] = useState(false);

  const onSave = async (editedData: any[]) => {
    try {
      setIsSaving(true);

      // Format data if necessary
      const formattedData = editedData.map((row) => ({
        academicYear: String(row.academicYear),
        type: String(row.type),
        criteria: String(row.criteria),
        amount: String(row.amount),
      }));

      console.log("Sending formatted data:", formattedData);

      const response = await fetch("/api/scholarshipDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || "Failed to save scholarship details");
      }

      const result = await response.json();
      console.log("Scholarship details saved:", result);
    } catch (error) {
      console.error("Save error:", error);
      alert(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TableSection
      title="SCHOLARSHIP OFFERED DETAILS (IF ANY)"
      columns={scholarshipColumns}
      initialData={initialScholarshipData}
      onSave={onSave}
      isSaving={isSaving}
    />
  );
};

export default ScholarshipDetails;
