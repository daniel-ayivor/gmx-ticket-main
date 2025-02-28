'use client'

import React, { useState, useEffect } from "react"
import {
  Navbar as MTNavbar,
  IconButton,
  Typography,
  // Button,
  // Collapse,
  // Menu,
  // MenuHandler,
  // MenuList,
  // MenuItem,
} from "@material-tailwind/react"
import {
  XMarkIcon,
  Bars3Icon,
  // UserCircleIcon,
} from "@heroicons/react/24/solid"
import { MdOutlineEventNote } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi"
import { RiHome2Line } from "react-icons/ri"
import { MaterialProps } from "./constants"
import { usePathname } from 'next/navigation'

interface NavItemProps {
  children: React.ReactNode
  href?: string
  isActive?: boolean
}

function NavItem({ children, href, isActive }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        variant="paragraph"
        className={`flex items-center gap-2 font-medium transition-colors hover:text-[#e30045] ${
          isActive ? 'text-[#e30045]' : ''
        }`}
      >
        {children}
      </Typography>
    </li>
  )
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

export function Navbar({ _isScrolling }: { _isScrolling?: boolean}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(_isScrolling ?? false)

  const handleOpen = () => setOpen((cur) => !cur)

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
          className="text-2xl font-bold text-white"
        >
          GMX <span className="text-[#e30045]">TICKETS</span>
        </Typography>

        {/* Desktop Navigation */}
        <ul className="ml-10 hidden items-center gap-6 lg:flex text-white">
          {NAV_MENU?.map(({ name, icon: Icon, href }) => (
            <NavItem 
              key={name} 
              href={href}
              isActive={pathname === href}
            >
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>
       
        {/* Desktop User Menu */}
        {/* <div className="hidden lg:flex items-center gap-4">
          <Menu placement="bottom-end">
            <MenuHandler>
              <Button
                variant="text"
                className="flex items-center gap-2 text-white normal-case"
              >
                <UserCircleIcon className="h-5 w-5" />
                Sign In
              </Button>
            </MenuHandler>
            <MenuList className="p-2">
              <MenuItem className="flex items-center gap-2 rounded">
                Profile
              </MenuItem>
              <MenuItem className="flex items-center gap-2 rounded">
                Settings
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem className="flex items-center gap-2 rounded text-red-500">
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
          
          <Button
            className="bg-primary normal-case"
            onClick={() => {}}
          >
            Create Account
          </Button>
        </div> */}

        {/* Mobile Menu Button */}
        <IconButton
          variant="text"
          color="white"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      {/* Mobile Menu */}
      {/* <Collapse open={open}>
        <div className="container mx-auto mt-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-5">
          <ul className="flex flex-col gap-4 text-white">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <NavItem 
                key={name} 
                href={href}
                isActive={pathname === href}
              >
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
            <li className="border-t border-white/10 pt-4">
              <Button
                variant="text"
                className="flex items-center gap-2 text-white normal-case w-full justify-start"
                onClick={() => {}}
              >
                <UserCircleIcon className="h-5 w-5" />
                Sign In
              </Button>
            </li>
            <li>
              <Button
                className="bg-primary normal-case w-full"
                onClick={() => {}}
              >
                Create Account
              </Button>
            </li>
          </ul>
        </div>
      </Collapse> */}
    </MTNavbar>
  )
}

export default Navbar
