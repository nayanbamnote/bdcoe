import React from 'react';

interface FieldProps {
  label?: string;
  value: string;
}

interface FieldGroupProps {
  fields: FieldProps[];
  className?: string;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ fields, className = "gap-6" }) => {
  return (
    <div className={`flex ${className} items-center`}>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field.label && <p className="m-0 font-semibold">{field.label}:</p>}
          <p className="m-0">{field.value}</p>
        </div>
      ))}
    </div>
  );
};

export default FieldGroup;
