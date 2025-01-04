"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormLayout } from "./FormComponents";
import { technicalInterestFields } from "@/constants/formFields";
import { TechnicalInterestDetail } from "@/types/form";

const TechnicalInterestDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [interests, setInterests] = useState<TechnicalInterestDetail[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch("/api/technical-interests");
        const { data } = await response.json();
        if (data) {
          setInterests(data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load technical interests",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterests();
  }, [toast]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/technical-interests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests }),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Technical interests updated successfully",
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
    <FormLayout<TechnicalInterestDetail>
      title="Technical Interests"
      fields={technicalInterestFields}
      data={interests[0] || { interest: "" }}
      isEditing={isEditing}
      isLoading={isLoading}
      isSaving={isSaving}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
      onInputChange={(field, value) => setInterests([{ interest: value }])}
    />
  );
};

export default TechnicalInterestDetails; 