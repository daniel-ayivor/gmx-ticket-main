/* eslint-disable @next/next/no-img-element */
"use client"
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'
// import { DUMMYEVENTS } from '../EventPage/ContentWrapper'
import TicketCard from '@/components/cards/TicketCard'



const TicketDetailPage = ({ id }: { id: string }) => {
  // const exactData = DUMMYEVENTS?.find((item) => item?.id === parseInt(id))
  return (
    <>
      <Navbar />
      <div className='bg-gray-50 h-full flex items-center justify-center p-4 '>
        <div className='p-4 container mx-auto   max-w-sm '>
          <div className='w-full mt-10'>
            
            {/* <RenderDetailCard item={exactData} /> */}
            <div
              style={{
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
              }}
              className='bg-white -mt-2 w-full p-4 rounded-b-lg'>
              <div className='w-full flex flex-col items-center justify-center'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png'
                  alt=''
                  className='w-full h-60'
                />

                <p className='text-sm font-bold mt-5 text-gray-600'>Scan me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


const RenderDetailCard = ({ item }: { item: any }) => (
  <div
    style={{
      background: 'url("/frame1.jpg")',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
      objectFit: "cover",
      // backgroundAttachment: 'fixed',
      backgroundPosition: 'center'
    }}
    className='my-2 h-44 relative rounded-t-xl overflow-hidden object-contain'>
    <div className={`absolute bg-black/20 inset-0`}></div>

    <a href={`/events/${item?.id}?${item?.title}`}>
      <div className='relative p-3 flex flex-row items-center'>
        <img
          src={item?.image}
          alt='' className='w-16 object-cover rounded-md h-16'></img>
        <div className='flex-1 ml-2'>
          <h1 className='text-[16px] leading-6 tracking-wider font-extrabold text-white'>
            GMT32
          </h1>
          <p className='text-sm text-gray-400 mt-0.5'>
            {item?.title}
          </p>
        </div>

      </div>
    </a>

    <div className='p-3 absolute bottom-1 w-full items-center justify-between'>
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='w-full'>
          <p className='text-sm text-white'>
            Date
          </p>
          <p className='text-sm capitalize text-gray-400'>
            {item?.date}
          </p>
        </div>
        <div className='w-full text-end'>
          <p className='text-sm text-white'>
            Location
          </p>
          <p className='text-sm capitalize text-gray-400'>
            {item?.location}
          </p>
        </div>
      </div>
    </div>

  </div>
)

export default TicketDetailPage