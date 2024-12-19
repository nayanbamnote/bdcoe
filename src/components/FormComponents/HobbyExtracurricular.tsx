import React, { useState } from "react";
import DynamicDetails, { AreaItem } from "./DynamicDetail";
import DynamicDialog from "../DialogComponents/DynamicDialog";
import { z } from "zod";
import { saveDetails } from "@/utils/saveDetails";

const HobbyExtracurricular: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [area, setArea] = useState<AreaItem[][]>([
    [
      {
        fields: [
          { 
            label: "Hobbies/Activities (comma-separated)", 
            value: "Chess, Hockey", 
            validation: z.string().min(1, "Hobbies cannot be empty.") 
          }
        ]
      }
    ]
  ]);

  const handleEdit = () => { 
    setIsDialogOpen(true);
  };

  const formatHobbyExtracurricularPayload = (updatedArea: AreaItem[][]) => ({
    hobbies: updatedArea[0][0].fields[0].value,
  });

  const handleSave = async (updatedArea: AreaItem[][]) => {
    saveDetails(updatedArea, "/api/hobbyDetails", formatHobbyExtracurricularPayload, setArea);
  };

  return (
    <>
      <DynamicDetails 
        title="HOBBY/EXTRA CURRICULAR ACTIVITIES"
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

export default HobbyExtracurricular;
