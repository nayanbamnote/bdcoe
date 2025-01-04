"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import TableWrapper from "./shared/TableWrapper";
import TableContent from "./shared/TableContent";

interface AcademicDetail {
  label: string;
  year: string;
  totalMarks: number;
  outOfMarks: number;
  percentage: string;
}

const ACADEMIC_LABELS = [
  "SSC",
  "HSC/Diploma",
  "1-Sem",
  "2-Sem",
  "3-Sem",
  "4-Sem",
  "5-Sem",
  "6-Sem",
  "7-Sem",
  "8-Sem",
];

const ACADEMIC_COLUMNS = [
  { header: "Examination", key: "label" },
  { header: "Year", key: "year", placeholder: "YYYY" },
  { header: "Marks Obtained", key: "totalMarks", type: "number", placeholder: "0" },
  { header: "Out Of", key: "outOfMarks", type: "number", placeholder: "0" },
  { header: "Percentage", key: "percentage" }
];

const AcademicsTable: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [academicDetails, setAcademicDetails] = useState<AcademicDetail[]>(
    ACADEMIC_LABELS.map((label) => ({
      label,
      year: "",
      totalMarks: 0,
      outOfMarks: 0,
      percentage: "",
    }))
  );

  useEffect(() => {
    const fetchAcademicDetails = async () => {
      try {
        const response = await fetch("/api/academic-details");
        const { data } = await response.json();
        if (data && data.length > 0) {
          const mergedData = ACADEMIC_LABELS.map((label) => {
            const existingRecord = data.find((d: AcademicDetail) => d.label === label);
            return existingRecord || {
              label,
              year: "",
              totalMarks: 0,
              outOfMarks: 0,
              percentage: "",
            };
          });
          setAcademicDetails(mergedData);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load academic details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcademicDetails();
  }, [toast]);

  const handleInputChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setAcademicDetails((prev) => {
      const updated = [...prev];
      const updatedDetail = { ...updated[index] };

      if (field === "totalMarks" || field === "outOfMarks") {
        (updatedDetail as any)[field] = parseInt(value) || 0;
        if (updatedDetail.outOfMarks > 0) {
          const percentage = (updatedDetail.totalMarks / updatedDetail.outOfMarks) * 100;
          updatedDetail.percentage = percentage.toFixed(2);
        }
      } else {
        (updatedDetail as any)[field] = value;
      }

      updated[index] = updatedDetail;
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/academic-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(academicDetails),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Academic details updated successfully",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-[16px]">Loading...</div>;
  }

  return (
    <TableWrapper
      title="Academic History"
      isEditing={isEditing}
      isSaving={isSaving}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    >
      <TableContent
        columns={ACADEMIC_COLUMNS}
        data={academicDetails}
        isEditing={isEditing}
        onInputChange={handleInputChange}
      />
    </TableWrapper>
  );
};

export default AcademicsTable; 