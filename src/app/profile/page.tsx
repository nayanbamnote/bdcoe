"use client";
import Divider from "@/components/Common/Divider";
import AcadamicsTable from "@/components/FormComponents/AcadamicsTable";
import GuardianDetails from "@/components/FormComponents/GuardianDetails";
import HobbyExtracurricular from "@/components/FormComponents/HobbyExtracurricular";
import HostelDetails from "@/components/FormComponents/HostleDetails";
import ScholarshipDetails from "@/components/FormComponents/ScholarshipDetails";
import SiblingDetails from "@/components/FormComponents/SiblingDetails";
import AdditionalStudentDetails from "@/components/FormComponents/AdditionalStudentDetails";
import StudentDetails from "@/components/FormComponents/StudentDetails";
import StudentProfileHeader from "@/components/FormComponents/StudentProfileHeader";
import TechnicalInterest from "@/components/FormComponents/TechnicalInterest";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useAuth } from "@clerk/nextjs";
import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

   function StudentInfoForm() {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createStudent = async () => {
      if (!userId) return; // Ensure the user is authenticated

      try {
        const response = await fetch("/api/student", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to create or fetch student.");
        }

        const data = await response.json();
        console.log("API Response:", data);
      } catch (err: any) {
        setError("Failed to create or fetch student.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    createStudent();
  }, [userId]);

  if (loading) {
    return <div id="dvLoading"></div>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <MaxWidthWrapper className="my-[48px]">
      <h1 className="text-black33 text-xl text-center ">Student Information</h1>
      <div className=" w-info mx-auto ">
      <div className="w-full h-[48px] rounded-tr-lg rounded-tl-lg border border-[#ffef85] bg-[#fffaeb] text-[#945e12] flex justify-center items-center gap-2 text-base ">
        <ShieldAlert color="#945e12" size={20}/>
          <p className="m-0">
          This is the student mentor/mentee form that will be seen by the faculty or admin when you apply. Please ensure it is up to date.
          </p>
        </div>
        
        {/* Form Starts Here  */}
        <div className=" text-gray66 text-base border-l border-r border-b border-grayee border-t-transparent rounded-br-lg rounded-bl-lg">
        <div className="px-[72px] py-[42px]">
          <StudentProfileHeader />
          <Divider />
          <AdditionalStudentDetails />
          <Divider />
          <StudentDetails />
          <Divider />
          <GuardianDetails/>
          <Divider />
          <SiblingDetails />
          <Divider />
          <TechnicalInterest />
          <Divider />
          <HobbyExtracurricular />
          <Divider />
          <AcadamicsTable />
          <Divider />
          <ScholarshipDetails />
          <Divider />
          <HostelDetails />
        </div>
      </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default StudentInfoForm;
