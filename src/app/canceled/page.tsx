'use client'

import React, { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { Button, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { toast, Toaster } from 'react-hot-toast'

export default function CanceledPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear any pending payment data
    localStorage.removeItem('currentPayment')
    // Show cancellation message
    toast.error('Payment was canceled')
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Navbar _isScrolling={true} />
      
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiX className="w-10 h-10 text-red-500" />
            </div>
            
            <Typography variant="h3" className="text-white mb-2">
              Payment Canceled
            </Typography>
            <Typography className="text-gray-400 mb-8">
              Your payment was not completed. No charges were made to your account.
            </Typography>

            <div className="space-y-4 text-left mb-8">
              <div className="bg-red-500/10 rounded-xl p-4">
                <Typography className="text-red-500">
                  If you experienced any issues during the payment process, please try again or contact support for assistance.
                </Typography>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1 bg-primary"
                onClick={() => router.back()}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                className="flex-1 border-white/20 text-white"
                onClick={() => router.push('/events')}
              >
                Browse Events
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Toaster position="top-center" />
    </div>
  )
} 