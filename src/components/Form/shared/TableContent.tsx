import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className="text-left py-[12px] px-[16px] text-[14px] font-medium text-gray-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.label || row.year}
              className="border-b border-gray-200 last:border-none"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-[12px] px-[16px]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isEditing ? "input" : "value"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isEditing && column.key !== "label" && column.key !== "percentage" ? (
                        <input
                          type={column.type || "text"}
                          value={row[column.key] || ""}
                          onChange={(e) =>
                            onInputChange(index, column.key, e.target.value)
                          }
                          placeholder={column.placeholder}
                          className="w-full bg-transparent text-[16px] border-b border-gray-200 pb-[6px] focus:border-[#3eb2ce] focus:outline-none transition-all duration-300 ease-in-out"
                        />
                      ) : (
                        <span className={`text-[16px] ${column.key === "label" ? "font-medium text-gray-800" : "text-gray-600"}`}>
                          {column.key === "percentage" && row[column.key] 
                            ? `${row[column.key]}%` 
                            : row[column.key] || "-"}
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent; 