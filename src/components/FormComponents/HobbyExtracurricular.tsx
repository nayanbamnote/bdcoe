import React, { useState } from "react";
import DynamicDetails, { AreaItem } from "./DynamicDetail";
import DynamicDialog from "../DialogComponents/DynamicDialog";
import { z } from "zod";

const HobbyExtracurricular: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [area, setArea] = useState<AreaItem[][]>([
    [
      {
        fields: [
          { 
            label: "Hobby/Activity", 
            value: "Chess", 
            validation: z.string().min(1, "Hobby/activity cannot be empty.") 
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
