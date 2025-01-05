"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { isAdmin } from "@/utils/adminUtils";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return null;

  const isAdminUser = user ? isAdmin(user.emailAddresses[0].emailAddress) : false;

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between p-[16px]">
        <Link href="/" className="text-[20px] font-bold">
          College Portal
        </Link>
        
        <div className="flex items-center gap-[16px]">
          {user && (
            <Link 
              href="/profile" 
              className="text-[16px] hover:text-blue-600"
              tabIndex={0}
              aria-label="Go to profile"
            >
              Profile
            </Link>
          )}
          
          {isAdminUser && (
            <Link
              href="/dashboard"
              className="text-[16px] hover:text-blue-600"
              tabIndex={0}
              aria-label="Go to admin dashboard"
            >
              Dashboard
            </Link>
          )}
          
          {/* Other navbar items */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 