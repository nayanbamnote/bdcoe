import React, { useState } from "react";
import DynamicDetails, { AreaItem } from "./DynamicDetail";
import DynamicDialog from "../DialogComponents/DynamicDialog";
import { z } from "zod";

const GuardianDetails: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [area, setArea] = useState<AreaItem[][]>([
    [
      {
        fields: [
          { 
            label: "Father's/Guardian's Name", 
            value: "Mr. John Doe", 
            validation: z.string().min(1, "Father's name cannot be empty.") 
          }
        ]
      },
      {
        fields: [
          { 
            label: "Father's/Guardian's Occupation", 
            value: "Professor", 
            validation: z.string().min(1, "Father's occupation cannot be empty.") 
          },
          { 
            label: "Father's/Guardian's Qualification", 
            value: "M.Sc Physics", 
            validation: z.string().min(1, "Father's qualification cannot be empty.") 
          }
        ]
      },
      {
        fields: [
          { 
            label: "Father's/Guardian's Contact", 
            value: "1234567890", 
            validation: z.string().regex(/^\d{10}$/, "Invalid contact number format. Must be 10 digits.")
          }
        ]
      }
    ],
    [
      {
        fields: [
          { 
            label: "Mother's/Guardian's Name", 
            value: "Mrs. Jane Doe", 
            validation: z.string().min(1, "Mother's name cannot be empty.") 
          }
        ]
      },
      {
        fields: [
          { 
            label: "Mother's/Guardian's Occupation", 
            value: "Teacher", 
            validation: z.string().min(1, "Mother's occupation cannot be empty.") 
          },
          { 
            label: "Mother's/Guardian's Qualification", 
            value: "B.Ed Mathematics", 
            validation: z.string().min(1, "Mother's qualification cannot be empty.") 
          }
        ]
      },
      {
        fields: [
          { 
            label: "Mother's/Guardian's Contact", 
            value: "1234567890", 
            validation: z.string().regex(/^\d{10}$/, "Invalid contact number format. Must be 10 digits.")
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
        title="Guardian/Parents Details"
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

export default GuardianDetails;
