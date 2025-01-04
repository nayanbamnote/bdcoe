import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X, Loader2 } from "lucide-react";

interface TableWrapperProps {
  title: string;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  title,
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  children,
}) => {
  return (
    <div className="space-y-[16px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold">{title}</h2>
        <div className="flex space-x-[8px]">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={onCancel}
                className="hover:bg-red-50"
              >
                <X className="size-[20px] text-red-500" />
              </Button>
              <Button
                onClick={onSave}
                className="flex items-center gap-[8px]"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="size-[16px] animate-spin" />
                ) : (
                  <Save className="size-[16px]" />
                )}
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
              className="hover:bg-gray-100"
            >
              <Pencil size={18} />
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default TableWrapper; 