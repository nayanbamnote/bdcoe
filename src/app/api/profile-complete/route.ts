import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // Get current authenticated user
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find student with all their profile data
    const student = await prisma.student.findUnique({
      where: { 
        clerkUserId: user.id 
      },
      include: {
        profile: true,
        academic: true,
        additionalDetails: true,
        guardianDetails: true,
        siblings: true,
        hobbies: true,
        technicalInterests: true,
        academicDetails: true,
        hostel: true,
        scholarship: true,
      }
    });

    if (!student) {
      return NextResponse.json({ 
        success: true, 
        data: null 
      }, { status: 200 });
    }

    // Return all profile data
    return NextResponse.json({ 
      success: true, 
      data: student 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching complete profile:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch profile data",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("entered the route")
    // Get current authenticated user
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await req.json();
    console.log("body in the route", body)
    
    // Get the form data from different steps
    const { profile, academic, additional, guardian, siblings, interests, academicHistory, accommodation } = body;

    if (!profile || !academic || !additional || !guardian) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Missing required form data" 
        },
        { status: 400 }
      );
    }

    // Find or create student record
    let student = await prisma.student.upsert({
      where: { 
        clerkUserId: user.id 
      },
      update: {},
      create: {
        clerkUserId: user.id,
        clerkName: user.firstName || null,
        clerkEmail: user.emailAddresses[0]?.emailAddress || null,
        clerkPhone: user.phoneNumbers[0]?.phoneNumber || null,
      },
    });
    
    // Process all profile data in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create or update the ProfileComplete record
      const profileComplete = await tx.profileComplete.upsert({
        where: { studentId: student.id },
        update: {
          // Personal Info
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          imageUrl: profile.imageUrl || null,
          
          // Academic Info
          college_id: academic.college_id,
          rollNumber: academic.rollNumber,
          currentSemester: academic.currentSemester,
          section: academic.section,
          yearOfAdmission: academic.yearOfAdmission,
          
          // Additional Details
          aadharNo: additional.aadharNo,
          dob: additional.dob,
          bloodGroup: additional.bloodGroup || null,
          addressOnAadhar: additional.addressOnAadhar,
          permanentAddress: additional.permanentAddress || null,
          casteCategory: additional.casteCategory,
          subcaste: additional.subcaste || null,
          religion: additional.religion,
          
          // Guardian Details
          fatherName: guardian.fatherName,
          fatherOccupation: guardian.fatherOccupation || null,
          fatherQualification: guardian.fatherQualification || null,
          fatherContact: guardian.fatherContact,
          motherName: guardian.motherName,
          motherOccupation: guardian.motherOccupation || null,
          motherQualification: guardian.motherQualification || null,
          motherContact: guardian.motherContact,
          
          // Serialize complex data as JSON strings
          siblings: siblings ? JSON.stringify(siblings) : null,
          interests: interests ? JSON.stringify(interests) : null,
          academicHistory: academicHistory ? JSON.stringify(academicHistory) : null,
          
          // Accommodation Details
          isHosteler: accommodation?.isHosteler || false,
          hasScholarship: accommodation?.hasScholarship || false,
          accommodationDetails: accommodation ? JSON.stringify(accommodation) : null,
        },
        create: {
          studentId: student.id,
          
          // Personal Info
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          imageUrl: profile.imageUrl || null,
          
          // Academic Info
          college_id: academic.college_id,
          rollNumber: academic.rollNumber,
          currentSemester: academic.currentSemester,
          section: academic.section,
          yearOfAdmission: academic.yearOfAdmission,
          
          // Additional Details
          aadharNo: additional.aadharNo,
          dob: additional.dob,
          bloodGroup: additional.bloodGroup || null,
          addressOnAadhar: additional.addressOnAadhar,
          permanentAddress: additional.permanentAddress || null,
          casteCategory: additional.casteCategory,
          subcaste: additional.subcaste || null,
          religion: additional.religion,
          
          // Guardian Details
          fatherName: guardian.fatherName,
          fatherOccupation: guardian.fatherOccupation || null,
          fatherQualification: guardian.fatherQualification || null,
          fatherContact: guardian.fatherContact,
          motherName: guardian.motherName,
          motherOccupation: guardian.motherOccupation || null,
          motherQualification: guardian.motherQualification || null,
          motherContact: guardian.motherContact,
          
          // Serialize complex data as JSON strings
          siblings: siblings ? JSON.stringify(siblings) : null,
          interests: interests ? JSON.stringify(interests) : null,
          academicHistory: academicHistory ? JSON.stringify(academicHistory) : null,
          
          // Accommodation Details
          isHosteler: accommodation?.isHosteler || false,
          hasScholarship: accommodation?.hasScholarship || false,
          accommodationDetails: accommodation ? JSON.stringify(accommodation) : null,
        },
      });
      
      // Update student profile (Personal Info)
      const updatedProfile = await tx.studentProfile.upsert({
        where: { studentId: student.id },
        update: {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          imageUrl: profile.imageUrl || null,
        },
        create: {
          studentId: student.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          imageUrl: profile.imageUrl || null,
        },
      });
      
      // Update academic info
      const updatedAcademic = await tx.academicInfo.upsert({
        where: { studentId: student.id },
        update: {
          college_id: academic.college_id,
          rollNumber: academic.rollNumber,
          currentSemester: academic.currentSemester,
          section: academic.section,
          yearOfAdmission: academic.yearOfAdmission,
        },
        create: {
          studentId: student.id,
          college_id: academic.college_id,
          rollNumber: academic.rollNumber,
          currentSemester: academic.currentSemester,
          section: academic.section,
          yearOfAdmission: academic.yearOfAdmission,
        },
      });
      
      // Parse date to a proper DateTime format
      const dobDate = new Date(additional.dob);
      
      // Update additional details
      const updatedAdditional = await tx.additionalStudentDetails.upsert({
        where: { studentId: student.id },
        update: {
          aadharNo: additional.aadharNo,
          dob: dobDate,
          bloodGroup: additional.bloodGroup || null,
          addressOnAadhar: additional.addressOnAadhar,
          permanentAddress: additional.permanentAddress || null,
          casteCategory: additional.casteCategory,
          subcaste: additional.subcaste || null,
          religion: additional.religion,
        },
        create: {
          studentId: student.id,
          aadharNo: additional.aadharNo,
          dob: dobDate,
          bloodGroup: additional.bloodGroup || null,
          addressOnAadhar: additional.addressOnAadhar,
          permanentAddress: additional.permanentAddress || null,
          casteCategory: additional.casteCategory,
          subcaste: additional.subcaste || null,
          religion: additional.religion,
        },
      });
      
      // Update guardian details
      const updatedGuardian = await tx.guardianDetails.upsert({
        where: { studentId: student.id },
        update: {
          fatherName: guardian.fatherName,
          fatherOccupation: guardian.fatherOccupation || null,
          fatherQualification: guardian.fatherQualification || null,
          fatherContact: guardian.fatherContact,
          motherName: guardian.motherName,
          motherOccupation: guardian.motherOccupation || null,
          motherQualification: guardian.motherQualification || null,
          motherContact: guardian.motherContact,
        },
        create: {
          studentId: student.id,
          fatherName: guardian.fatherName,
          fatherOccupation: guardian.fatherOccupation || null,
          fatherQualification: guardian.fatherQualification || null,
          fatherContact: guardian.fatherContact,
          motherName: guardian.motherName,
          motherOccupation: guardian.motherOccupation || null,
          motherQualification: guardian.motherQualification || null,
          motherContact: guardian.motherContact,
        },
      });
      
      // Update accommodation details
      if (accommodation) {
        // Update hostel info
        await tx.hostel.upsert({
          where: { studentId: student.id },
          update: { isHosteler: accommodation.isHosteler || false },
          create: {
            studentId: student.id,
            isHosteler: accommodation.isHosteler || false,
          },
        });
        
        // Update scholarship info
        await tx.scholarship.upsert({
          where: { studentId: student.id },
          update: { hasScholarship: accommodation.hasScholarship || false },
          create: {
            studentId: student.id,
            hasScholarship: accommodation.hasScholarship || false,
          },
        });
      }
      
      return {
        profileComplete: profileComplete,
        profile: updatedProfile,
        academic: updatedAcademic,
        additional: updatedAdditional,
        guardian: updatedGuardian,
      };
    });
    
    // Return a success response with the created/updated data
    return NextResponse.json({ 
      success: true, 
      message: "Profile data saved successfully",
      data: result
    });
  } catch (error) {
    console.error("Error processing profile submission:", error);
    
    // Return an error response
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to process profile submission",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 