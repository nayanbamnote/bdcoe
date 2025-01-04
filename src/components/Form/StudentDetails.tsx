"use client";
import React, { useState, useEffect } from "react";
import { Pencil, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AcademicDetails {
  rollNumber: string;
  currentSemester: string;
  section: string;
  yearOfAdmission: string;
}

const StudentDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [academicDetails, setAcademicDetails] = useState<AcademicDetails>({
    rollNumber: "",
    currentSemester: "",
    section: "",
    yearOfAdmission: "",
  });

  // Fetch academic data
  useEffect(() => {
    const fetchAcademicInfo = async () => {
      try {
        const response = await fetch("/api/academic");
        const { data } = await response.json();

        if (data) {
          setAcademicDetails({
            rollNumber: data.rollNumber || "",
            currentSemester: data.currentSemester || "",
            section: data.section || "",
            yearOfAdmission: data.yearOfAdmission || "",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load academic data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcademicInfo();
  }, [toast]);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (field: keyof AcademicDetails, value: string) => {
    setAcademicDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/academic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(academicDetails),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Academic information updated successfully",
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

  const cancelEditing = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return <AcademicSkeleton />;
  }

  // If no academic data exists, show empty state with edit button
  if (!academicDetails.rollNumber && !isEditing) {
    return (
      <div className="p-[16px] bg-white rounded-[8px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 italic">
              No academic information added yet
            </p>
            <p className="text-[14px] text-gray-400">
              Click edit to add your academic details
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleEditMode}
            className="hover:bg-gray-100">
            <Pencil size={18} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-[8px] min-h-[160px]">
      <div className="pr-[85px] pt-[20px] w-[200px] shrink-0">
        Academic Information
      </div>

      <div className="flex-grow space-y-[16px]">
        <div className="grid grid-cols-2 gap-[8px]">
          {isEditing ? (
            <>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Roll Number</p>
                <Input
                  value={academicDetails.rollNumber}
                  onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                  placeholder="Roll Number"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Current Semester</p>
                <Input
                  value={academicDetails.currentSemester}
                  onChange={(e) => handleInputChange("currentSemester", e.target.value)}
                  placeholder="Current Semester"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Section</p>
                <Input
                  value={academicDetails.section}
                  onChange={(e) => handleInputChange("section", e.target.value)}
                  placeholder="Section"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Year of Admission</p>
                <Input
                  value={academicDetails.yearOfAdmission}
                  onChange={(e) => handleInputChange("yearOfAdmission", e.target.value)}
                  placeholder="Year of Admission"
                  className="h-[36px]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Roll Number</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{academicDetails.rollNumber}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Current Semester</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{academicDetails.currentSemester}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Section</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{academicDetails.section}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Year of Admission</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{academicDetails.yearOfAdmission}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Save and Cancel Buttons */}
      {isEditing ? (
        <div className="flex space-x-[8px]">
          <Button
            variant="outline"
            size="icon"
            onClick={cancelEditing}
            className="hover:bg-red-50">
            <X className="h-[20px] w-[20px] text-red-500" />
          </Button>
          <Button
            onClick={saveChanges}
            className="flex items-center gap-[8px]"
            disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-[16px] w-[16px] animate-spin" />
            ) : (
              <Save className="h-[16px] w-[16px]" />
            )}
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleEditMode}
          className="hover:bg-gray-100">
          <Pencil size={18} />
        </Button>
      )}

    </div>
  );
};

const AcademicSkeleton = () => {
  return (
    <div className="flex gap-[8px] min-h-[160px]">
      <div className="pr-[85px] pt-[20px] w-[200px] shrink-0">
        <Skeleton className="h-[24px] w-[160px]" />
      </div>

      <div className="flex-grow">
        <div className="grid grid-cols-2 gap-[8px]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Skeleton className="h-[20px] w-[120px] mb-[8px]" />
              <Skeleton className="h-[24px] w-full" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-[36px] w-[36px] rounded-[4px]" />
      </div>
    </div>
  );
};

export default StudentDetails;
