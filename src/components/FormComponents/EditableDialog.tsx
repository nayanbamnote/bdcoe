import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fieldGroups: {
    fields: { label?: string; value: string }[];
  }[];
  onFieldChange: (groupIndex: number, fieldIndex: number, newValue: string) => void;
}

const EditableDialog: React.FC<EditableDialogProps> = ({
  isOpen,
  onClose,
  fieldGroups,
  onFieldChange
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fieldGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="grid grid-cols-4 items-center gap-4">
              {group.fields.map((field, fieldIndex) => (
                <React.Fragment key={fieldIndex}>
                  {field.label && (
                    <Label htmlFor={`field-${groupIndex}-${fieldIndex}`} className="text-right">
                      {field.label}
                    </Label>
                  )}
                  <Input
                    id={`field-${groupIndex}-${fieldIndex}`}
                    value={field.value}
                    onChange={(e) =>
                      onFieldChange(groupIndex, fieldIndex, e.target.value)
                    }
                    className={`col-span-${field.label ? 3 : 4}`}
                  />
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClose}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditableDialog;
