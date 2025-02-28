"use client"

import React from 'react'
import { Typography, Button, Input } from '@material-tailwind/react'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
import { toast, Toaster } from 'react-hot-toast'

const Footer = () => {
  const [email, setEmail] = React.useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    // Here you would typically handle the newsletter subscription
    toast.success('Thank you for subscribing!')
    setEmail('')
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-black border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 justify-between gap-12 md:grid-cols-2 lg:grid-cols-4 pt-12 pb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Typography variant="h6" color="white" className="mb-4">
              GMX Tickets
            </Typography>
            <Typography className="text-gray-400">
              Your trusted platform for discovering and booking the best events in Ghana.
              Experience seamless ticket purchasing and unforgettable moments.
            </Typography>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <FiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <FiFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Typography variant="h6" color="white" className="mb-4">
              Quick Links
            </Typography>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/my-tickets" className="text-gray-400 hover:text-white transition-colors">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <Typography variant="h6" color="white" className="mb-4">
              Categories
            </Typography>
            <ul className="space-y-2">
              <li>
                <Link href="/events?category=musical-concert" className="text-gray-400 hover:text-white transition-colors">
                  Musical Concert
                </Link>
              </li>
              <li>
                <Link href="/events?category=sports" className="text-gray-400 hover:text-white transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/events?category=arts" className="text-gray-400 hover:text-white transition-colors">
                  Arts & Theatre
                </Link>
              </li>
              <li>
                <Link href="/events?category=food" className="text-gray-400 hover:text-white transition-colors">
                  Food & Drinks
                </Link>
              </li>
              <li>
                <Link href="/events?category=comedy" className="text-gray-400 hover:text-white transition-colors">
                  Comedy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <Typography variant="h6" color="white" className="mb-4">
              Newsletter
            </Typography>
            <Typography className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on new events and exclusive offers.
            </Typography>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="!border-white/20 bg-white/5 text-white placeholder:text-gray-400 focus:!border-white"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4 border-t border-white/10 py-6 md:flex-row md:justify-between">
          <Typography className="text-center text-gray-400 font-normal">
            &copy; {currentYear} GMX Tickets. All rights reserved.
          </Typography>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </footer>
  )
}

export default Footer
