import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Check, X } from 'lucide-react';
import * as z from "zod";
import { BaseFormData, FormFieldWithValidation, FormProps } from "@/types/form";


const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`w-full bg-transparent text-[16px] transition-all duration-300 ease-in-out focus:outline-none ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
);

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center p-[10px] rounded-full text-[14px] font-medium transition-all duration-300 ease-in-out focus:outline-none ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
);

const FormField = ({ 
  field, 
  value, 
  onChange, 
  isEditing,
  error 
}: {
  field: FormFieldWithValidation;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  error?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="mb-[24px] relative">
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
              <Input
                ref={inputRef}
                type={field.type || "text"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder}
                className="border-b border-gray-200 pb-[6px] focus:border-[#3eb2ce]"
              />
              {error && (
                <p className="text-[12px] text-red-500 mt-[4px]">{error}</p>
              )}
            </div>
          ) : (
            <div className="text-[16px] text-gray-800 mt-[8px]">
              {value || "Not provided"}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
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
  return (
    <motion.div 
      className="relative w-[40px] h-[40px]"
      initial={false}
      animate={isEditing ? { width: 90 } : { width: 40 }}
      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <>
            <motion.div
              key="save"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 top-0"
            >
              <Button
                onClick={onSave}
                className="bg-[#3eb2ce] text-white hover:bg-[#35a0bc] disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="currentColor" fillOpacity="0.3"/>
                      <path d="M12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4V2Z" fill="currentColor"/>
                    </svg>
                  </motion.div>
                ) : (
                  <Check size={20} />
                )}
              </Button>
            </motion.div>
            <motion.div
              key="cancel"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
              className="absolute right-0 top-0"
            >
              <Button
                onClick={onCancel}
                className="bg-gray-200 text-gray-600 hover:bg-gray-300"
              >
                <X size={20} />
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div
            key="edit"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Button
              onClick={onEdit}
              className="bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              <Edit3 size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: FormFieldWithValidation, value: any): string => {
    if (field.validation) {
      try {
        field.validation.parse(value);
        return '';
      } catch (err) {
        if (err instanceof z.ZodError) {
          return err.errors[0].message;
        }
      }
    }
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field, data[field.key]);
      if (error) {
        newErrors[field.key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    onSave();
  };

  if (isLoading) {
    return <FormSkeleton fieldCount={fields.length} />;
  }

  return (
    <div className="bg-white p-[20px] sm:p-[32px] rounded-[12px] shadow-lg">
      <div className="flex items-center justify-between mb-[24px] sm:mb-[32px]">
        <h2 className="text-[20px] sm:text-[24px] font-bold text-gray-800">
          {title}
        </h2>
        <FormActions
          isEditing={isEditing}
          isSaving={isSaving}
          onSave={handleSave}
          onCancel={() => {
            setErrors({});
            onCancel();
          }}
          onEdit={onEdit}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px]">
        {fields.map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={data[field.key] || ''}
            onChange={(value) => {
              onInputChange(field.key as keyof T, value);
              if (isEditing) {
                const error = validateField(field, value);
                setErrors(prev => ({
                  ...prev,
                  [field.key]: error
                }));
              }
            }}
            isEditing={isEditing}
            error={errors[field.key]}
          />
        ))}
      </div>
    </div>
  );
};

export const FormSkeleton = ({ fieldCount }: { fieldCount: number }) => {
  return (
    <div className="bg-white p-[24px] sm:p-[32px] rounded-[12px] shadow-lg max-w-[800px] mx-auto">
      <div className="flex items-center justify-between mb-[32px]">
        <div className="h-[28px] sm:h-[32px] w-[180px] sm:w-[200px] bg-gray-200 rounded-[4px]" />
        <div className="h-[40px] w-[40px] bg-gray-200 rounded-full" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[32px]">
        {Array.from({ length: fieldCount }).map((_, i) => (
          <div key={i} className="mb-[24px]">
            <div className="h-[16px] w-[100px] sm:w-[120px] bg-gray-200 rounded-[4px] mb-[8px]" />
            <div className="h-[24px] w-full bg-gray-100 rounded-[4px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

