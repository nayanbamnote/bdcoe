"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
          // Merge existing data with default years
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
    field: keyof HostelDetail,
    value: string
  ) => {
    setHostelDetails((prev) => {
      const updated = [...prev];
      const updatedDetail = { ...updated[index] };
      updatedDetail[field] = value;
      updated[index] = updatedDetail;
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
    <div className="space-y-[16px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold">Hostel Details</h2>
        <div className="flex space-x-[8px]">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(false)}
                className="hover:bg-red-50"
              >
                <X className="size-[20px] text-red-500" />
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center gap-[8px]"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="size-[16px] animate-spin" />
                ) : (
                  <Save className="size-[16px]" />
                )}
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="hover:bg-gray-100"
            >
              <Pencil size={18} />
            </Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Academic Year</TableHead>
            <TableHead>Room Details</TableHead>
            <TableHead>Partner Details</TableHead>
            <TableHead>Transportation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hostelDetails.map((detail, index) => (
            <TableRow key={detail.year}>
              <TableCell className="font-medium">{detail.year}</TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={detail.academicYear}
                    onChange={(e) => handleInputChange(index, "academicYear", e.target.value)}
                    className="h-[36px]"
                    placeholder="YYYY-YY"
                  />
                ) : (
                  detail.academicYear || "-"
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={detail.roomDetails}
                    onChange={(e) => handleInputChange(index, "roomDetails", e.target.value)}
                    className="h-[36px]"
                    placeholder="Room No., Block"
                  />
                ) : (
                  detail.roomDetails || "-"
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={detail.partnerDetails}
                    onChange={(e) => handleInputChange(index, "partnerDetails", e.target.value)}
                    className="h-[36px]"
                    placeholder="Room Partner Name"
                  />
                ) : (
                  detail.partnerDetails || "-"
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={detail.transportation}
                    onChange={(e) => handleInputChange(index, "transportation", e.target.value)}
                    className="h-[36px]"
                    placeholder="Bus/Other"
                  />
                ) : (
                  detail.transportation || "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HostelDetails;