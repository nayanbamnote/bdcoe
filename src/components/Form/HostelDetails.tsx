"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import TableWrapper from "./shared/TableWrapper";
import TableContent from "./shared/TableContent";

interface HostelDetail {
  year: string;
  academicYear: string;
  roomDetails: string;
  partnerDetails: string;
  transportation: string;
}

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
      const response = await fetch("/api/hostel-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hostelDetails),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Hostel details updated successfully",
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