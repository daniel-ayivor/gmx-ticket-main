/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/navbar'
import React from 'react'
// import { DUMMYEVENTS } from '../EventPage/ContentWrapper'
import { truncateString } from '@/utils/truncate'
import Footer from '@/components/footer'

export const CartPage = () => {
  // SUM UP THE PRICES
  // const totalPrice = DUMMYEVENTS?.slice(2, 4)?.reduce((acc, curr) => acc + curr?.price, 0)

  return (
    <>
      <Navbar _isScrolling={false} />
      {/* <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

          <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="w-full px-3 min-[400px]:px-6">
              {DUMMYEVENTS?.slice(2, 4)?.map((item) => <div key={item?.title} className="flex flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                <div className="img-box">
                  <img src={item?.image} alt="Premium Watch image"
                    className="aspect-square w-56 h-28 rounded-xl object-cover" />
                </div>
                <div className="flex flex-row items-center w-full ">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                      <div className="">
                        <h2 className="font-semibold text-xl leading-8 text-black mb-1">
                          {truncateString(item?.title, 40)}</h2>
                        <div className="flex items-center ">
                          <p
                            className="font-normal capitalize  text-sm leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                            Date: <span className="text-gray-500">{item?.date}</span></p><p
                              className="font-normal  text-sm leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                            location: <span className="text-gray-500">{item?.location}</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5">
                      <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                        <div className="flex gap-3 lg:block">
                          <p className="capitalize font-medium text-sm leading-7 text-black">price</p>
                          <p className="capitalize lg:mt-4 font-medium text-sm leading-7 text-red-600">GHC {item?.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
            </div>

            <div className="w-full border-t mb-1 border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">

              <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-red-600">GHC {totalPrice}</span></p>

              <div>
              <a href='/checkout' className='w-full'>
                <button
                  className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-primary max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700 hover:shadow-red-400">
                  Proceed to payment</button></a>
              </div>
            </div>

          </div>
        </div>
      </section> */}


      <Footer />

    </>
  )
}
