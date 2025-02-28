"use client"
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import TicketList from '@/components/TicketList'
import React from 'react'

const MyticketPage = () => {
  return (
    <>
      <Navbar />
      
      <TicketList />

      
      <Footer />
    </>
  )
}

export default MyticketPage