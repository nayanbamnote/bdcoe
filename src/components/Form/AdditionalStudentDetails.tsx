"use client";
import React, { useState, useEffect } from "react";
import { Pencil, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AdditionalDetails {
  aadharNo: string;
  dob: string;
  bloodGroup: string;
  addressOnAadhar: string;
  permanentAddress: string;
  casteCategory: string;
  subcaste: string;
  religion: string;
}

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
            aadharNo: data.aadharNo || "",
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : "",
            bloodGroup: data.bloodGroup || "",
            addressOnAadhar: data.addressOnAadhar || "",
            permanentAddress: data.permanentAddress || "",
            casteCategory: data.casteCategory || "",
            subcaste: data.subcaste || "",
            religion: data.religion || "",
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

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (field: keyof AdditionalDetails, value: string) => {
    setAdditionalDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/additional-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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

  const cancelEditing = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return <AdditionalDetailsSkeleton />;
  }

  if (!additionalDetails.aadharNo && !isEditing) {
    return (
      <div className="p-[16px] bg-white rounded-[8px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 italic">
              No additional details added yet
            </p>
            <p className="text-[14px] text-gray-400">
              Click edit to add your additional details
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
        Additional Information
      </div>

      <div className="flex-grow space-y-[16px]">
        <div className="grid grid-cols-2 gap-[8px]">
          {isEditing ? (
            <>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Aadhar Number</p>
                <Input
                  value={additionalDetails.aadharNo}
                  onChange={(e) => handleInputChange("aadharNo", e.target.value)}
                  placeholder="Aadhar Number"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Date of Birth</p>
                <Input
                  type="date"
                  value={additionalDetails.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Blood Group</p>
                <Input
                  value={additionalDetails.bloodGroup}
                  onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                  placeholder="Blood Group"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Address on Aadhar</p>
                <Input
                  value={additionalDetails.addressOnAadhar}
                  onChange={(e) => handleInputChange("addressOnAadhar", e.target.value)}
                  placeholder="Address on Aadhar"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Permanent Address</p>
                <Input
                  value={additionalDetails.permanentAddress}
                  onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                  placeholder="Permanent Address"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Caste Category</p>
                <Input
                  value={additionalDetails.casteCategory}
                  onChange={(e) => handleInputChange("casteCategory", e.target.value)}
                  placeholder="Caste Category"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Subcaste</p>
                <Input
                  value={additionalDetails.subcaste}
                  onChange={(e) => handleInputChange("subcaste", e.target.value)}
                  placeholder="Subcaste"
                  className="h-[36px]"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="text-[14px] font-medium text-gray-500">Religion</p>
                <Input
                  value={additionalDetails.religion}
                  onChange={(e) => handleInputChange("religion", e.target.value)}
                  placeholder="Religion"
                  className="h-[36px]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Aadhar Number</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{additionalDetails.aadharNo}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Date of Birth</p>
                <p className="mt-[8px] text-[14px] text-gray-900">
                  {additionalDetails.dob ? new Date(additionalDetails.dob).toLocaleDateString() : ''}
                </p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Blood Group</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{additionalDetails.bloodGroup}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Address on Aadhar</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{additionalDetails.addressOnAadhar}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Permanent Address</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{additionalDetails.permanentAddress}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Caste Category</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{additionalDetails.casteCategory}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Subcaste</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{additionalDetails.subcaste}</p>
              </div>
              <div className="">
                <p className="text-[14px] font-medium text-gray-500">Religion</p>
                <p className="mt-[8px] text-[14px] text-gray-900">{additionalDetails.religion}</p>
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

const AdditionalDetailsSkeleton = () => {
  return (
    <div className="flex gap-[8px] min-h-[160px]">
      <div className="pr-[85px] pt-[20px] w-[200px] shrink-0">
        <Skeleton className="h-[24px] w-[160px]" />
      </div>

      <div className="flex-grow">
        <div className="grid grid-cols-2 gap-[8px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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

export default AdditionalStudentDetails;