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
    .regex(/^\d{4}-\d{2}$/, "Academic Year must be in YYYY-YY format (e.g., 2024-25)")
    .refine(
      (year) => {
        const [startYear, endYear] = year.split('-');
        const start = parseInt(startYear);
        const end = parseInt(endYear);
        const currentYear = new Date().getFullYear();
        return start >= 1900 && 
               start <= currentYear + 4 && // Allow future years for upcoming scholarships
               end === parseInt(startYear.slice(2)) + 1;
      },
      "Invalid academic year format. Example: 2024-25"
    )
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
            let formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length >= 4) {
              const yearStart = formattedValue.slice(0, 4);
              const yearEnd = parseInt(yearStart.slice(2)) + 1;
              formattedValue = `${yearStart}-${yearEnd.toString().padStart(2, '0')}`;
            }
            
            if (formattedValue.length === 7) {
              scholarshipDetailSchema.shape.academicYear.parse(formattedValue);
            }
            updatedDetail.academicYear = formattedValue;
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
      // Validate all scholarship details before saving
      const validatedData = scholarshipDetailsArraySchema.parse(scholarshipDetails);

      // Filter out empty rows (rows with only the year field filled)
      const nonEmptyData = validatedData.filter(detail => 
        detail.academicYear || detail.type || detail.criteria || detail.amount
      );

      const response = await fetch("/api/scholarship-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nonEmptyData),
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