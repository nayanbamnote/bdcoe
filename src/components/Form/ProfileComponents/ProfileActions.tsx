import { Button } from "@/components/ui/button"
import { Pencil, Save, X, Loader2 } from 'lucide-react'

interface ProfileActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export const ProfileActions = ({ 
  isEditing, isSaving, onSave, onCancel, onEdit 
}: ProfileActionsProps) => (
  <div className="flex flex-col items-center space-y-[8px]">
    {isEditing ? (
      <div className="flex space-x-[8px]">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onCancel}
          className="hover:bg-[#FEE2E2]"
        >
          <X className="w-[20px] h-[20px] text-[#EF4444]" />
        </Button>
        <Button 
          onClick={onSave}
          className="flex items-center gap-[8px]"
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="h-[16px] w-[16px] animate-spin" />
          ) : (
            <Save className="h-[16px] w-[16px]" />
          )}
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    ) : (
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onEdit}
        className="hover:bg-[#F3F4F6]"
      >
        <Pencil size={18} />
      </Button>
    )}
  </div>
);
