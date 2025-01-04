"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormLayout } from "./FormComponents";
import { hobbyFields } from "@/constants/formFields";
import { HobbyDetail } from "@/types/form";

const HobbyDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hobbies, setHobbies] = useState<HobbyDetail[]>([]);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch("/api/hobbies");
        const { data } = await response.json();
        if (data) {
          setHobbies(data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load hobby data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHobbies();
  }, [toast]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/hobbies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hobbies }),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast({
        title: "Success",
        description: "Hobbies updated successfully",
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
    <FormLayout<HobbyDetail>
      title="Hobbies"
      fields={hobbyFields}
      data={hobbies[0] || { hobby: "" }}
      isEditing={isEditing}
      isLoading={isLoading}
      isSaving={isSaving}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
      onInputChange={(field, value) => setHobbies([{ hobby: value }])}
    />
  );
};

export default HobbyDetails; 