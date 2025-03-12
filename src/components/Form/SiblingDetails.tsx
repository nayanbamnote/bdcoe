"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import { siblingFields } from "@/constants/formFields";
import { SiblingDetail } from "@/types/form";
import { z } from "zod";
import { FormLayout, FormSkeleton, FormActions } from "./FormComponents";

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

const SiblingCard = ({ 
  sibling, 
  isEditing, 
  onRemove, 
  onChange, 
  index,
  errors 
}: {
  sibling: SiblingDetail;
  isEditing: boolean;
  onRemove: () => void;
  onChange: (field: keyof SiblingDetail, value: string) => void;
  index: number;
  errors?: Record<string, string>;
}) => {
  const fields = siblingFields.map(field => ({
    ...field,
    validation: siblingSchema.shape[field.key as keyof SiblingDetail]
  }));

  return (
    <div className="bg-white p-[20px] rounded-[12px] shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px]">
        {fields.map((field) => (
          <div key={field.key} className="mb-[24px]">
            <label className="text-[14px] font-medium text-gray-600">
              {field.label}
            </label>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isEditing ? "input" : "value"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isEditing ? (
                  <div className="mt-[8px]">
                    <input
                      type={field.type || "text"}
                      value={sibling[field.key as keyof SiblingDetail]}
                      onChange={(e) => onChange(field.key as keyof SiblingDetail, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent text-[16px] border-b border-gray-200 pb-[6px] transition-all duration-300 ease-in-out focus:outline-none focus:border-[#3eb2ce]"
                    />
                    {errors?.[field.key] && (
                      <p className="text-[12px] text-red-500 mt-[4px]">{errors[field.key]}</p>
                    )}
                  </div>
                ) : (
                  <div className="text-[16px] text-gray-800 mt-[8px]">
                    {sibling[field.key as keyof SiblingDetail] || "Not provided"}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
      {isEditing && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onRemove}
          className="inline-flex items-center justify-center p-[10px] rounded-full text-red-500 hover:bg-red-50 transition-all duration-300"
        >
          <Trash2 size={20} />
        </motion.button>
      )}
    </div>
  );
};

const SiblingDetails: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [siblings, setSiblings] = useState<SiblingDetail[]>([]);
  const [errors, setErrors] = useState<Record<string, string>[]>([]);
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
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    // Validate field
    try {
      siblingSchema.shape[field].parse(value);
      setErrors(prev => {
        const newErrors = [...prev];
        if (newErrors[index]) {
          delete newErrors[index][field];
        }
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => {
          const newErrors = [...prev];
          if (!newErrors[index]) newErrors[index] = {};
          newErrors[index] = {
            ...newErrors[index],
            [field]: error.errors[0].message
          };
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
          const fieldErrors: Record<string, string> = {};
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
      setErrors(validationResults as Record<string, string>[]);
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
    return <FormSkeleton fieldCount={5} />;
  }

  return (
    <div className="bg-white p-[20px] sm:p-[32px] rounded-[12px] shadow-lg">
      <div className="flex items-center justify-between mb-[24px] sm:mb-[32px]">
        <h2 className="text-[20px] sm:text-[24px] font-bold text-gray-800">
          Sibling Information
        </h2>
        <FormActions
          isEditing={isEditing}
          isSaving={isSaving}
          onSave={handleSave}
          onCancel={handleCancelEdit}
          onEdit={() => setIsEditing(true)}
        />
      </div>

      <div className="space-y-[16px]">
        {siblings.length === 0 && !isEditing ? (
          <div className="text-gray-500 italic">
            No sibling information added yet
            <p className="text-[14px] text-gray-400">Click edit to add siblings</p>
          </div>
        ) : (
          <>
            {siblings.map((sibling, index) => (
              <SiblingCard
                key={index}
                sibling={sibling}
                isEditing={isEditing}
                onRemove={() => handleRemoveSibling(index)}
                onChange={(field, value) => handleInputChange(index, field, value)}
                index={index}
                errors={errors[index]}
              />
            ))}
            
            {isEditing && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleAddSibling}
                className="inline-flex items-center gap-[8px] p-[10px] rounded-[8px] bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
              >
                <Plus size={20} />
                Add Sibling
              </motion.button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SiblingDetails; 