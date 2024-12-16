import React, { useState } from "react";
import { Pencil, Save } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const HostelDetails = () => {
  // Initial facility data
  const initialFacilityData = [
    {
      academicYear: "2020-2021",
      roomDetails: "Yes, Room No. 101",
      partnerDetails: "John Doe, 1234567890",
      transportation: "Yes, Bus Stop A, Route 5",
    },
    {
      academicYear: "2021-2022",
      roomDetails: "Yes, Room No. 102",
      partnerDetails: "Jane Doe, 0987654321",
      transportation: "No",
    },
    {
      academicYear: "2022-2023",
      roomDetails: "No",
      partnerDetails: "-",
      transportation: "Yes, Bus Stop B, Route 3",
    },
    {
      academicYear: "2023-2024",
      roomDetails: "No",
      partnerDetails: "-",
      transportation: "No",
    },
  ];

  // State for facility data and edit mode
  const [facilityData, setFacilityData] = useState(initialFacilityData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([...initialFacilityData]);

  // Handle edit mode toggle
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedData([...facilityData]);
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
    setFacilityData([...editedData]);
    setIsEditing(false);
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">HOSTEL & TRANSPORT FACILITY UTILIZATION DETAILS:</h1>
        <button onClick={toggleEditMode} className="hover:bg-gray-100 rounded-full p-1">
          <Pencil size={18} />
        </button>
      </div>

      <Table className="border border-gray-200 w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Academic Year</TableHead>
            <TableHead>If Yes, then Hostel & Room No.</TableHead>
            <TableHead>Name, Mobile No. of Room Partners</TableHead>
            <TableHead>If Yes, then Bus Stop & Route</TableHead>
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
                      value={row.roomDetails}
                      onChange={(e) => handleInputChange(index, "roomDetails", e.target.value)}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.partnerDetails}
                      onChange={(e) => handleInputChange(index, "partnerDetails", e.target.value)}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.transportation}
                      onChange={(e) => handleInputChange(index, "transportation", e.target.value)}
                      className="w-full"
                    />
                  </TableCell>
                </TableRow>
              ))
            : facilityData.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>{row.academicYear}</TableCell>
                  <TableCell>{row.roomDetails}</TableCell>
                  <TableCell>{row.partnerDetails}</TableCell>
                  <TableCell>{row.transportation}</TableCell>
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

export default HostelDetails;
