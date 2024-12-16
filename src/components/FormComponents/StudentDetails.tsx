import React, { useState } from "react";
import DynamicDetails, { AreaItem } from "./DynamicDetail";
import DynamicDialog from "../DialogComponents/DynamicDialog"; 
import { z } from "zod";

const StudentDetails: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [area, setArea] = useState<AreaItem[][]>([
    [
      { 
        fields: [
          { 
            label: "Aadhar No", 
            value: "9768 4578 9864", 
            validation: z.string().regex(/^\d{4} \d{4} \d{4}$/, "Invalid Aadhar format. Must be in XXXX XXXX XXXX format."),
          }
        ] 
      },
      { 
        fields: [
          { 
            label: "DOB", 
            value: "05/05/2004", 
            validation: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid DOB format. Must be in DD/MM/YYYY format.") ,
            renderComponent: "DatePickerField"
          }, 
          { 
            label: "Blood Group", 
            value: "A+", 
            validation: z.string().regex(/^(A|B|AB|O)[+-]$/, "Invalid blood group. Must be A+, A-, B+, B-, AB+, AB-, O+, or O-."),
            renderComponent: "SelectField",
            options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
          }
        ]
      },
      { 
        fields: [
          { 
            label: "Address on Aadhar", 
            value: "Near Power House, aldkfja;sdkfja, ;adkfjalkfa, a;dfkjad;flkj", 
            validation: z.string().min(10, "Address must be at least 10 characters long.") 
          }
        ] 
      },
      { 
        fields: [
          { 
            label: "Caste Category", 
            value: "General", 
            validation: z.string().min(1, "Caste category cannot be empty.") 
          },
          { 
            label: "Subcaste", 
            value: "Brahmin", 
            validation: z.string().min(1, "Subcaste cannot be empty.") 
          },
          { 
            label: "Religion", 
            value: "Hindu", 
            validation: z.string().min(1, "Religion cannot be empty.") 
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
        title="Additional Details"
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

export default StudentDetails;