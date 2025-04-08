import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

// This is just a placeholder API route for submitting the complete profile form
// You'll need to implement the actual logic to save the data to the database

export async function GET() {
  try {
    console.log("GET /api/profile-complete - Fetching user profile");
    // Get current authenticated user
    const user = await currentUser();
    
    if (!user) {
      console.log("GET /api/profile-complete - No authenticated user found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log(`GET /api/profile-complete - Fetching profile for user: ${user.id}`);
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
      console.log(`GET /api/profile-complete - No profile found for user: ${user.id}`);
      return NextResponse.json({ 
        success: true, 
        data: null 
      }, { status: 200 });
    }

    console.log(`GET /api/profile-complete - Successfully retrieved profile for user: ${user.id}`);
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
  console.log("POST /api/profile-complete - Received request");
  
  try {
    // Get current authenticated user
    const user = await currentUser();
    
    if (!user) {
      console.log("POST /api/profile-complete - No authenticated user found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log(`POST /api/profile-complete - Processing request for user: ${user.id}`);
    
    // Parse the request body
    const body = await req.json();
    
    // Log the received data for debugging
    console.log("Received complete profile data structure:", Object.keys(body));
    console.log("Profile step data available:", body.profile ? "YES" : "NO");
    console.log("Academic step data available:", body.academic ? "YES" : "NO");
    console.log("Additional step data available:", body.additional ? "YES" : "NO");
    console.log("Guardian step data available:", body.guardian ? "YES" : "NO");
    console.log("Siblings step data available:", body.siblings ? "YES" : "NO");
    console.log("Interests step data available:", body.interests ? "YES" : "NO");
    console.log("Academic history step data available:", body.academicHistory ? "YES" : "NO");
    console.log("Accommodation step data available:", body.accommodation ? "YES" : "NO");
    
    // Get the form data from different steps
    const { profile, academic, additional, guardian, siblings, interests, academicHistory, accommodation } = body;

    if (!profile || !academic || !additional || !guardian) {
      console.log("POST /api/profile-complete - Missing required form data");
      return NextResponse.json(
        { 
          success: false, 
          message: "Missing required form data" 
        },
        { status: 400 }
      );
    }

    console.log(`POST /api/profile-complete - Creating/updating student record for user: ${user.id}`);
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

    console.log(`POST /api/profile-complete - Found/created student with ID: ${student.id}`);
    console.log(`POST /api/profile-complete - Starting transaction to update profile data`);
    
    // Create a transaction to ensure all operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      console.log(`Transaction: Updating student profile`);
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
      
      console.log(`Transaction: Updating academic info`);
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
      
      console.log(`Transaction: Updating additional details`);
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
      
      console.log(`Transaction: Updating guardian details`);
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
      
      // Handle siblings (delete existing and create new)
      if (siblings) {
        // Delete existing siblings
        await tx.siblingDetails.deleteMany({
          where: { studentId: student.id }
        });
        
        // Create new siblings
        if (siblings.length > 0) {
          const siblingData = siblings.map((sibling: any) => ({
            studentId: student.id,
            name: sibling.name,
            age: parseInt(sibling.age, 10),
            aadharNo: sibling.aadharNo,
            occupation: sibling.occupation,
            organizationAddress: sibling.organizationAddress,
          }));
          
          await tx.siblingDetails.createMany({
            data: siblingData,
          });
        }
      }
      
      // Handle technical interests (delete existing and create new)
      if (interests?.technicalInterests) {
        // Delete existing technical interests
        await tx.technicalInterestDetails.deleteMany({
          where: { studentId: student.id }
        });
        
        // Create new technical interests
        if (interests.technicalInterests.length > 0) {
          const techInterestsData = interests.technicalInterests.map((interest: string) => ({
            studentId: student.id,
            interest: interest,
          }));
          
          await tx.technicalInterestDetails.createMany({
            data: techInterestsData,
          });
        }
      }
      
      // Handle hobbies (delete existing and create new)
      if (interests?.hobbies) {
        // Delete existing hobbies
        await tx.hobbyDetails.deleteMany({
          where: { studentId: student.id }
        });
        
        // Create new hobbies
        if (interests.hobbies.length > 0) {
          const hobbiesData = interests.hobbies.map((hobby: string) => ({
            studentId: student.id,
            hobby: hobby,
          }));
          
          await tx.hobbyDetails.createMany({
            data: hobbiesData,
          });
        }
      }
      
      // Handle academic history (delete existing and create new)
      if (academicHistory) {
        // Delete existing academic details
        await tx.academicDetails.deleteMany({
          where: { studentId: student.id }
        });
        
        // Create new academic details
        if (academicHistory.length > 0) {
          const academicData = academicHistory.map((entry: any) => ({
            studentId: student.id,
            label: entry.label,
            year: entry.year,
            totalMarks: parseInt(entry.totalMarks, 10),
            outOfMarks: parseInt(entry.outOfMarks, 10),
            percentage: entry.percentage,
          }));
          
          await tx.academicDetails.createMany({
            data: academicData,
          });
        }
      }
      
      // Update accommodation details
      if (accommodation) {
        // Update hostel info
        await tx.hostel.upsert({
          where: { studentId: student.id },
          update: {
            isHosteler: accommodation.isHosteler || false,
          },
          create: {
            studentId: student.id,
            isHosteler: accommodation.isHosteler || false,
          },
        });
        
        // Update scholarship info
        await tx.scholarship.upsert({
          where: { studentId: student.id },
          update: {
            hasScholarship: accommodation.hasScholarship || false,
          },
          create: {
            studentId: student.id,
            hasScholarship: accommodation.hasScholarship || false,
          },
        });
      }
      
      // Return transaction result
      return {
        profile: updatedProfile,
        academic: updatedAcademic,
        additional: updatedAdditional,
        guardian: updatedGuardian,
      };
    });

    console.log(`POST /api/profile-complete - Transaction completed successfully`);
    
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