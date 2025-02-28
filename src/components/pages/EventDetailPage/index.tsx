/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
// import { DUMMYEVENTS } from '../EventPage/ContentWrapper'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { CiCalendarDate, CiLocationOn } from "react-icons/ci"
import { VscOrganization } from "react-icons/vsc"
import { DUMMYEVENTS, Event } from '../EventPage/NewEventPage'



const EventDetailPage = ({ id }: { id: string }) => {

  // const eventData = DUMMYEVENTS.find((event) => event?.id === parseInt(id))


  return (
    <>
      <Navbar _isScrolling={true} />


      {/* <section className="relative mt-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
            <div className="img lg:h-full md:h-full h-80 w-full">
              <div className="img-box lg:h-full md:h-full w-full h-full max-lg:mx-auto ">
                <img src={eventData?.image} alt={eventData?.title}
                  className="max-lg:mx-auto w-full lg:ml-auto h-full object-cover" />
              </div>
            </div>
            <div
              className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="data w-full max-w-xl">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{eventData?.title}</h2>


                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6
                    className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    GHC {eventData?.price}
                  </h6>

                </div>
                <p className="text-gray-500 text-base font-normal mb-5">
                  {eventData?.description}
                </p>

                <div
                  className="my-10 bg-gray-100 p-4 rounded-md">

                  <div className="w-full ">
                   
                    <div
                      className="flex flex-col flex-1 gap-10 lg:gap-0 lg:flex-row lg:justify-between"
                    >
                      <div className="flex flex-row  justify-center">
                        <CiCalendarDate className='text-4xl text-indigo-600' />
                        <div className='w-full'>
                          <div
                            className="font-manrope font-bold text-xl text-indigo-600 mb-2 text-center lg:text-left"
                          >
                            {eventData?.date}
                          </div>
                          <span className="text-gray-900 text-center block lg:text-left"
                          >Date
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-center">
                        <CiLocationOn className='text-4xl text-indigo-600' />
                        <div className='w-full'>
                          <div
                            className="font-manrope font-bold text-xl text-indigo-600 mb-2 text-center lg:text-left"
                          >
                            {eventData?.location}
                          </div>
                          <span className="text-gray-900 text-center block lg:text-left"
                          >Venue
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-center">
                        <VscOrganization className='text-4xl text-indigo-600' />
                        <div className='w-full'>
                          <div
                            className="font-manrope font-bold text-xl text-indigo-600 mb-2 text-center lg:text-left"
                          >
                            GMX Streams
                          </div>
                          <span className="text-gray-900 text-center block lg:text-left"
                          >Organizer
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex items-center gap-3">

                  <a href='/checkout' className='w-full'>
                    <button
                      className="text-center px-5 py-2 rounded-md bg-primary flex items-center justify-center font-normal w-full text-lg text-white shadow-sm transition-all duration-500 hover:bg-red-700 hover:shadow-red-400">
                      Buy Now
                    </button>
                  </a>
                  
                  <a href='/cart' className='w-full'>
                    <button
                      className="text-center px-5 py-2 rounded-md bg-black flex items-center justify-center font-normal w-full text-lg text-white shadow-sm transition-all duration-500 hover:bg-black hover:shadow-black-400">
                      Add to Cart
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

       

      </section> */}

      <Footer />
    </>



  )
}

export default EventDetailPage
