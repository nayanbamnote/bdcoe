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

    // Find the student record with profile
    const student = await prisma.student.findUnique({
      where: { 
        clerkUserId: user.id 
      },
      include: {
        profile: true,
      }
    });

    // If student exists but no profile, return null
    if (!student?.profile) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    // Return the profile data directly
    return NextResponse.json({ data: student.profile }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
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
    
    // Find the student first
    const student = await prisma.student.findUnique({
      where: { 
        clerkUserId: user.id 
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student record not found" },
        { status: 404 }
      );
    }

    // Update or create profile
    const profile = await prisma.studentProfile.upsert({
      where: {
        studentId: student.id,
      },
      update: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        location: body.location,
        imageUrl: body.imageUrl,
      },
      create: {
        studentId: student.id,
        name: body.name,
        email: body.email,
        phone: body.phone,
        location: body.location,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(
      { 
        message: "Profile updated successfully",
        data: profile 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 