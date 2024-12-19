import React, { useState } from "react";
import DynamicDetails, { AreaItem } from "./DynamicDetail";
import DynamicDialog from "../DialogComponents/DynamicDialog"; 
import { z } from "zod";
import { saveDetails } from "@/utils/saveDetails";

const AdditionalStudentDetails: React.FC = () => { 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [area, setArea] = useState<AreaItem[][]>([
    [
      { 
        fields: [
          { 
            label: "Current Semester", 
            value: "Semester 1", 
            validation: z.string().regex(/^Semester [1-8]$/, "Invalid semester. Must be from Semester 1 to Semester 8."),
            renderComponent: "SelectField",
            options: ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"]
          },
          { 
            label: "Section", 
            value: "A", 
            validation: z.string().regex(/^[A-D]$/, "Invalid section. Must be A, B, C, or D."),
            renderComponent: "SelectField",
            options: ["A", "B", "C", "D"]
          }
        ] 
      },
      { 
        fields: [
          { 
            label: "Student ID", 
            value: "123456789", 
            validation: z.string().min(1, "Student ID category cannot be empty.") 
          },
          { 
            label: "Year of Admission", 
            value: "2021", 
            validation: z.string().regex(/^\d{4}$/, "Invalid year. Must be a 4-digit year."),
            renderComponent: "YearPickerField" // Assuming this field uses a Year Picker component
          }
        ]
      }
    ]
  ]);

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const formatStudentPayload = (updatedArea: AreaItem[][]) => ({
    currentSemester: updatedArea[0][0].fields[0].value,
    section: updatedArea[0][0].fields[1].value,
    studentID: updatedArea[0][1].fields[0].value,
    yearOfAdmission: updatedArea[0][1].fields[1].value,
  });

  const handleSave = async (updatedArea: AreaItem[][]) => {
    saveDetails(updatedArea, "/api/additionalStudentDetails", formatStudentPayload, setArea);
  };
  

  return (
    <>
      <DynamicDetails 
        title="Student Details"
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

export default AdditionalStudentDetails;
