import React from "react";
import { Input } from "../ui/input";
import { TableRow, TableCell } from "../ui/table";

type EditableRowProps = {
    data: Record<string, any>;
    columns: { key: string; editable: boolean; type?: string }[];
    isEditing: boolean;
    onChange: (field: string, value: any) => void;
  };
  
  const EditableRow: React.FC<EditableRowProps> = ({ data, columns, isEditing, onChange }) => (
    <TableRow className="hover:bg-gray-50">
      {columns.map((col) => (
        <TableCell key={col.key}>
          {isEditing && col.editable ? (
            <Input
              type={col.type || "text"}
              value={data[col.key]}
              onChange={(e) => onChange(col.key, e.target.value)}
              className="w-full"
            />
          ) : (
            data[col.key]
          )}
        </TableCell>
      ))}
    </TableRow>
  );
  
  export default EditableRow;