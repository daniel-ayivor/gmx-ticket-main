"use client"
import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import SearchBar from '../SearchBar'
// import { DUMMYEVENTS } from '../pages/EventPage/ContentWrapper'
import TicketCard from '../cards/TicketCard'

const TicketPage = () => {
  return (
    <>
      <Navbar _isScrolling={false} />

      <div className='bg-gray-100 mt-10'>
        <SearchBar />
      </div>


      <div className="container mx-auto mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {/* {DUMMYEVENTS?.map((item, key) => <TicketCard {...item as any} key={key} />)} */}
      </div>

      <Footer />
    </>
  )
}

export default TicketPage