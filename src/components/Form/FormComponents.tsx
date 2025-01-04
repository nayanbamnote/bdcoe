import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FormFieldInterface, BaseFormData, FormProps } from "@/types/form";

export const FormSkeleton = ({ fieldCount }: { fieldCount: number }) => {
  return (
    <div className="flex gap-[8px] min-h-[160px]">
      <div className="pr-[85px] pt-[20px] w-[200px] shrink-0">
        <Skeleton className="h-[24px] w-[160px]" />
      </div>

      <div className="flex-grow">
        <div className="grid grid-cols-2 gap-[8px]">
          {Array.from({ length: fieldCount }).map((_, i) => (
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

export const EmptyState = ({ message, onEdit }: { message: string, onEdit: () => void }) => (
  <div className="p-[16px] bg-white rounded-[8px]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 italic">
          {message}
        </p>
        <p className="text-[14px] text-gray-400">
          Click edit to add your details
        </p>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={onEdit}
        className="hover:bg-gray-100">
        <Pencil size={18} />
      </Button>
    </div>
  </div>
);

export const FormField = ({ field, value, onChange, isEditing }: {
  field: FormFieldInterface;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
}) => {
  if (isEditing) {
    return (
      <div className="space-y-[4px]">
        <p className="text-[14px] font-medium text-gray-500">{field.label}</p>
        <Input
          type={field.type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="h-[36px]"
        />
      </div>
    );
  }

  return (
    <div className="">
      <p className="text-[14px] font-medium text-gray-500">{field.label}</p>
      <p className="mt-[8px] text-[14px] text-gray-900">
        {field.key === "dob" && value ? new Date(value).toLocaleDateString() : value}
      </p>
    </div>
  );
};

export const FormActions = ({ isEditing, isSaving, onSave, onCancel, onEdit }: {
  isEditing: boolean;
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}) => {
  if (isEditing) {
    return (
      <div className="flex space-x-[8px]">
        <Button
          variant="outline"
          size="icon"
          onClick={onCancel}
          className="hover:bg-red-50">
          <X className="h-[20px] w-[20px] text-red-500" />
        </Button>
        <Button
          onClick={onSave}
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
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onEdit}
      className="hover:bg-gray-100">
      <Pencil size={18} />
    </Button>
  );
};

export const FormLayout = <T extends BaseFormData>({
  title,
  fields,
  data,
  isEditing,
  isLoading,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  onInputChange
}: FormProps<T>) => {
  if (isLoading) {
    return <FormSkeleton fieldCount={fields.length} />;
  }

  const isEmpty = !Object.values(data).some(Boolean);
  if (isEmpty && !isEditing) {
    return <EmptyState message={`No ${title.toLowerCase()} added yet`} onEdit={onEdit} />;
  }

  return (
    <div className="flex gap-[8px] h-auto">
      <div className="pr-[85px] pt-[20px] w-[200px] shrink-0">
        {title}
      </div>

      <div className="flex-grow space-y-[16px]">
        <div className="grid grid-cols-2 gap-[8px]">
          {fields.map((field) => (
            <FormField
              key={field.key}
              field={field}
              value={data[field.key]}
              onChange={(value) => onInputChange(field.key as keyof T, value)}
              isEditing={isEditing}
            />
          ))}
        </div>
      </div>

      <FormActions
        isEditing={isEditing}
        isSaving={isSaving}
        onSave={onSave}
        onCancel={onCancel}
        onEdit={onEdit}
      />
    </div>
  );
}; 