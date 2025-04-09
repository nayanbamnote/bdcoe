import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
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
    const student = await db.student.findUnique({
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
    console.log("Processing profile submission for user:", user.id);
    
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

    try {
      // Find or create student record
      const student = await db.student.upsert({
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

      // Create or update the ProfileComplete record
      const profileComplete = await db.profileComplete.upsert({
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

      return NextResponse.json({ 
        success: true, 
        message: "Profile updated successfully",
        data: profileComplete
      }, { status: 200 });

    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: "Failed to save profile data",
          error: dbError instanceof Error ? dbError.message : "Database error"
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("Request processing error:", error);
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

export async function PUT(req: NextRequest) {
  try {
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
    console.log("Processing profile update for user:", user.id);
    
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

    try {
      // Find or create student record
      const student = await db.student.upsert({
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

      // Update the ProfileComplete record
      const profileComplete = await db.profileComplete.update({
        where: { studentId: student.id },
        data: {
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

      return NextResponse.json({ 
        success: true, 
        message: "Profile updated successfully",
        data: profileComplete
      }, { status: 200 });

    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: "Failed to save profile data",
          error: dbError instanceof Error ? dbError.message : "Database error"
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("Request processing error:", error);
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