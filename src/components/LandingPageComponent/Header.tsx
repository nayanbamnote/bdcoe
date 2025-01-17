"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { SignOutButton } from "@clerk/nextjs"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, LayoutDashboard, LogOut, LogIn, Menu, X, ChevronDown } from 'lucide-react'
import { isAdmin } from "@/utils/adminUtils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  isActive?: boolean
}

const NavLink: React.FC<NavItem> = ({ label, href, icon, isActive }) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link 
      href={href}
      className={`flex items-center space-x-[6px] px-[10px] py-[6px] rounded-md transition-colors duration-200 ${
        isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
      }`}
      tabIndex={0}
      aria-current={isActive ? "page" : undefined}
    >
      {icon}
      <span>{label}</span>
    </Link>
  </motion.li>
)

const AuthButton: React.FC = () => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={false}
  >
    <SignedIn>
      <SignOutButton redirectUrl="/">
        <Button 
          variant="destructive" 
          size="sm"
          type="button"
          className="inline-flex items-center justify-center"
        >
          <LogOut className="mr-[6px] h-[16px] w-[16px]" />
          Sign Out
        </Button>
      </SignOutButton>
    </SignedIn>
    <SignedOut>
      <Button 
        asChild 
        variant="default" 
        size="sm"
        type="button"
      >
        <Link href="/sign-in">
          <LogIn className="mr-[6px] h-[16px] w-[16px]" />
          Login
        </Link>
      </Button>
    </SignedOut>
  </motion.li>
)

const Header: React.FC = () => {
  const { user, isSignedIn } = useUser()
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const baseNavigationItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-[16px] w-[16px]" />,
      isActive: false,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="h-[16px] w-[16px]" />,
    },
  ]

  const adminNavigationItem: NavItem = {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-[16px] w-[16px]" />,
  }

  const [navigationItems, setNavigationItems] = useState<NavItem[]>(baseNavigationItems)

  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true)
      try {
        if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
          setIsUserAdmin(false)
          setNavigationItems(baseNavigationItems)
        } else {
          const adminStatus = await isAdmin(user.primaryEmailAddress.emailAddress)
          setIsUserAdmin(adminStatus)
          setNavigationItems(adminStatus 
            ? [...baseNavigationItems, adminNavigationItem]
            : baseNavigationItems
          )
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsUserAdmin(false)
        setNavigationItems(baseNavigationItems)
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminStatus()
  }, [isSignedIn, user?.primaryEmailAddress?.emailAddress])

  return (
    <motion.header 
      className="bg-white shadow-sm sticky top-[0px] z-[50]"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="banner"
    >
      <div className="container mx-auto px-[16px] sm:px-[20px] lg:px-[24px]">
        <div className="flex justify-between items-center py-[12px]">
          <Link 
            href="/" 
            className="flex-shrink-[0]"
            tabIndex={0}
            aria-label="Go to homepage"
          >
            <Image
              src="/bd-logo2.png"
              alt="BDCOE"
              width={200}
              height={30}
              className="h-[32px] w-auto"
              priority
            />
          </Link>
          
          <nav className="hidden md:!flex items-center space-x-[12px]" role="navigation">
            <ul className="flex space-x-[12px] items-center mb-0">
              {!isLoading && navigationItems.map((item, index) => (
                <NavLink key={index} {...item} />
              ))}
              <AuthButton />
            </ul>
          </nav>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-[16px] w-[16px]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              {!isLoading && navigationItems.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href} className="flex items-center cursor-pointer">
                    {item.icon}
                    <span className="ml-[6px]">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <AuthButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}

export default Header