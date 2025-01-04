"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormLayout } from "./FormComponents";
import { additionalFields } from "@/constants/formFields";
import { AdditionalDetails } from "@/types/form";

const AdditionalStudentDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>({
    aadharNo: "",
    dob: "",
    bloodGroup: "",
    addressOnAadhar: "",
    permanentAddress: "",
    casteCategory: "",
    subcaste: "",
    religion: "",
  });

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      try {
        const response = await fetch("/api/additional-details");
        const { data } = await response.json();
        if (data) {
          setAdditionalDetails({
            ...data,
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : "",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load additional details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdditionalInfo();
  }, [toast]);

  const handleInputChange = (field: keyof AdditionalDetails, value: string) => {
    setAdditionalDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/additional-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(additionalDetails),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Additional details updated successfully",
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
    <FormLayout<AdditionalDetails>
      title="Additional Information"
      fields={additionalFields}
      data={additionalDetails}
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

export default AdditionalStudentDetails;