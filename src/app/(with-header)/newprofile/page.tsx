import { Suspense } from 'react'
import NewProfileForm from '@/components/forms/NewProfileForm'
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

async function getExistingProfile() {
  try {
    const session = await auth()
    const userId = session?.userId
    if (!userId) return null

    // First get the Student record
    const student = await db.student.findUnique({
      where: { clerkUserId: userId }
    })

    if (!student) return null

    // Then get the ProfileComplete record
    const profile = await db.profileComplete.findUnique({
      where: { studentId: student.id }
    })

    if (!profile) return null

    // Transform the data to match the form structure
    return {
      profile: {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        imageUrl: profile.imageUrl || undefined
      },
      academic: {
        college_id: profile.college_id,
        rollNumber: profile.rollNumber,
        currentSemester: profile.currentSemester,
        section: profile.section,
        yearOfAdmission: profile.yearOfAdmission
      },
      additional: {
        aadharNo: profile.aadharNo,
        dob: profile.dob,
        bloodGroup: profile.bloodGroup || undefined,
        addressOnAadhar: profile.addressOnAadhar,
        permanentAddress: profile.permanentAddress || undefined,
        casteCategory: profile.casteCategory,
        subcaste: profile.subcaste || undefined,
        religion: profile.religion
      },
      guardian: {
        fatherName: profile.fatherName,
        fatherOccupation: profile.fatherOccupation || undefined,
        fatherQualification: profile.fatherQualification || undefined,
        fatherContact: profile.fatherContact,
        motherName: profile.motherName,
        motherOccupation: profile.motherOccupation || undefined,
        motherQualification: profile.motherQualification || undefined,
        motherContact: profile.motherContact
      },
      siblings: profile.siblings ? JSON.parse(profile.siblings) : [],
      interests: profile.interests ? JSON.parse(profile.interests) : [],
      academicHistory: profile.academicHistory ? JSON.parse(profile.academicHistory) : [],
      accommodation: {
        isHosteler: profile.isHosteler,
        hasScholarship: profile.hasScholarship,
        ...(profile.accommodationDetails ? JSON.parse(profile.accommodationDetails) : {})
      }
    }
  } catch (error) {
    console.error("Error fetching profile:", error)
    return null
  }
}

export default async function NewProfilePage() {
  const existingProfile = await getExistingProfile()

  return (
    <div className="container mx-auto py-[40px]">
      <h1 className="text-[24px] font-bold mb-[32px]">Complete Your Profile</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <NewProfileForm initialData={existingProfile} />
      </Suspense>
    </div>
  )
}