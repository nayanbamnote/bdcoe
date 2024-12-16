import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Pencil, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AcademicDetails = () => {
  // Initial academic data
  const initialAcademicData = [
    { label: "SSC", year: "2015", totalMarks: 500, outOfMarks: 600, percentage: "83.33%" },
    { label: "HSC", year: "2017", totalMarks: 450, outOfMarks: 500, percentage: "90%" },
    { label: "DIPLOMA", year: "2018", totalMarks: 700, outOfMarks: 800, percentage: "87.5%" },
    ...Array.from({ length: 8 }, (_, i) => ({
      label: `Sem-${i + 1}`,
      year: "2020",
      totalMarks: 600,
      outOfMarks: 700,
      percentage: "85.71%",
    })),
  ];

  // State for academic data and edit mode
  const [academicData, setAcademicData] = useState(initialAcademicData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([...initialAcademicData]);

  // Handle edit mode toggle
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    // Reset edited data when entering edit mode
    if (!isEditing) {
      setEditedData([...academicData]);
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = (index: any, field: any, value: any) => {
    const newEditedData = [...editedData];
    newEditedData[index] = {
      ...newEditedData[index],
      [field]: value
    };
    setEditedData(newEditedData);
  };

  // Save edited data
  const saveChanges = () => {
    setAcademicData([...editedData]);
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">ACADEMIC DETAILS</h1>
        <button 
          onClick={toggleEditMode} 
          className="hover:bg-gray-100 rounded-full p-1"
        >
          <Pencil size={18} />
        </button>
      </div>
      
      <Table className="border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Year and Semester</TableHead>
            <TableHead>Year of Passing</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead>Out of Marks</TableHead>
            <TableHead>Percentage/CGPA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {isEditing 
    ? editedData.map((row, index) => (
        <TableRow key={index} className="hover:bg-gray-50">
          <TableCell>{row.label}</TableCell> {/* First column remains non-editable */}
          <TableCell>
            <Input 
              value={row.year} 
              onChange={(e) => handleInputChange(index, 'year', e.target.value)}
              className="w-full"
            />
          </TableCell>
          <TableCell>
            <Input 
              type="number"
              value={row.totalMarks} 
              onChange={(e) => handleInputChange(index, 'totalMarks', e.target.value)}
              className="w-full"
            />
          </TableCell>
          <TableCell>
            <Input 
              type="number"
              value={row.outOfMarks} 
              onChange={(e) => handleInputChange(index, 'outOfMarks', e.target.value)}
              className="w-full"
            />
          </TableCell>
          <TableCell>
            <Input 
              value={row.percentage} 
              onChange={(e) => handleInputChange(index, 'percentage', e.target.value)}
              className="w-full"
            />
          </TableCell>
        </TableRow>
      ))
    : academicData.map((row, index) => (
        <TableRow key={index} className="hover:bg-gray-50">
          <TableCell>{row.label}</TableCell>
          <TableCell>{row.year}</TableCell>
          <TableCell>{row.totalMarks}</TableCell>
          <TableCell>{row.outOfMarks}</TableCell>
          <TableCell>{row.percentage}</TableCell>
        </TableRow>
      ))
  }
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

export default AcademicDetails;