import React, { useState } from "react";
import DynamicDetails, { AreaItem } from "./DynamicDetail";
import DynamicDialog from "../DialogComponents/DynamicDialog";
import { z } from "zod";

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
    ],
    [
      { 
        fields: [
          { 
            label: "Name of Sibling", 
            value: "Jane Doe", 
            validation: z.string().min(1, "Name cannot be empty."),
          }
        ] 
      },
      { 
        fields: [
          { 
            label: "Age", 
            value: "22", 
            validation: z.string().regex(/^\d+$/, "Age must be a number."),
          },
          { 
            label: "Aadhar No", 
            value: "9876 5432 101", 
            validation: z.string().regex(/^\d{4} \d{4} \d{4}$/, "Invalid Aadhar format. Must be in XXXX XXXX XXXX format."),
          }
        ]
      },
      { 
        fields: [
          { 
            label: "Occupation", 
            value: "Graphic Designer", 
            validation: z.string().min(1, "Occupation cannot be empty.")
          }
        ] 
      },
      { 
        fields: [
          { 
            label: "Address of Organization", 
            value: "456 Creative Studio, New York, NY", 
            validation: z.string().min(10, "Address must be at least 10 characters long.")
          }
        ] 
      }
    ]
  ]);

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const handleSave = (updatedArea: AreaItem[][]) => {
    setArea(updatedArea);
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
