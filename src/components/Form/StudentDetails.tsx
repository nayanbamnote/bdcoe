"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormLayout } from "./FormComponents";
import { academicFields } from "@/constants/formFields";
import { AcademicDetails } from "@/types/form";

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

  useEffect(() => {
    const fetchAcademicInfo = async () => {
      try {
        const response = await fetch("/api/academic");
        const { data } = await response.json();
        if (data) {
          setAcademicDetails(data);
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

  const handleInputChange = (field: keyof AcademicDetails, value: string) => {
    setAcademicDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/academic", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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

  return (
    <FormLayout<AcademicDetails>
      title="Academic Information"
      fields={academicFields}
      data={academicDetails}
      isEditing={isEditing}
      isLoading={isLoading}
      isSaving={isSaving}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
      onInputChange={handleInputChange}
    />
  );
};

export default StudentDetails;
