import React from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column {
  header: string;
  key: string;
  type?: string;
  placeholder?: string;
}

interface TableContentProps {
  columns: Column[];
  data: any[];
  isEditing: boolean;
  onInputChange: (index: number, field: string, value: string) => void;
}

const TableContent: React.FC<TableContentProps> = ({
  columns,
  data,
  isEditing,
  onInputChange,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={row.label || row.year}>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                className={column.key === "label" || column.key === "year" ? "font-medium" : ""}
              >
                {isEditing && column.key !== "label" && column.key !== "percentage" ? (
                  <Input
                    type={column.type || "text"}
                    value={row[column.key] || ""}
                    onChange={(e) =>
                      onInputChange(index, column.key, e.target.value)
                    }
                    className="h-[36px]"
                    placeholder={column.placeholder || ""}
                  />
                ) : column.key === "percentage" ? (
                  row[column.key] ? `${row[column.key]}%` : "-"
                ) : (
                  row[column.key] || "-"
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableContent; 