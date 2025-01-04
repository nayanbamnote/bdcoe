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
        guardianDetails: true,
      }
    });

    if (!student?.guardianDetails) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    return NextResponse.json({ data: student.guardianDetails }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
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
    const student = await prisma.student.findUnique({
      where: { clerkUserId: user.id }
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const guardianDetails = await prisma.guardianDetails.upsert({
      where: { studentId: student.id },
      update: {
        fatherName: body.fatherName,
        fatherOccupation: body.fatherOccupation,
        fatherQualification: body.fatherQualification,
        fatherContact: body.fatherContact,
        motherName: body.motherName,
        motherOccupation: body.motherOccupation,
        motherQualification: body.motherQualification,
        motherContact: body.motherContact,
      },
      create: {
        studentId: student.id,
        fatherName: body.fatherName,
        fatherOccupation: body.fatherOccupation,
        fatherQualification: body.fatherQualification,
        fatherContact: body.fatherContact,
        motherName: body.motherName,
        motherOccupation: body.motherOccupation,
        motherQualification: body.motherQualification,
        motherContact: body.motherContact,
      },
    });

    return NextResponse.json(
      { 
        message: "Guardian details updated successfully",
        data: guardianDetails 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 