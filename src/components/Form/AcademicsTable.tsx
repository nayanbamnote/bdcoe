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
          // Merge existing data with default labels
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
    field: keyof AcademicDetail,
    value: string
  ) => {
    setAcademicDetails((prev) => {
      const updated = [...prev];
      const updatedDetail = { ...updated[index] };

      if (field === "totalMarks" || field === "outOfMarks") {
        updatedDetail[field] = parseInt(value) || 0;
        // Calculate percentage when either marks field changes
        if (updatedDetail.outOfMarks > 0) {
          const percentage = (updatedDetail.totalMarks / updatedDetail.outOfMarks) * 100;
          updatedDetail.percentage = percentage.toFixed(2);
        }
      } else {
        updatedDetail[field] = value;
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
    <div className="space-y-[16px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold">Academic History</h2>
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
            <TableHead>Examination</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Marks Obtained</TableHead>
            <TableHead>Out Of</TableHead>
            <TableHead>Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {academicDetails.map((detail, index) => (
            <TableRow key={detail.label}>
              <TableCell className="font-medium">{detail.label}</TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={detail.year}
                    onChange={(e) => handleInputChange(index, "year", e.target.value)}
                    className="h-[36px]"
                    placeholder="YYYY"
                  />
                ) : (
                  detail.year || "-"
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    type="number"
                    value={detail.totalMarks || ""}
                    onChange={(e) =>
                      handleInputChange(index, "totalMarks", e.target.value)
                    }
                    className="h-[36px]"
                    placeholder="0"
                  />
                ) : (
                  detail.totalMarks || "-"
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    type="number"
                    value={detail.outOfMarks || ""}
                    onChange={(e) =>
                      handleInputChange(index, "outOfMarks", e.target.value)
                    }
                    className="h-[36px]"
                    placeholder="0"
                  />
                ) : (
                  detail.outOfMarks || "-"
                )}
              </TableCell>
              <TableCell>
                {detail.percentage ? `${detail.percentage}%` : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AcademicsTable; 