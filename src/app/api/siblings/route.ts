import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db as prisma } from "@/lib/db";

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
      where: { clerkUserId: user.id },
      include: { siblings: true }
    });

    return NextResponse.json(
      { data: student?.siblings || [] },
      { status: 200 }
    );
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

    const { siblings } = await req.json();
    
    let student = await prisma.student.upsert({
      where: { clerkUserId: user.id },
      update: {},
      create: { clerkUserId: user.id },
    });

    // Delete existing siblings
    await prisma.siblingDetails.deleteMany({
      where: { studentId: student.id }
    });

    // Create new siblings
    const createdSiblings = await Promise.all(
      siblings.map((sibling: any) =>
        prisma.siblingDetails.create({
          data: {
            studentId: student.id,
            name: sibling.name,
            age: parseInt(sibling.age),
            aadharNo: sibling.aadharNo,
            occupation: sibling.occupation,
            organizationAddress: sibling.organizationAddress,
          },
        })
      )
    );

    return NextResponse.json(
      { 
        message: "Sibling details updated successfully",
        data: createdSiblings 
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