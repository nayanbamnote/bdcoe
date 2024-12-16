import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface DatePickerFieldProps {
  value: string;  // value is a string in "DD/MM/YYYY" format
  onChange: (date: string | undefined) => void;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ value, onChange }) => {
  // Split the initial value into day, month, and year
  const [day, setDay] = useState(value ? value.split('/')[0] : '');
  const [month, setMonth] = useState(value ? value.split('/')[1] : '');
  const [year, setYear] = useState(value ? value.split('/')[2] : '');
  const [error, setError] = useState('');

  // Validate and update on each change
  useEffect(() => {
    validateAndUpdateDate();
  }, [day, month, year]);

  const validateAndUpdateDate = () => {
    // Basic validation
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    // Check if all fields are filled
    if (!day || !month || !year) {
      setError('');
      return;
    }

    // Validate day (1-31)
    if (dayNum < 1 || dayNum > 31) {
      setError('Invalid day');
      return;
    }

    // Validate month (1-12)
    if (monthNum < 1 || monthNum > 12) {
      setError('Invalid month');
      return;
    }

    // Validate year (reasonable range)
    const currentYear = new Date().getFullYear();
    if (yearNum < 1900 || yearNum > currentYear) {
      setError('Invalid year');
      return;
    }

    // Additional validation for specific month days
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum > daysInMonth) {
      setError(`Invalid day for ${new Date(yearNum, monthNum - 1).toLocaleString('default', { month: 'long' })}`);
      return;
    }

    // If all validations pass
    setError('');
    const formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    onChange(formattedDate);
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>, 
    value: string, 
    maxLength: number
  ) => {
    // Only allow numeric input
    const numericValue = value.replace(/\D/g, '');
    
    // Limit to maxLength
    if (numericValue.length <= maxLength) {
      setter(numericValue);
    }
  };

  return (
    <div className="flex space-x-2 w-full">
      <div className="flex-1">
        <Input 
          placeholder="DD"
          value={day}
          onChange={(e) => handleInputChange(setDay, e.target.value, 2)}
          className={error ? "border-red-500" : ""}
        />
      </div>
      <div className="flex-1">
        <Input 
          placeholder="MM"
          value={month}
          onChange={(e) => handleInputChange(setMonth, e.target.value, 2)}
          className={error ? "border-red-500" : ""}
        />
      </div>
      <div className="flex-1">
        <Input 
          placeholder="YYYY"
          value={year}
          onChange={(e) => handleInputChange(setYear, e.target.value, 4)}
          className={error ? "border-red-500" : ""}
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm col-span-3 mt-1">
          {error}
        </div>
      )}
    </div>
  );
};