"use client";

import { useEffect, useState } from "react";
import StudentTable from "@/components/Dashboard/StudentTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/admin/students");
        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setStudents(data.data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-black p-4">
      <Alert variant="destructive" className="w-full max-w-md border-2 border-red-500 shadow-lg shadow-red-500/50 animate-pulse">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-red-500 animate-spin" />
          <AlertTitle className="text-xl font-bold text-red-500">ACCESS DENIED</AlertTitle>
        </div>
        <AlertDescription className="mt-2 text-sm font-medium text-red-300">
          {error}
        </AlertDescription>
      </Alert>
    </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white p-[24px]">
      <h1 className="text-[24px] font-semibold">Admin Dashboard</h1>
      <StudentTable students={students} />
    </div>
  );
} 