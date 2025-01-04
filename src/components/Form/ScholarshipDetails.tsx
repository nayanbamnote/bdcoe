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
          // Merge existing data with default years
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
    field: keyof ScholarshipDetail,
    value: string
  ) => {
    setScholarshipDetails((prev) => {
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
    <div className="space-y-[16px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold">Scholarship Details</h2>
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
            <TableHead>Type of Scholarship</TableHead>
            <TableHead>Criteria</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scholarshipDetails.map((detail, index) => (
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
                    value={detail.type}
                    onChange={(e) => handleInputChange(index, "type", e.target.value)}
                    className="h-[36px]"
                    placeholder="Type of Scholarship"
                  />
                ) : (
                  detail.type || "-"
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={detail.criteria}
                    onChange={(e) => handleInputChange(index, "criteria", e.target.value)}
                    className="h-[36px]"
                    placeholder="Eligibility Criteria"
                  />
                ) : (
                  detail.criteria || "-"
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={detail.amount}
                    onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                    className="h-[36px]"
                    placeholder="Amount in ₹"
                  />
                ) : (
                  detail.amount || "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScholarshipDetails;