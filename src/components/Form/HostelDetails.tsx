"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import TableWrapper from "./shared/TableWrapper";
import TableContent from "./shared/TableContent";
import { z } from "zod";

// Add Zod schema
const hostelDetailSchema = z.object({
  year: z.string(),
  academicYear: z.string(),
  roomDetails: z.string()
    .regex(/^[A-Za-z0-9\s,-]*$/, "Room details can only contain letters, numbers, spaces, commas and hyphens")
    .optional()
    .or(z.literal(""))
    .transform(v => v || ""),
  partnerDetails: z.string()
    .regex(/^[A-Za-z\s.]*$/, "Partner name can only contain letters, spaces and dots")
    .optional()
    .or(z.literal(""))
    .transform(v => v || ""),
  transportation: z.string()
    .regex(/^[A-Za-z0-9\s/-]*$/, "Transportation details can only contain letters, numbers, spaces, slashes and hyphens")
    .optional()
    .or(z.literal(""))
    .transform(v => v || "")
});

const hostelDetailsArraySchema = z.array(hostelDetailSchema);

type HostelDetail = z.infer<typeof hostelDetailSchema>;

const HOSTEL_YEARS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
];

const HOSTEL_COLUMNS = [
  { header: "Year", key: "year" },
  { header: "Academic Year", key: "academicYear", placeholder: "YYYY-YY" },
  { header: "Room Details", key: "roomDetails", placeholder: "Room No., Block" },
  { header: "Partner Details", key: "partnerDetails", placeholder: "Room Partner Name" },
  { header: "Transportation", key: "transportation", placeholder: "Bus/Other" },
];

const HostelDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hostelDetails, setHostelDetails] = useState<HostelDetail[]>(
    HOSTEL_YEARS.map((year) => ({
      year,
      academicYear: "",
      roomDetails: "",
      partnerDetails: "",
      transportation: "",
    }))
  );

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await fetch("/api/hostel-details");
        const { data } = await response.json();
        if (data && data.length > 0) {
          const mergedData = HOSTEL_YEARS.map((year) => {
            const existingRecord = data.find((d: HostelDetail) => d.year === year);
            return existingRecord || {
              year, 
              academicYear: "",
              roomDetails: "",
              partnerDetails: "",
              transportation: "",
            };
          });
          setHostelDetails(mergedData);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load hostel details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHostelDetails();
  }, [toast]);

  const handleInputChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setHostelDetails((prev) => {
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
        } else {
          // Only validate non-empty values during editing
          if (value !== "") {
            hostelDetailSchema.shape[field as keyof HostelDetail].parse(value);
          }
          updatedDetail[field as keyof HostelDetail] = value;
        }

        updated[index] = updatedDetail;
        return updated;
      } catch (error) {
        // Move toast outside of setState to avoid the warning
        setTimeout(() => {
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
        }, 0);
        return prev;
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Filter out rows where all fields except 'year' are empty
      const nonEmptyRows = hostelDetails.filter(detail => 
        detail.academicYear !== "" || 
        detail.roomDetails !== "" || 
        detail.partnerDetails !== "" || 
        detail.transportation !== ""
      );

      // For rows that have any data, validate that all fields are filled
      const rowsWithMissingFields = nonEmptyRows.filter(detail => {
        const hasAnyData = detail.academicYear !== "" || 
                          detail.roomDetails !== "" || 
                          detail.partnerDetails !== "" || 
                          detail.transportation !== "";
        
        const hasAllData = detail.academicYear !== "" && 
                          detail.roomDetails !== "" && 
                          detail.partnerDetails !== "" && 
                          detail.transportation !== "";
        
        return hasAnyData && !hasAllData;
      });

      if (rowsWithMissingFields.length > 0) {
        throw new Error("Please fill all fields for rows where you've started entering data");
      }

      // Final validation before saving
      const validatedData = hostelDetailsArraySchema.parse(nonEmptyRows);

      const response = await fetch("/api/hostel-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Hostel details updated successfully",
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
      title="Hostel Details"
      isEditing={isEditing}
      isSaving={isSaving}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    >
      <TableContent
        columns={HOSTEL_COLUMNS}
        data={hostelDetails}
        isEditing={isEditing}
        onInputChange={handleInputChange}
      />
    </TableWrapper>
  );
};

export default HostelDetails;