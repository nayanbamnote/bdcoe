import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { 
        clerkUserId: user.id 
      },
      include: {
        additionalDetails: true,
      }
    });

    if (!student?.additionalDetails) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    return NextResponse.json({ data: student.additionalDetails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching additional details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    let student = await prisma.student.upsert({
      where: { 
        clerkUserId: user.id 
      },
      update: {},
      create: {
        clerkUserId: user.id,
      },
    });

    const additionalDetails = await prisma.additionalStudentDetails.upsert({
      where: {
        studentId: student.id,
      },
      update: {
        aadharNo: body.aadharNo,
        dob: new Date(body.dob),
        bloodGroup: body.bloodGroup,
        addressOnAadhar: body.addressOnAadhar,
        permanentAddress: body.permanentAddress,
        casteCategory: body.casteCategory,
        subcaste: body.subcaste,
        religion: body.religion,
      },
      create: {
        studentId: student.id,
        aadharNo: body.aadharNo,
        dob: new Date(body.dob),
        bloodGroup: body.bloodGroup,
        addressOnAadhar: body.addressOnAadhar,
        permanentAddress: body.permanentAddress,
        casteCategory: body.casteCategory,
        subcaste: body.subcaste,
        religion: body.religion,
      },
    });

    return NextResponse.json(
      { 
        message: "Additional details updated successfully",
        data: additionalDetails 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating additional details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 