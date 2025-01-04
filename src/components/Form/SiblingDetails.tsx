"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, X, Pencil, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { siblingFields } from "@/constants/formFields";
import { SiblingDetail } from "@/types/form";
import { Card } from "@/components/ui/card";

const emptySibling: SiblingDetail = {
  name: "",
  age: "",
  aadharNo: "",
  occupation: "",
  organizationAddress: "",
};

const SiblingDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [siblings, setSiblings] = useState<SiblingDetail[]>([]);

  useEffect(() => {
    const fetchSiblings = async () => {
      try {
        const response = await fetch("/api/siblings");
        const { data } = await response.json();
        if (data) {
          setSiblings(data);
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

  const handleRemoveSibling = (index: number) => {
    setSiblings((prev) => prev.filter((_, i) => i !== index));
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
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/siblings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siblings }),
      });

      if (!response.ok) throw new Error("Failed to save changes");

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
                        <Input
                          type={field.type || "text"}
                          value={sibling[field.key as keyof SiblingDetail]}
                          onChange={(e) =>
                            handleInputChange(index, field.key as keyof SiblingDetail, e.target.value)
                          }
                          placeholder={field.placeholder}
                          className="h-[36px]"
                        />
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
                  >
                    <Trash2 className="h-[16px] w-[16px] text-red-500" />
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
                  onClick={() => setIsEditing(false)}
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