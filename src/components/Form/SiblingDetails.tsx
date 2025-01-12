"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, X, Pencil, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { siblingFields } from "@/constants/formFields";
import { SiblingDetail } from "@/types/form";
import { Card } from "@/components/ui/card";
import { z } from "zod";

const emptySibling: SiblingDetail = {
  name: "",
  age: "",
  aadharNo: "",
  occupation: "",
  organizationAddress: "",
};

const siblingSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  age: z.string()
    .min(1, "Age is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
      message: "Age must be between 0 and 100",
    }),
  aadharNo: z.string()
    .length(12, "Aadhar number must be 12 digits")
    .regex(/^\d+$/, "Aadhar number must contain only digits"),
  occupation: z.string().min(1, "Occupation is required").max(50, "Occupation is too long"),
  organizationAddress: z.string().min(1, "Organization address is required").max(200, "Address is too long"),
});

type ValidationErrors = {
  [K in keyof SiblingDetail]?: string;
};

const SiblingDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [siblings, setSiblings] = useState<SiblingDetail[]>([]);
  const [errors, setErrors] = useState<ValidationErrors[]>([]);
  const [originalSiblings, setOriginalSiblings] = useState<SiblingDetail[]>([]);

  useEffect(() => {
    const fetchSiblings = async () => {
      try {
        const response = await fetch("/api/siblings");
        const { data } = await response.json();
        if (data) {
          setSiblings(data);
          setOriginalSiblings(data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load sibling details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiblings();
  }, [toast]);

  const handleAddSibling = () => {
    setSiblings((prev) => [...prev, { ...emptySibling }]);
  };

  const handleCancelEdit = () => {
    setSiblings([...originalSiblings]);
    setErrors([]);
    setIsEditing(false);
  };

  const handleRemoveSibling = async (index: number) => {
    setIsSaving(true);
    try {
      const updatedSiblings = siblings.filter((_, i) => i !== index);
      
      const response = await fetch("/api/siblings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siblings: updatedSiblings }),
      });

      if (!response.ok) throw new Error("Failed to delete sibling");

      setSiblings(updatedSiblings);
      
      toast({
        title: "Success",
        description: "Sibling removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove sibling",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (index: number, field: keyof SiblingDetail, value: string) => {
    setSiblings((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });

    const fieldSchema = siblingSchema.shape[field];
    try {
      fieldSchema.parse(value);
      setErrors((prev) => {
        const newErrors = [...prev];
        if (newErrors[index]) {
          delete newErrors[index]?.[field];
        }
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => {
          const newErrors = [...prev];
          if (!newErrors[index]) newErrors[index] = {};
          newErrors[index]![field] = error.errors[0].message;
          return newErrors;
        });
      }
    }
  };

  const handleSave = async () => {
    const validationResults = siblings.map((sibling) => {
      try {
        siblingSchema.parse(sibling);
        return null;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: ValidationErrors = {};
          error.errors.forEach((err) => {
            const path = err.path[0] as keyof SiblingDetail;
            fieldErrors[path] = err.message;
          });
          return fieldErrors;
        }
        return null;
      }
    });

    const hasErrors = validationResults.some((result) => result !== null);
    if (hasErrors) {
      setErrors(validationResults as ValidationErrors[]);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/siblings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siblings }),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      setOriginalSiblings(siblings);
      toast({
        title: "Success",
        description: "Sibling details updated successfully",
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
    return (
      <div className="flex gap-[8px] min-h-[160px]">
        <div className="pr-[85px] pt-[20px] w-[200px] shrink-0">
          Sibling Information
        </div>
        <div className="flex-grow">
          <div className="animate-pulse space-y-[16px]">
            <div className="h-[100px] bg-gray-200 rounded-[8px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-[8px] min-h-[160px]">
      <div className="pr-[85px] pt-[20px] w-[200px] shrink-0">
        Sibling Information
      </div>

      <div className="flex-grow space-y-[16px]">
        {siblings.length === 0 && !isEditing ? (
          <div className="text-gray-500 italic">
            No sibling information added yet
            <p className="text-[14px] text-gray-400">Click edit to add siblings</p>
          </div>
        ) : (
          <div className="space-y-[16px]">
            {siblings.map((sibling, index) => (
              <Card key={index} className="p-[16px]">
                <div className="grid grid-cols-2 gap-[8px]">
                  {siblingFields.map((field) => (
                    <div key={field.key} className="space-y-[4px]">
                      <p className="text-[14px] font-medium text-gray-500">
                        {field.label}
                      </p>
                      {isEditing ? (
                        <div className="space-y-[4px]">
                          <Input
                            type={field.type || "text"}
                            value={sibling[field.key as keyof SiblingDetail]}
                            onChange={(e) =>
                              handleInputChange(index, field.key as keyof SiblingDetail, e.target.value)
                            }
                            placeholder={field.placeholder}
                            className={`h-[36px] ${
                              errors[index]?.[field.key as keyof SiblingDetail] 
                                ? "border-red-500 focus-visible:ring-red-500" 
                                : ""
                            }`}
                          />
                          {errors[index]?.[field.key as keyof SiblingDetail] && (
                            <p className="text-[12px] text-red-500">
                              {errors[index]?.[field.key as keyof SiblingDetail]}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-[14px] text-gray-900">
                          {sibling[field.key as keyof SiblingDetail]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveSibling(index)}
                    className="mt-[8px] hover:bg-red-50"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <Loader2 className="h-[16px] w-[16px] animate-spin" />
                    ) : (
                      <Trash2 className="h-[16px] w-[16px] text-red-500" />
                    )}
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          {isEditing && (
            <Button
              variant="outline"
              onClick={handleAddSibling}
              className="flex items-center gap-[8px]"
            >
              <Plus className="h-[16px] w-[16px]" />
              Add Sibling
            </Button>
          )}

          <div className="flex space-x-[8px]">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCancelEdit}
                  className="hover:bg-red-50"
                >
                  <X className="h-[20px] w-[20px] text-red-500" />
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-[8px]"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-[16px] w-[16px] animate-spin" />
                  ) : (
                    <Save className="h-[16px] w-[16px]" />
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
      </div>
    </div>
  );
};

export default SiblingDetails; 