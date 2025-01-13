"use client";
import React, { useState, useEffect } from 'react';
import AdditionalStudentDetails from '@/components/Form/AdditionalStudentDetails'
import Divider from '@/components/Form/Divider'
import GuardianDetails from '@/components/Form/GuardianDetails'
import SiblingDetails from '@/components/Form/SiblingDetails'
import StudentDetails from '@/components/Form/StudentDetails'
import StudentProfileHeader from '@/components/Form/StudentProfileHeader'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AcademicsTable from '@/components/Form/AcademicsTable'
import { ShieldAlert } from 'lucide-react'
import HobbyDetails from '@/components/Form/HobbyDetails'
import TechnicalInterestDetails from '@/components/Form/TechnicalInterestDetails'
import AccommodationToggle from '@/components/Form/AccommodationToggle'
import ScholarshipDetails from '@/components/Form/ScholarshipDetails'
import HostelDetails from '@/components/Form/HostelDetails'

interface AccommodationToggles {
  hasScholarship: boolean;
  isHosteler: boolean;
}

const Page = () => {
  const [toggleStates, setToggleStates] = useState<AccommodationToggles>({
    hasScholarship: false,
    isHosteler: false,
  });

  useEffect(() => {
    const initializeStudent = async () => {
      try {
        const response = await fetch('/api/student/init', {
          method: 'POST',
        });
        
        if (!response.ok) {
          console.error('Failed to initialize student record');
        }
      } catch (error) {
        console.error('Error initializing student:', error);
      }
    };

    initializeStudent();
  }, []);

  const handleToggleChange = (newToggles: AccommodationToggles) => {
    setToggleStates(newToggles);
  };

  return (
    <MaxWidthWrapper className="my-[24px] md:my-[48px] px-[16px] md:px-[24px] lg:px-[32px]">
      <h1 className="text-black33 text-[20px] md:text-[28px] text-center mb-[24px]">
        Student Information
      </h1>
      
      <div className="w-full md:w-[90%] lg:w-info mx-auto">
        {/* Alert Banner */}
        <div className="w-full min-h-[48px] p-[12px] md:p-[16px] rounded-tr-lg rounded-tl-lg border border-[#ffef85] bg-[#fffaeb] text-[#945e12] flex flex-col md:flex-row justify-center items-center gap-[8px] md:gap-[12px] text-[14px] md:text-base">
          <ShieldAlert color="#945e12" size={20}/>
          <p className="m-0 text-center md:text-left">
            This is the student mentor/mentee form that will be seen by the faculty or admin when you apply. Please ensure it is up to date.
          </p>
        </div>
        
        {/* Form Container */}
        <div className="text-gray66 text-[14px] md:text-base border-l border-r border-b border-grayee border-t-transparent rounded-br-lg rounded-bl-lg">
          <div className="px-[16px] sm:px-[32px] md:px-[48px] lg:px-[72px] py-[24px] md:py-[32px] lg:py-[42px]">
            <StudentProfileHeader />
            <Divider />
            <StudentDetails />
            <Divider />
            <AdditionalStudentDetails />
            <Divider />
            <SiblingDetails />
            <Divider />
            <GuardianDetails/>
            <Divider />
            <TechnicalInterestDetails />
            <Divider />
            <HobbyDetails />
            <Divider />
            <div className="overflow-x-auto">
              <AcademicsTable />
            </div>
            <Divider />
            <AccommodationToggle onToggleChange={handleToggleChange} />
            <Divider />
            {toggleStates.hasScholarship && (
              <>
                <ScholarshipDetails />
                <Divider />
              </>
            )}
            {toggleStates.isHosteler && (
              <>
                <HostelDetails />
              </>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page