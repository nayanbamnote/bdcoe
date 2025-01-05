"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdmin } from "@/utils/adminUtils";
import StudentTable from "@/components/Dashboard/StudentTable";
import type { Student, StudentProfile } from "@prisma/client";

type StudentWithProfile = Student & {
  profile: StudentProfile | null;
};

const DashboardPage = () => {
  const { user, isLoaded } = useUser();
  const [students, setStudents] = useState<StudentWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/admin/students");
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStudents();
    }
  }, [user]);

  if (!isLoaded) {
    return null;
  }

  if (!user || !isAdmin(user.emailAddresses[0].emailAddress)) {
    redirect("/");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white p-[24px]">
      <h1 className="text-[24px] font-semibold">Admin Dashboard</h1>
      <StudentTable students={students} />
    </div>
  );
};

export default DashboardPage; 