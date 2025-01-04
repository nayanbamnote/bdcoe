# Project Overview

This project is a college website designed to digitize the student information submission process. The website consists of a simple landing page (home page) and a protected profile page where students can manage their details. The authentication and authorization for the profile page are handled using Clerk.

# Core Functionalities

## 1. User Authentication & Profile Access

### 1.1 Login Flow (Using Clerk)
* **Home page** (`/`): The user lands on this page with a **Login button** in the navigation bar
* Clicking the **Login** button redirects users to **Clerk sign-in/sign-up pages** (`/sign-in`, `/sign-up`)
* After successful authentication, **Clerk** creates a **user session** and redirects the user back to the **home page**
* **Session management**: Clerk tracks the session, which ensures that the system knows who is logged in

### 1.2 Profile Access Flow (Protected Route)
* Once logged in, users see a **Profile** option in the navigation bar
* Clicking **Profile** takes users to the **protected** `/profile` page
* **Unauthorized users** are redirected to the sign-in page if they try to access `/profile`

## 2. Profile Page Flow

### 2.1 Recognizing Returning Students (Edge Case Handling)
* **Check for existing profile**: When a student navigates to the profile page, we first use their **clerk id** to **query Supabase** for any existing data
   * **If data exists**:
      * Pre-fill the form with the stored information
   * **If no data exists**:
      * Display an placeholder in the corresponding component for the student to fill out their details

This step is essential for **recognizing returning students** before they proceed to update or fill in their details.

### 2.2 Data Entry and Validation (Using Zod)
* **Form Fields**: Once the student's data is fetched (or if it's a new student), they will fill in personal, parental, and academic details on the **profile page**
* **Zod Validation**: As they fill out the form, each input will be validated using **Zod**, ensuring:
   * The data is in the correct format (e.g., email, date of birth, etc.)
   * All required fields are filled in correctly
   * Additional custom validation rules can be applied (e.g., academic information must be in a valid format)
   * Example:

```typescript
const profileSchema = z.object({
    name: z.string().min(2, "Name should be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    dob: z.date().refine(dob => dob < new Date(), "Date of birth can't be in the future"),
    // Other validation rules
});
```

### 2.3 Saving Data to Database (Handling Updates)
* **Form Submission**: When the user submits the form:
   * **If it's a new user** (no existing data): Create a new record in the database
   * **If it's an existing user** (returning student): Update their existing record with the new data
   * Use **Next.js API routes** to handle the form submission, and **Prisma** will interact with **Supabase PostgreSQL** to save or update the data
   * Example:

```typescript
const existingProfile = await prisma.profile.findUnique({
    where: { userId: userId }
});

if (existingProfile) {
    // Update existing record
    await prisma.profile.update({
        where: { userId: userId },
        data: updatedData,
    });
} else {
    // Create new record
    await prisma.profile.create({
        data: {
            userId: userId,
            ...updatedData
        },
    });
}
```

### 2.4 Partial Progress Handling
* **Save progress**: If the user doesn't finish the form in one go, they can save their progress
   * Store partial data temporarily in **Supabase** or use the **session** to store the incomplete data
   * Show a **progress tracker** indicating the sections that are completed
   * When the user returns, they can resume filling out the form from where they left off

## 3. Admin Access and Data Management

### 3.1 Viewing and Managing Data
* Admins can view, search, and filter student data via a **dashboard**
* The dashboard retrieves student data from **Supabase** and displays it in an easy-to-read format
* **Admin access control** ensures only authorized users with admin roles can view this dashboard

### 3.2 Exporting Data
* Admins can export student information for administrative purposes, for example, in CSV format

