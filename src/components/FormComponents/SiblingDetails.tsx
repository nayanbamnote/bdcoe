import React, { useState } from "react";
import { z } from "zod";
import DynamicDetails, { AreaItem } from "./DynamicDetail";
import DynamicDialog from "../DialogComponents/DynamicDialog";
import { saveDetails } from "@/utils/saveDetails";

const FamilyDetails: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [area, setArea] = useState<AreaItem[][]>([
    [
      { 
        fields: [
          { 
            label: "Name of Sibling", 
            value: "John Doe", 
            validation: z.string().min(1, "Name cannot be empty."),
          }
        ] 
      },
      { 
        fields: [
          { 
            label: "Age", 
            value: "25", 
            validation: z.string().regex(/^\d+$/, "Age must be a number."),
          },
          { 
            label: "Aadhar No", 
            value: "1234 5678 901", 
            validation: z.string().regex(/^\d{4} \d{4} \d{4}$/, "Invalid Aadhar format. Must be in XXXX XXXX XXXX format."),
          }
        ]
      },
      { 
        fields: [
          { 
            label: "Occupation", 
            value: "Software Engineer", 
            validation: z.string().min(1, "Occupation cannot be empty.")
          }
        ] 
      },
      { 
        fields: [
          { 
            label: "Address of Organization", 
            value: "123 Tech Park, Silicon Valley, CA", 
            validation: z.string().min(10, "Address must be at least 10 characters long.")
          }
        ] 
      }
    ]
  ]);

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

const formatFamilyDetailsPayload = (updatedArea: AreaItem[][]) => ({
  name: updatedArea[0][0].fields[0].value,                 
  age: updatedArea[0][1].fields[0].value,                 
  aadharNo: updatedArea[0][1].fields[1].value,            
  occupation: updatedArea[0][2].fields[0].value,         
  organizationAddress: updatedArea[0][3].fields[0].value  
}
);

  const handleSave = async (updatedArea: AreaItem[][]) => {
    saveDetails(updatedArea, "/api/siblingDetails", formatFamilyDetailsPayload, setArea);
  };

  return (
    <>
      <DynamicDetails 
        title="Sibling Details" 
        area={area} 
        onEdit={handleEdit} 
      />
      <DynamicDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        area={area}
        onSave={handleSave}
      />
    </>
  );
};

export default FamilyDetails;
