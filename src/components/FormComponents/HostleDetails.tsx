import React, { useState } from "react";
import TableSection from "../TableComponents/TableSection";
import { useToast } from "@/hooks/use-toast"; // Import toast hook

const HostelDetails = () => {
  const columns = [
    { key: "academicYear", label: "Academic Year", editable: true },
    { key: "roomDetails", label: "Hostel & Room No.", editable: true },
    { key: "partnerDetails", label: "Name, Mobile No. of Room Partners", editable: true },
    { key: "transportation", label: "Bus Stop & Route", editable: true },
  ];

  const initialFacilityData = [
    {
      academicYear: "2020-2021",
      roomDetails: "Room No. 101",
      partnerDetails: "John Doe, 1234567890",
      transportation: "Bus Stop A, Route 5",
    },
    {
      academicYear: "2021-2022",
      roomDetails: "Room No. 102",
      partnerDetails: "Jane Doe, 0987654321",
      transportation: "No",
    },
    {
      academicYear: "2022-2023",
      roomDetails: "No",
      partnerDetails: "-",
      transportation: "Bus Stop B, Route 3",
    },
    {
      academicYear: "2023-2024",
      roomDetails: "No",
      partnerDetails: "-",
      transportation: "No",
    },
  ];

  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: Record<string, any>[]) => {
    try {
      setIsSaving(true);

      const formattedData = data.map(row => ({
        ...row,
      }));

      const response = await fetch("/api/hostleDetails", {
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
        description: "Hostel details saved successfully.",
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
      title="HOSTEL & TRANSPORT FACILITY UTILIZATION DETAILS:"
      columns={columns}
      initialData={initialFacilityData}
      onSave={handleSave} // Attach the save handler
      isSaving={isSaving} // Pass saving state to handle loading UI
    />
  );
};

export default HostelDetails;
