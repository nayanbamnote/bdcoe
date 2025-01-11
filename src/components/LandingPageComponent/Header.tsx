'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    isActive: true,
  },
  {
    label: "Profile",
    href: "/profile",
  },
];

const NavLink: React.FC<NavItem> = ({ label, href, isActive }) => (
  <li className={`${isActive ? "text-blue-600" : "text-gray-700"} hover:text-blue-500`}>
    <Link href={href}>{label}</Link>
  </li>
);

const AuthSection: React.FC = () => (
  <li>
    <SignedIn>
      <div className="p-1 bg-slate-200 rounded-lg transform scale-125 flex justify-center items-center">
        <UserButton />
      </div>
    </SignedIn>
    <SignedOut>
      <Link href="/sign-in" className="text-gray-700 hover:text-blue-500">Login</Link>
    </SignedOut>
  </li>
);

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/bd-logo2.png"
                alt="BDCOE"
                width={330}
                height={50}
                className="h-auto w-auto max-w-[200px] sm:max-w-[250px] md:max-w-[330px]"
              />
            </Link>
          </div>
          <nav className="flex">
            <ul className="flex space-x-8">
              {navigationItems.map((item, index) => (
                <NavLink key={index} {...item} />
              ))}
              <AuthSection />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

