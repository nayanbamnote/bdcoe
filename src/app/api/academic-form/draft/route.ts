import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { saveAcademicFormDraft, updateAcademicFormDraft } from '@/lib/academic-form';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Save draft to database
    const draft = await saveAcademicFormDraft(body, session.user.id);
    
    return NextResponse.json(
      { 
        message: 'Draft saved successfully',
        draftId: draft.id
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error saving draft:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { formId, ...formData } = body;
    
    if (!formId) {
      return NextResponse.json(
        { message: 'Form ID is required' },
        { status: 400 }
      );
    }
    
    // Update draft in database
    const updatedDraft = await updateAcademicFormDraft(formId, formData);
    
    return NextResponse.json(
      { 
        message: 'Draft updated successfully',
        draft: updatedDraft
      }
    );
    
  } catch (error) {
    console.error('Error updating draft:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 