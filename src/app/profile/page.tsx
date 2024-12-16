"use client";
import Divider from "@/components/Common/Divider";
import AcadamicsTable from "@/components/FormComponents/AcadamicsTable";
import GuardianDetails from "@/components/FormComponents/GuardianDetails";
import HobbyExtracurricular from "@/components/FormComponents/HobbyExtracurricular";
import HostelDetails from "@/components/FormComponents/HostleDetails";
import ScholarshipDetails from "@/components/FormComponents/ScholarshipDetails";
import SiblingDetails from "@/components/FormComponents/SiblingDetails";
import StudentDetails2 from "@/components/FormComponents/StudentDetail2";
import StudentDetails from "@/components/FormComponents/StudentDetails";
import StudentProfileHeader from "@/components/FormComponents/StudentProfileHeader";
import TechnicalInterest from "@/components/FormComponents/TechnicalInterest";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ShieldAlert } from "lucide-react";
import { useState } from "react";

export function StudentInfoForm() {


  return (
    <MaxWidthWrapper className="my-[48px]">
      <h1 className="text-black33 text-xl text-center ">Student Information</h1>
      <div className=" w-info mx-auto ">
      <div className="w-full h-[48px] rounded-tr-lg rounded-tl-lg border border-[#ffef85] bg-[#fffaeb] text-[#945e12] flex justify-center items-center gap-2 text-base ">
        <ShieldAlert color="#945e12" size={20}/>
          <p className="m-0">
            This is the resume employers will see when you apply. Please make
            sure it is up to date.
          </p>
        </div>
        
        {/* Form Starts Here  */}
        <div className=" text-gray66 text-base border-l border-r border-b border-grayee border-t-transparent rounded-br-lg rounded-bl-lg">
        <div className="px-[72px] py-[42px]">
          <StudentProfileHeader />
          <Divider />
          <StudentDetails2 />
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
