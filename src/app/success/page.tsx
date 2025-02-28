'use client'

import React, { useEffect, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { Button, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { QRCodeSVG } from 'qrcode.react'
import { toast, Toaster } from 'react-hot-toast'

interface PaymentInfo {
  reference: string
  amount: number
  eventTitle: string
  ticketType: string
  timestamp: string
  checkoutId?: string
  clientReference?: string
}

export default function SuccessPage() {
  const router = useRouter()
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)

  useEffect(() => {
    try {
      // Retrieve payment info from localStorage
      const storedPayment = localStorage.getItem('currentPayment')
      if (storedPayment) {
        const paymentData = JSON.parse(storedPayment)
        setPaymentInfo(paymentData)
        
        // Show success message
        toast.success('Payment completed successfully!')
        
        // Clear the payment info from localStorage
        localStorage.removeItem('currentPayment')

        // Here you would typically make an API call to your backend
        // to verify the payment and create the ticket
        // For now, we'll just simulate it with a console log
        console.log('Payment verified:', paymentData)
      } else {
        toast.error('No payment information found')
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      toast.error('Error processing payment information')
    }
  }, [])

  if (!paymentInfo) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar _isScrolling={true} />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <Typography variant="h4" className="text-white mb-4">
              No payment information found
            </Typography>
            <Typography className="text-gray-400 mb-6">
              We couldn't find any payment information. Please try making your purchase again.
            </Typography>
            <Button onClick={() => router.push('/events')} className="bg-primary">
              Browse Events
            </Button>
          </div>
        </div>
        <Footer />
        <Toaster position="top-center" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar _isScrolling={true} />
      
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-10 h-10 text-primary" />
            </div>
            
            <Typography variant="h3" className="text-white mb-2">
              Payment Successful!
            </Typography>
            <Typography className="text-gray-400 mb-8">
              Your ticket has been confirmed. Please save your QR code for entry.
            </Typography>

            <div className="mb-8">
              <QRCodeSVG
                value={paymentInfo.clientReference || paymentInfo.reference}
                size={200}
                level="H"
                className="mx-auto bg-white p-4 rounded-xl"
              />
              <Typography className="text-gray-400 mt-2 text-sm">
                Present this QR code at the venue for entry
              </Typography>
            </div>

            <div className="space-y-4 text-left mb-8">
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Event</span>
                <span className="text-white font-medium">{paymentInfo.eventTitle}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Ticket Type</span>
                <span className="text-white font-medium">{paymentInfo.ticketType}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Amount</span>
                <span className="text-white font-medium">GHC {paymentInfo.amount}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Reference</span>
                <span className="text-white font-medium">{paymentInfo.clientReference || paymentInfo.reference}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Date</span>
                <span className="text-white font-medium">
                  {new Date(paymentInfo.timestamp).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1 bg-primary"
                onClick={() => router.push('/my-tickets')}
              >
                View My Tickets
              </Button>
              <Button
                variant="outlined"
                className="flex-1 border-white/20 text-white"
                onClick={() => router.push('/events')}
              >
                Browse More Events
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