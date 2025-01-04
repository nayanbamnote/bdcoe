"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AccommodationToggles {
  hasScholarship: boolean;
  isHosteler: boolean;
}

interface AccommodationToggleProps {
  onToggleChange: (toggles: AccommodationToggles) => void;
}

const AccommodationToggle: React.FC<AccommodationToggleProps> = ({ onToggleChange }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [toggles, setToggles] = useState<AccommodationToggles>({
    hasScholarship: false,
    isHosteler: false,
  });
  
  // Use ref to avoid infinite loops with onToggleChange
  const onToggleChangeRef = useRef(onToggleChange);
  useEffect(() => {
    onToggleChangeRef.current = onToggleChange;
  }, [onToggleChange]);

  const fetchToggles = useCallback(async () => {
    try {
      setIsLoading(true);
      const [scholarshipRes, hostelRes] = await Promise.all([
        fetch("/api/scholarship"),
        fetch("/api/hostel"),
      ]);
      
      if (!scholarshipRes.ok || !hostelRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const scholarshipData = await scholarshipRes.json();
      const hostelData = await hostelRes.json();

      const newToggles = {
        hasScholarship: scholarshipData.data?.hasScholarship || false,
        isHosteler: hostelData.data?.isHosteler || false,
      };

      setToggles(newToggles);
      onToggleChangeRef.current(newToggles);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load accommodation details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchToggles();
  }, [fetchToggles]);

  const handleToggleChange = useCallback(async (field: keyof AccommodationToggles) => {
    const newValue = !toggles[field];
    const newToggles = { ...toggles, [field]: newValue };
    
    const endpoint = field === 'hasScholarship' ? '/api/scholarship' : '/api/hostel';
    
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: newValue }),
      });

      if (!response.ok) throw new Error("Failed to update");

      setToggles(newToggles);
      onToggleChangeRef.current(newToggles);

      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
      // Don't update state if the API call fails
    }
  }, [toggles, toast]);

  if (isLoading) {
    return <div className="text-center py-[16px]">Loading...</div>;
  }

  return (
    <div className="space-y-[24px] py-[16px]">
      <div className="flex items-center justify-between px-[16px] py-[8px] bg-gray-50 rounded-lg">
        <Label htmlFor="scholarship-toggle" className="text-[16px]">
          Have you received any scholarship?
        </Label>
        <Switch
          id="scholarship-toggle"
          checked={toggles.hasScholarship}
          onCheckedChange={() => handleToggleChange('hasScholarship')}
        />
      </div>

      <div className="flex items-center justify-between px-[16px] py-[8px] bg-gray-50 rounded-lg">
        <Label htmlFor="hostel-toggle" className="text-[16px]">
          Are you a hosteler?
        </Label>
        <Switch
          id="hostel-toggle"
          checked={toggles.isHosteler}
          onCheckedChange={() => handleToggleChange('isHosteler')}
        />
      </div>
    </div>
  );
};

export default AccommodationToggle; 