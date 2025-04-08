"use client"

import { useState } from 'react'

export default function TestProfileAPI() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testData = {
    profile: {
      name: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      location: "Test City",
      imageUrl: "",
    },
    academic: {
      college_id: "TESTID123",
      rollNumber: "TEST123",
      currentSemester: "5",
      section: "A",
      yearOfAdmission: "2023",
    },
    additional: {
      aadharNo: "123456789012",
      dob: "2000-01-01",
      bloodGroup: "A+",
      addressOnAadhar: "Test Address",
      permanentAddress: "Test Permanent Address",
      casteCategory: "General",
      subcaste: "",
      religion: "Hindu",
    },
    guardian: {
      fatherName: "Test Father",
      fatherOccupation: "Test Occupation",
      fatherQualification: "Test Qualification",
      fatherContact: "9876543210",
      motherName: "Test Mother",
      motherOccupation: "Test Occupation",
      motherQualification: "Test Qualification",
      motherContact: "9876543211",
    },
    siblings: { 
      siblings: [
        {
          name: "Test Sibling",
          age: "20",
          aadharNo: "123456789011",
          occupation: "Student",
          organizationAddress: "Test Organization",
        }
      ]
    },
    interests: {
      hobbies: ["Reading", "Gaming"],
      technicalInterests: ["AI", "Web Development"],
    },
    academicHistory: {
      academicRecords: [
        {
          label: "High School",
          year: "2018",
          totalMarks: 450,
          outOfMarks: 500,
          percentage: "90",
        }
      ]
    },
    accommodation: {
      hasScholarship: true,
      isHosteler: true,
      scholarshipDetails: [
        {
          year: "First Year",
          academicYear: "2023-24",
          type: "Merit",
          criteria: "Marks",
          amount: "10000",
        }
      ],
      hostelDetails: [
        {
          year: "First Year",
          academicYear: "2023-24",
          roomDetails: "Room 101",
          partnerDetails: "Test Partner",
          transportation: "Bus",
        }
      ],
    },
  }

  const handleSubmitTest = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/profile-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      })
      
      const data = await response.json()
      setResult(data)
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGetProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/profile-complete', {
        method: 'GET',
      })
      
      const data = await response.json()
      setResult(data)
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Profile API</h1>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleSubmitTest}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit Test Data'}
        </button>
        
        <button
          onClick={handleGetProfile}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Get Profile Data'}
        </button>
      </div>
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
} 