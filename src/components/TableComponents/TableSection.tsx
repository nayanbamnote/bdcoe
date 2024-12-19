import { Pencil, Save } from "lucide-react";
import React, { useState } from "react";
import { TableHeader, TableRow, TableHead, TableBody, Table } from "../ui/table";
import { Button } from "../ui/button";
import EditableRow from "./EditableRow";

type TableSectionProps = {
  title: string;
  columns: { key: string; label: string; editable: boolean; type?: string }[];
  initialData: Record<string, any>[];
  onSave: (data: Record<string, any>[]) => Promise<void>; // Callback for save functionality
  isSaving?: boolean; // Optional prop for saving state
};

const TableSection: React.FC<TableSectionProps> = ({ title, columns, initialData, onSave, isSaving = false }) => {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([...initialData]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedData([...data]);
    }
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedData = [...editedData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setEditedData(updatedData);
  };

  const saveChanges = async () => {
    await onSave(editedData); // Delegate save logic to parent
    setData([...editedData]);
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button onClick={toggleEditMode} className="hover:bg-gray-100 rounded-full p-1">
          <Pencil size={18} />
        </button>
      </div>

      <Table className="border border-gray-200 w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isEditing
            ? editedData.map((row, index) => (
                <EditableRow
                  key={index}
                  data={row}
                  columns={columns}
                  isEditing={isEditing}
                  onChange={(field, value) => handleInputChange(index, field, value)}
                />
              ))
            : data.map((row, index) => (
                <EditableRow key={index} data={row} columns={columns} isEditing={false} onChange={() => {}} />
              ))}
        </TableBody>
      </Table>

      {isEditing && (
        <div className="mt-4 flex justify-end">
          <Button
            onClick={saveChanges}
            className="flex items-center gap-2"
            disabled={isSaving}
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TableSection;
