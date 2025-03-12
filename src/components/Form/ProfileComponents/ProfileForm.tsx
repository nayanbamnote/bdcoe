import React from 'react';
import { ProfileDetails } from '@/types/profile';
import { motion, AnimatePresence } from "framer-motion";

interface ProfileFormProps {
  profileDetails: ProfileDetails;
  onInputChange: (field: keyof ProfileDetails, value: string) => void;
  validationErrors: { [K in keyof ProfileDetails]?: string };
}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`w-full bg-transparent text-[16px] transition-all duration-300 ease-in-out focus:outline-none placeholder:text-gray-400 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
);

Input.displayName = 'Input';

const FormField = ({ 
  type,
  value,
  onChange,
  placeholder,
  error
}: {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
}) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="border-b-2 border-gray-200 py-[4px] focus:border-[#3eb2ce] placeholder:opacity-70"
          />
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[12px] text-red-500 mt-[4px] absolute"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profileDetails,
  onInputChange,
  validationErrors
}) => {
  return (
    <div className="space-y-[24px]">
      <FormField
        type="text"
        value={profileDetails.name}
        onChange={(value) => onInputChange("name", value)}
        placeholder="Full Name"
        error={validationErrors.name}
      />

      <FormField
        type="email"
        value={profileDetails.email}
        onChange={(value) => onInputChange("email", value)}
        placeholder="Email Address"
        error={validationErrors.email}
      />

      <FormField
        type="tel"
        value={profileDetails.phone}
        onChange={(value) => onInputChange("phone", value)}
        placeholder="Phone Number"
        error={validationErrors.phone}
      />

      <FormField
        type="text"
        value={profileDetails.location}
        onChange={(value) => onInputChange("location", value)}
        placeholder="Location"
        error={validationErrors.location}
      />
    </div>
  );
};
