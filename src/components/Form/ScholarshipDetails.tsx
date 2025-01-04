"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import TableWrapper from "./shared/TableWrapper";
import TableContent from "./shared/TableContent";

interface ScholarshipDetail {
  year: string;
  academicYear: string;
  type: string;
  criteria: string;
  amount: string;
}

const SCHOLARSHIP_YEARS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
];

const SCHOLARSHIP_COLUMNS = [
  { header: "Year", key: "year" },
  { header: "Academic Year", key: "academicYear", placeholder: "YYYY-YY" },
  { header: "Type of Scholarship", key: "type", placeholder: "Type of Scholarship" },
  { header: "Criteria", key: "criteria", placeholder: "Eligibility Criteria" },
  { header: "Amount", key: "amount", placeholder: "Amount in ₹" },
];

const ScholarshipDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [scholarshipDetails, setScholarshipDetails] = useState<ScholarshipDetail[]>(
    SCHOLARSHIP_YEARS.map((year) => ({
      year,
      academicYear: "",
      type: "",
      criteria: "",
      amount: "",
    }))
  );

  useEffect(() => {
    const fetchScholarshipDetails = async () => {
      try {
        const response = await fetch("/api/scholarship-details");
        const { data } = await response.json();
        if (data && data.length > 0) {
          const mergedData = SCHOLARSHIP_YEARS.map((year) => {
            const existingRecord = data.find((d: ScholarshipDetail) => d.year === year);
            return existingRecord || {
              year,
              academicYear: "",
              type: "",
              criteria: "",
              amount: "",
            };
          });
          setScholarshipDetails(mergedData);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load scholarship details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchScholarshipDetails();
  }, [toast]);

  const handleInputChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setScholarshipDetails((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/scholarship-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scholarshipDetails),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Scholarship details updated successfully",
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
      title="Scholarship Details"
      isEditing={isEditing}
      isSaving={isSaving}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    >
      <TableContent
        columns={SCHOLARSHIP_COLUMNS}
        data={scholarshipDetails}
        isEditing={isEditing}
        onInputChange={handleInputChange}
      />
    </TableWrapper>
  );
};

export default ScholarshipDetails;