# Academic Form Implementation

This document outlines the implementation of the Academic Form feature in our application.

## Database Schema

The Academic Form uses a PostgreSQL database with Prisma ORM. The main model is `AcademicForm` which stores all the information collected from students.

### AcademicForm Model

The `AcademicForm` model includes the following fields:

- **Personal Information**: fullName, dateOfBirth, gender, nationality, contactEmail, phoneNumber
- **Academic Background**: highSchoolName, highSchoolGPA, graduationYear
- **Current Academic Status**: currentInstitution, major, minor, currentGPA, expectedGraduation
- **Academic Achievements**: honors, scholarships, certifications
- **Research Experience**: stored as JSON array of research experiences
- **Extracurricular Activities**: stored as JSON array of activities
- **Additional Information**: additionalInfo
- **Form Status**: status (draft, submitted, approved, rejected), submittedAt

## Frontend Implementation

The Academic Form is implemented as a multi-step form with the following components:

1. **FormContext**: Manages the form state and validation
2. **MultiStepForm**: Handles the step navigation and form submission
3. **FormProgress**: Displays the progress through the form steps
4. **Step Components**: Individual form steps for each section

### Form Steps

1. Personal Information
2. Academic Background
3. Current Academic Status
4. Academic Achievements
5. Research Experience
6. Extracurricular Activities
7. Additional Information

## Backend Implementation

The backend provides the following API endpoints:

### `/api/academic-form`

- **POST**: Submit a completed academic form
- **GET**: Retrieve all academic forms for the current user

### `/api/academic-form/draft`

- **POST**: Save a new draft of an academic form
- **PUT**: Update an existing draft

## Form Validation

Form validation is implemented at two levels:

1. **Client-side validation**: Using the FormContext to validate each step before proceeding
2. **Server-side validation**: Using Zod schema validation to ensure data integrity

## Form Submission Flow

1. User fills out the multi-step form
2. User can save drafts at any point
3. On final submission, the form is validated and saved to the database
4. User receives confirmation and is redirected to the dashboard

## Database Utilities

The `academic-form.ts` utility file provides functions for:

- Creating new academic forms
- Retrieving academic forms
- Updating academic forms
- Deleting academic forms
- Saving and updating drafts
- Submitting forms

## Authentication

All form operations require authentication. The user's ID is associated with each form to maintain data ownership and privacy. 