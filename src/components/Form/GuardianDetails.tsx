"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormLayout } from "./FormComponents";
import { guardianFields } from "@/constants/formFields";
import { GuardianDetails } from "@/types/form";

const GuardianDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [guardianDetails, setGuardianDetails] = useState<GuardianDetails>({
    fatherName: "",
    fatherOccupation: "",
    fatherQualification: "",
    fatherContact: "",
    motherName: "",
    motherOccupation: "",
    motherQualification: "",
    motherContact: "",
  });

  useEffect(() => {
    const fetchGuardianInfo = async () => {
      try {
        const response = await fetch("/api/guardian");
        const { data } = await response.json();
        if (data) {
          setGuardianDetails(data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load guardian details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuardianInfo();
  }, [toast]);

  const handleInputChange = (field: keyof GuardianDetails, value: string) => {
    setGuardianDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/guardian", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(guardianDetails),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Guardian details updated successfully",
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
    <FormLayout<GuardianDetails>
      title="Guardian Information"
      fields={guardianFields}
      data={guardianDetails}
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

export default GuardianDetails; 