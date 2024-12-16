import React from "react";
import { Pencil } from "lucide-react";
import { z } from "zod";


interface FieldGroupProps {
  fields: Field[];
  className?: string;
}


interface Field {
  label?: string;
  value: string;
  validation?: z.ZodTypeAny;
  renderComponent?: string;
  options?: string[];
}

export interface AreaItem {
  className?: string;
  fields: Field[];
}

interface DynamicDetailsProps {
  title: string;
  icon?: React.ReactNode;
  area: AreaItem[][];
  onEdit: () => void;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ fields, className = "gap-6" }) => {
  return (
    <div className={`flex ${className} items-center`}>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* {field.label && <p className="m-0 font-semibold">{field.label}:</p>} */}
          <p className="m-0">{field.value}</p>
        </div>
      ))}
    </div>
  );
};

const DynamicDetails: React.FC<DynamicDetailsProps> = ({ 
  title, 
  area, 
  icon = <Pencil />,
  onEdit 
}) => {
  return (
    <div className="flex">
      <div className="pr-[85px] pt-5 w-[200px] shrink-0">{title}</div>
      <div className="flex flex-col gap-3 w-full">
      {area.map((fieldGroups, index)=>(
        <div key={index} className="w-full flex justify-between border border-solid p-5 border-grayee rounded-lg">
        <div className="flex flex-col gap-3">
          {fieldGroups.map((group, groupIndex) => (
            <FieldGroup 
              key={groupIndex} 
              fields={group.fields}
              className={group.className}
            />
          ))}
        </div>
        {onEdit && (
          <button 
            onClick={onEdit} 
            className="bg-transparent border-none cursor-pointer"
          >
            {icon}
          </button>
        )}
      </div>
      ))
      }
      </div>
    </div>
  );
};

export default DynamicDetails;