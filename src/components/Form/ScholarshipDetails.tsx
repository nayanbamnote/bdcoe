"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import TableWrapper from "./shared/TableWrapper";
import TableContent from "./shared/TableContent";
import { z } from "zod";

// Add Zod schema
const scholarshipDetailSchema = z.object({
  year: z.string(),
  academicYear: z.string()
    .optional()
    .or(z.literal("")),
  type: z.string()
    .min(1, "Scholarship type is required")
    .max(100, "Scholarship type is too long"),
  criteria: z.string()
    .min(1, "Eligibility criteria is required")
    .max(200, "Eligibility criteria is too long"),
  amount: z.string()
    .regex(/^\d+$/, "Amount must be a valid number")
    .refine(
      (val) => {
        const num = parseInt(val);
        return num > 0 && num <= 1000000;
      },
      "Amount must be between 1 and 10,00,000"
    )
    .optional()
    .or(z.literal(""))
});

const scholarshipDetailsArraySchema = z.array(scholarshipDetailSchema);

type ScholarshipDetail = z.infer<typeof scholarshipDetailSchema>;

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
      const updatedDetail = { ...updated[index] };

      try {
        if (field === "academicYear") {
          if (value === "") {
            updatedDetail.academicYear = "";
          } else {
            const cleanValue = value.replace(/[^\d-]/g, '');
            updatedDetail.academicYear = cleanValue.slice(0, 7);
          }
        } else if (field === "amount") {
          // Remove non-numeric characters and leading zeros
          const numericValue = value.replace(/\D/g, '').replace(/^0+/, '') || '';
          scholarshipDetailSchema.shape.amount.parse(numericValue);
          updatedDetail.amount = numericValue;
        } else {
          // Validate other fields
          scholarshipDetailSchema.shape[field as keyof ScholarshipDetail].parse(value);
          updatedDetail[field as keyof ScholarshipDetail] = value;
        }

        updated[index] = updatedDetail;
        return updated;
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast({
            title: "Invalid Input",
            description: error.errors[0].message,
            variant: "destructive",
          });
        } else if (error instanceof Error) {
          toast({
            title: "Invalid Input",
            description: error.message,
            variant: "destructive",
          });
        }
        return prev;
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Create a modified schema for non-empty rows that requires all fields
      const nonEmptyRowSchema = scholarshipDetailSchema.extend({
        academicYear: z.string().min(1, "Academic Year is required"),
        type: z.string().min(1, "Scholarship type is required"),
        criteria: z.string().min(1, "Eligibility criteria is required"),
        amount: z.string().min(1, "Amount is required"),
      });

      // Filter out completely empty rows (except year) and validate non-empty rows
      const dataToSave = scholarshipDetails.map(detail => {
        // Check if the row has any data besides the year
        const hasData = detail.academicYear || detail.type || detail.criteria || detail.amount;
        
        if (hasData) {
          // If row has any data, validate all required fields
          try {
            nonEmptyRowSchema.parse(detail);
          } catch (error) {
            if (error instanceof z.ZodError) {
              throw new Error(`Row ${detail.year}: ${error.errors[0].message}`);
            }
          }
        }
        return detail;
      }).filter(detail => 
        detail.academicYear || detail.type || detail.criteria || detail.amount
      );

      const response = await fetch("/api/scholarship-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Scholarship details updated successfully",
      });
      setIsEditing(false);
    } catch (error) {
      let errorMessage = "Failed to save changes";
      
      if (error instanceof z.ZodError) {
        errorMessage = error.errors[0].message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
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