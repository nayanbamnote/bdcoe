import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Pencil, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ScholarshipDetails = () => {
  // Initial scholarship data
  const initialScholarshipData = [
    { academicYear: "2020-2021", type: "Merit-based", criteria: "Top 10% in class", amount: "$1000" },
    { academicYear: "2021-2022", type: "Need-based", criteria: "Income below $30,000", amount: "$1500" },
    { academicYear: "2022-2023", type: "Sports", criteria: "State-level winner", amount: "$2000" },
    { academicYear: "2023-2024", type: "Research Grant", criteria: "Published paper in a journal", amount: "$2500" },
  ];

  // State for scholarship data and edit mode
  const [scholarshipData, setScholarshipData] = useState(initialScholarshipData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([...initialScholarshipData]);

  // Handle edit mode toggle
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    // Reset edited data when entering edit mode
    if (!isEditing) {
      setEditedData([...scholarshipData]);
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = (index: any, field: any, value: any) => {
    const newEditedData = [...editedData];
    newEditedData[index] = {
      ...newEditedData[index],
      [field]: value,
    };
    setEditedData(newEditedData);
  };

  // Save edited data
  const saveChanges = () => {
    setScholarshipData([...editedData]);
    setIsEditing(false);
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">SCHOLARSHIP OFFERED DETAILS (IF ANY)</h1>
        <button 
          onClick={toggleEditMode} 
          className="hover:bg-gray-100 rounded-full p-1"
        >
          <Pencil size={18} />
        </button>
      </div>

      <Table className="border border-gray-200 w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Academic Year</TableHead>
            <TableHead>Type of Scholarship</TableHead>
            <TableHead>Criteria</TableHead>
            <TableHead>Amount of Scholarship</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isEditing
            ? editedData.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>
                    <Input 
                      value={row.academicYear} 
                      onChange={(e) => handleInputChange(index, "academicYear", e.target.value)}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={row.type} 
                      onChange={(e) => handleInputChange(index, "type", e.target.value)}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={row.criteria} 
                      onChange={(e) => handleInputChange(index, "criteria", e.target.value)}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={row.amount} 
                      onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                      className="w-full"
                    />
                  </TableCell>
                </TableRow>
              ))
            : scholarshipData.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>{row.academicYear}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.criteria}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {isEditing && (
        <div className="mt-4 flex justify-end">
          <Button onClick={saveChanges} className="flex items-center gap-2">
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScholarshipDetails;
