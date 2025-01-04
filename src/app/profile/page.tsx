import AdditionalStudentDetails from '@/components/Form/AdditionalStudentDetails'
import Divider from '@/components/Form/Divider'
import GuardianDetails from '@/components/Form/GuardianDetails'
import SiblingDetails from '@/components/Form/SiblingDetails'
import StudentDetails from '@/components/Form/StudentDetails'
import StudentProfileHeader from '@/components/Form/StudentProfileHeader'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ShieldAlert } from 'lucide-react'
import React from 'react'
import HobbyDetails from '@/components/Form/HobbyDetails'
import TechnicalInterestDetails from '@/components/Form/TechnicalInterestDetails'

const page = () => {
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
        {/*
        <AcadamicsTable />
        <Divider />
        <ScholarshipDetails />
        <Divider />
        <HostelDetails /> 
        */}
      </div>
    </div>
    </div>
  </MaxWidthWrapper>
  )
}

export default page