"use client";

import { useState, useMemo } from "react";
import type { Student, StudentProfile, AcademicInfo, AdditionalStudentDetails, GuardianDetails } from "@prisma/client";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React from "react";

type CompleteStudent = Student & {
  profile: StudentProfile | null;
  academic: AcademicInfo | null;
  additionalDetails: AdditionalStudentDetails | null;
  guardianDetails: GuardianDetails | null;
  siblings: any[];
  hobbies: any[];
  academicDetails: any[];
  technicalInterests: any[];
  scholarship: any | null;
  hostel: any | null;
  scholarshipDetails: any[];
  hostelDetails: any[];
};

interface StudentTableProps {
  students: CompleteStudent[];
}

type FilterType = "all" | "withProfile" | "withoutProfile" | "hosteler" | "dayScholar" | "withScholarship" | "withoutScholarship";

const StudentTable = ({ students }: StudentTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<string>("all");
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Search logic
      let matchesSearch = true;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        switch (searchField) {
          case "name":
            matchesSearch = (student.profile?.name?.toLowerCase() || "").includes(term);
            break;
          case "email":
            matchesSearch = (student.profile?.email?.toLowerCase() || "").includes(term);
            break;
          case "phone":
            matchesSearch = (student.profile?.phone || "").includes(term);
            break;
          case "rollNumber":
            matchesSearch = (student.academic?.rollNumber?.toLowerCase() || "").includes(term);
            break;
          case "aadhar":
            matchesSearch = (student.additionalDetails?.aadharNo || "").includes(term);
            break;
          case "all":
            matchesSearch = 
              (student.profile?.name?.toLowerCase() || "").includes(term) ||
              (student.profile?.email?.toLowerCase() || "").includes(term) ||
              (student.profile?.phone || "").includes(term) ||
              (student.academic?.rollNumber?.toLowerCase() || "").includes(term) ||
              (student.additionalDetails?.aadharNo || "").includes(term);
            break;
        }
      }

      // Filter logic
      let matchesFilter = true;
      switch (filter) {
        case "withProfile":
          matchesFilter = student.profile !== null;
          break;
        case "withoutProfile":
          matchesFilter = student.profile === null;
          break;
        case "hosteler":
          matchesFilter = student.hostel?.isHosteler === true;
          break;
        case "dayScholar":
          matchesFilter = student.hostel?.isHosteler === false;
          break;
        case "withScholarship":
          matchesFilter = student.scholarship?.hasScholarship === true;
          break;
        case "withoutScholarship":
          matchesFilter = student.scholarship?.hasScholarship === false;
          break;
        case "all":
          matchesFilter = true;
          break;
      }

      return matchesSearch && matchesFilter;
    });
  }, [students, searchTerm, searchField, filter]);

  const handleRowToggle = (studentId: number) => {
    setExpandedRows(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const renderDetailRow = (student: CompleteStudent) => {
    return (
      <tr className="bg-gray-50">
        <td colSpan={5} className="p-[16px]">
          <div className="grid grid-cols-2 gap-[16px]">
            {/* Academic Info */}
            <div>
              <h3 className="font-semibold mb-[8px]">Academic Information</h3>
              <p>College ID: {student.academic?.college_id || "N/A"}</p>
              <p>Roll Number: {student.academic?.rollNumber || "N/A"}</p>
              <p>Semester: {student.academic?.currentSemester || "N/A"}</p>
              <p>Section: {student.academic?.section || "N/A"}</p>
              <p>Year of Admission: {student.academic?.yearOfAdmission || "N/A"}</p>
            </div>

            {/* Additional Details */}
            <div>
              <h3 className="font-semibold mb-[8px]">Additional Details</h3>
              <p>Aadhar: {student.additionalDetails?.aadharNo || "N/A"}</p>
              <p>DOB: {student.additionalDetails?.dob ? new Date(student.additionalDetails.dob).toLocaleDateString() : "N/A"}</p>
              <p>Blood Group: {student.additionalDetails?.bloodGroup || "N/A"}</p>
              <p>Address (Aadhar): {student.additionalDetails?.addressOnAadhar || "N/A"}</p>
              <p>Permanent Address: {student.additionalDetails?.permanentAddress || "N/A"}</p>
              <p>Religion: {student.additionalDetails?.religion || "N/A"}</p>
              <p>Caste: {student.additionalDetails?.casteCategory || "N/A"}</p>
              <p>Subcaste: {student.additionalDetails?.subcaste || "N/A"}</p>
            </div>

            {/* Guardian Details */}
            <div>
              <h3 className="font-semibold mb-[8px]">Guardian Details</h3>
              {student.guardianDetails ? (
                <>
                  <p>Father's Name: {student.guardianDetails.fatherName || "N/A"}</p>
                  <p>Father's Contact: {student.guardianDetails.fatherContact || "N/A"}</p>
                  <p>Father's Occupation: {student.guardianDetails.fatherOccupation || "N/A"}</p>
                  <p>Father's Qualification: {student.guardianDetails.fatherQualification || "N/A"}</p>
                  <p>Mother's Name: {student.guardianDetails.motherName || "N/A"}</p>
                  <p>Mother's Contact: {student.guardianDetails.motherContact || "N/A"}</p>
                  <p>Mother's Occupation: {student.guardianDetails.motherOccupation || "N/A"}</p>
                  <p>Mother's Qualification: {student.guardianDetails.motherQualification || "N/A"}</p>
                </>
              ) : (
                <p>No guardian details available</p>
              )}
            </div>

            {/* Accommodation Status */}
            <div>
              <h3 className="font-semibold mb-[8px]">Accommodation Status</h3>
              <p>Scholarship: {student.scholarship?.hasScholarship ? "Yes" : "No"}</p>
              <p>Hostel: {student.hostel?.isHosteler ? "Yes" : "No"}</p>
            </div>

            {/* Academic History */}
            {(student.academicDetails?.length ?? 0) > 0 && (
              <div className="col-span-2">
                <h3 className="font-semibold mb-[8px]">Academic History</h3>
                <div className="grid grid-cols-4 gap-[8px]">
                  {student.academicDetails?.map((detail, index) => (
                    <div key={index} className="bg-white p-[8px] rounded border">
                      <p className="font-medium">Label: {detail.label}</p>
                      <p>Year: {detail.year}</p>
                      <p>Marks: {detail.totalMarks}/{detail.outOfMarks}</p>
                      <p>Percentage: {detail.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies & Interests */}
            <div className="col-span-2">
              <h3 className="font-semibold mb-[8px]">Hobbies & Technical Interests</h3>
              <div className="flex flex-wrap gap-[8px]">
                {student.hobbies?.map((hobby, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-[8px] py-[4px] rounded-full">
                    {hobby.hobby}
                  </span>
                ))}
                {student.technicalInterests?.map((interest, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-[8px] py-[4px] rounded-full">
                    {interest.interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Scholarship Details */}
            {(student.scholarshipDetails?.length ?? 0) > 0 && (
              <div className="col-span-2">
                <h3 className="font-semibold mb-[8px]">Scholarship History</h3>
                <div className="grid grid-cols-3 gap-[8px]">
                  {student.scholarshipDetails?.map((detail, index) => (
                    <div key={index} className="bg-white p-[8px] rounded border">
                      <p className="font-medium">Year: {detail.year}</p>
                      <p>Type: {detail.type}</p>
                      <p>Amount: {detail.amount}</p>
                      <p>Criteria: {detail.criteria}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hostel Details */}
            {(student.hostelDetails?.length ?? 0) > 0 && (
              <div className="col-span-2">
                <h3 className="font-semibold mb-[8px]">Hostel History</h3>
                <div className="grid grid-cols-3 gap-[8px]">
                  {student.hostelDetails?.map((detail, index) => (
                    <div key={index} className="bg-white p-[8px] rounded border">
                      <p className="font-medium">Year: {detail.year}</p>
                      <p>Room: {detail.roomDetails}</p>
                      <p>Partner: {detail.partnerDetails}</p>
                      <p>Transportation: {detail.transportation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Siblings */}
            {(student.siblings?.length ?? 0) > 0 && (
              <div className="col-span-2">
                <h3 className="font-semibold mb-[8px]">Siblings</h3>
                <div className="grid grid-cols-3 gap-[8px]">
                  {student.siblings?.map((sibling, index) => (
                    <div key={index} className="bg-white p-[8px] rounded border">
                      <p className="font-medium">Name: {sibling.name}</p>
                      <p>Age: {sibling.age}</p>
                      <p>Aadhar: {sibling.aadharNo}</p>
                      <p>Occupation: {sibling.occupation}</p>
                      <p>Organization: {sibling.organizationAddress}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="mt-[24px] w-full">
      <div className="mb-[16px] space-y-[16px]">
        {/* Search Section */}
        <div className="flex items-center gap-[16px]">
          <div className="relative flex-1">
            <Search className="absolute left-[8px] top-[50%] h-4 w-4 -translate-y-[50%] text-gray-500" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-[8px] pl-[32px]"
              aria-label="Search students"
            />
          </div>
          
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="rounded-md border border-gray-300 p-[8px]"
            aria-label="Search field"
          >
            <option value="all">All Fields</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="rollNumber">Roll Number</option>
            <option value="aadhar">Aadhar Number</option>
          </select>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="rounded-md border border-gray-300 p-[8px]"
            aria-label="Filter students"
          >
            <option value="all">All Students</option>
            <option value="withProfile">With Profile</option>
            <option value="withoutProfile">Without Profile</option>
            <option value="hosteler">Hostelers</option>
            <option value="dayScholar">Day Scholars</option>
            <option value="withScholarship">With Scholarship</option>
            <option value="withoutScholarship">Without Scholarship</option>
          </select>
        </div>

        {/* Results count */}
        <div className="text-[14px] text-gray-600">
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-[12px] text-left"></th>
              <th className="p-[12px] text-left">Name</th>
              <th className="p-[12px] text-left">Email</th>
              <th className="p-[12px] text-left">Phone</th>
              <th className="p-[12px] text-left">Profile Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <React.Fragment key={student.id}>
                <tr className="border-t">
                  <td className="p-[12px]">
                    <button
                      onClick={() => handleRowToggle(student.id)}
                      className="p-[4px] hover:bg-gray-100 rounded"
                    >
                      {expandedRows.includes(student.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                  <td className="p-[12px]">{student.profile?.name || "N/A"}</td>
                  <td className="p-[12px]">{student.profile?.email || "N/A"}</td>
                  <td className="p-[12px]">{student.profile?.phone || "N/A"}</td>
                  <td className="p-[12px]">
                    {student.profile ? (
                      <span className="rounded-full bg-green-100 px-[12px] py-[4px] text-green-800">
                        Complete
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-[12px] py-[4px] text-red-800">
                        Incomplete
                      </span>
                    )}
                  </td>
                </tr>
                {expandedRows.includes(student.id) && renderDetailRow(student)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable; 