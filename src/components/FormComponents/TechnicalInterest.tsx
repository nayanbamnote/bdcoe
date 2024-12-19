import React, { useState } from 'react';
import DynamicDetails, { AreaItem } from './DynamicDetail';
import DynamicDialog from '../DialogComponents/DynamicDialog'; 
import { saveDetails } from '@/utils/saveDetails';

const TechnicalInterest: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [area, setArea] = useState<AreaItem[][]>([
    [
      { 
        fields: [
          { 
            label: "Technical Interest", 
            value: "Web Development" 
          }
        ]
      }
    ]
  ]);

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const formatTechnicalInterestPayload = (updatedArea: AreaItem[][]) => ({
    interest: updatedArea[0][0].fields[0].value
})

  const handleSave = async (updatedArea: AreaItem[][]) => {
        saveDetails(updatedArea, "/api/technicalInterestDetails", formatTechnicalInterestPayload, setArea);
  };

  return (
    <>
      <DynamicDetails 
        title="TECHNICAL AREA OF INTEREST"
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

export default TechnicalInterest;
