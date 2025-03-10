'use client'

import React, { useState, useEffect } from "react"
import {
  Navbar as MTNavbar,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react"
import {
  XMarkIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/solid"
import { MdOutlineEventNote } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi"
import { RiHome2Line } from "react-icons/ri"
import { MaterialProps } from "./constants"
import { usePathname } from 'next/navigation'
import { useLoginModal } from "@/lib/context/AuthContext"
import { useAuth } from "@/hooks/useAuth"

interface NavItemProps {
  children: React.ReactNode
  href?: string
  isActive?: boolean
  onClick?: (e: React.MouseEvent) => void
}

const NAV_MENU = [
  {
    name: "Home",
    icon: RiHome2Line,
    href: "/",
  },
  {
    name: "Events",
    icon: MdOutlineEventNote,
    href: "/events",
  },
  {
    name: "My Tickets",
    icon: HiOutlineTicket,
    href: "/my-tickets",
  },
]

function NavItem({ children, href, isActive, onClick }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        onClick={onClick}
        variant="paragraph"
        className={`flex items-center gap-2 font-medium transition-all duration-300 hover:text-[#e30045] relative group ${isActive ? 'text-[#e30045]' : ''
          }`}
      >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e30045] transition-all duration-300 group-hover:w-full" />
      </Typography>
    </li>
  )
}

export function Navbar({ _isScrolling }: { _isScrolling?: boolean}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(_isScrolling ?? false)
  const { openLoginModal, openRegisterModal } = useLoginModal()
  const { user } = useAuth()

  const handleOpen = () => setOpen((cur) => !cur)

  const handleNavigation = (name: string, href: string) => {
    if (name === "My Tickets") {
      if (user?.access_token) {
        window.location.href = '/my-tickets'
      } else {
        openLoginModal()
      }
    } else {
      window.location.href = href
    }
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    )
  }, [])

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <MTNavbar
      {...MaterialProps}   
      shadow={false}
      fullWidth
      blurred={isScrolling}
      className={`fixed top-0 z-50 border-0 transition-all duration-300 ${
        isScrolling 
          ? 'bg-black/80 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="/"
          className="text-2xl font-bold text-white transition-all duration-300 hover:scale-105"
        >
          GMX <span className="text-[#e30045]">TICKETS</span>
        </Typography>

        {/* Desktop Navigation */}
        <ul className="ml-10 hidden items-center gap-8 lg:flex text-white">
          {NAV_MENU?.map(({ name, icon: Icon, href }) => (
            <NavItem 
              key={name} 
              href={href}
              isActive={pathname === href}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                handleNavigation(name, href)
              }}
            >
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>

        {/* Auth Buttons */}
        {!user?.access_token && (
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="text"
              className="flex flex-row items-center gap-2 text-white normal-case transition-all duration-300 hover:bg-white/10"
              onClick={openLoginModal}
            >
              <UserCircleIcon className="h-5 w-5" />
              <span>Sign In</span>
            </Button>
            <Button
              className="bg-[#e30045] normal-case transition-all duration-300 hover:shadow-lg hover:shadow-[#e30045]/20 hover:scale-105"
              onClick={openRegisterModal}
            >
              Create Account
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <IconButton
          variant="text"
          color="white"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden transition-transform duration-300 hover:scale-110"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="container mx-auto mt-3 rounded-xl bg-black/90 backdrop-blur-lg border border-white/10 px-6 py-5 lg:hidden animate-fadeIn">
          <ul className="flex flex-col gap-4 text-white">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <NavItem 
                key={name} 
                href={href}
                isActive={pathname === href}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  handleNavigation(name, href)
                  setOpen(false)
                }}
              >
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {name}
              </NavItem>
            ))}
            {!user?.access_token && (
              <>
                <li className="border-t border-white/10 pt-4">
                  <Button
                    variant="text"
                    className="flex items-center gap-2 text-white normal-case w-full justify-start transition-all duration-300 hover:bg-white/10"
                    onClick={() => {
                      openLoginModal()
                      setOpen(false)
                    }}
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    Sign In
                  </Button>
                </li>
                <li>
                  <Button
                    className="bg-[#e30045] normal-case w-full transition-all duration-300 hover:shadow-lg hover:shadow-[#e30045]/20"
                    onClick={() => {
                      openRegisterModal()
                      setOpen(false)
                    }}
                  >
                    Create Account
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </MTNavbar>
  )
}

export default Navbar
