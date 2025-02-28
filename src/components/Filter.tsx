import React, { useState } from "react"
import CustomSelectInput from "./CustomSelectInput"
import { OptionType } from "@/utils/types/global"

export const DATEFIlTTER = [
  "This month",
  "Next month",
  "This quater",
  "This year"
]

export const LOCATIONS = [
  "Greater Accra (10)",
  "Tema (8)",
  "Kumasi (6)",
  "Cape Coast (4)",
  "Takoradi (3)"
]



type PropType = {
  selectedArtist?: OptionType | null
  handeleArtistChange?: (value: OptionType) => void
}

const Filter = ({ selectedArtist, handeleArtistChange }: PropType) => {
  return (
    <section className="relative h-full">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">

        <div className="">
          <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
            <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">

              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black w-full">Keyword</label>
              <div className="relative w-full mb-4">
                <div className="relative w-full">
                  <input id=""
                    placeholder="Search event..."
                    className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-md block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white" />
                </div>
              </div>
              <button
                className="w-full py-2.5 flex items-center justify-center gap-2 rounded-md bg-primary text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:bg-primary hover:shadow-bg-red-200  ">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
                    stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Search
              </button>
            </div>

            <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                <p className="font-medium text-base leading-7 text-black ">Filters</p>
                <a href="/events">
                  <p
                    className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-red-600">
                    RESET
                  </p>
                </a>
              </div>


              <div className="w-full mb-7">
                <div className='accordion-group grid grid-cols-1 gap-5 sm:gap-9'
                  data-accordion="default-accordion">
                  <div className='accordion '
                    id='artists'>
                    <button
                      className='accordion-toggle group accordion-active:text-red-600 inline-flex items-center justify-between leading-8 text-gray-600 w-full transition duration-500 hover:text-red-600 active:text-red-600'
                      aria-controls='category-collapse-one mb-2'>
                      <h5 className="font-medium text-sm text-gray-900">
                        Artists
                      </h5>
                    </button>

                    <div className="mt-2">
                      <CustomSelectInput value={selectedArtist!} onChange={handeleArtistChange!} />
                    </div>
                  </div>
                </div>
              </div>


              <div className="w-full mb-7">
                <div className='accordion-group grid grid-cols-1 gap-5 sm:gap-9'
                  data-accordion="default-accordion">
                  <div className='accordion '
                    id='category-heading-one'>
                    <button
                      className='accordion-toggle group accordion-active:text-red-600 inline-flex items-center justify-between leading-8 text-gray-600 w-full transition duration-500 hover:text-red-600 active:text-red-600'
                      aria-controls='category-collapse-one mb-2'>
                      <h5 className="font-medium text-sm text-gray-900">
                        Category
                      </h5>

                    </button>
                    <select id="Offer"
                      className="h-12 mt-2 border border-gray-300 text-gray-900 text-xs font-medium rounded-md block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white">
                      <option selected>Business</option>
                      <option value="Musical Concert">Musical Concert</option>
                      <option value="Developer">Drama</option>
                      <option value="Developer">Cinema</option>
                      <option value="Developer">Others</option>
                    </select>
                  </div>
                </div>
              </div>

              <label htmlFor="Offer" className="font-medium text-sm leading-6 text-black mb-3">Location of upcoming events</label>
              <div className="mt-2 box flex flex-col gap-2">
                {LOCATIONS?.map((date, index) => (
                  <div key={index} className="flex items-center">
                    <input id={date} type="checkbox" value="" className="capitalize w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-red-500 hover:bg-red-100 checked:bg-no-repeat checked:bg-center checked:border-red-500 checked:bg-red-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                    <label htmlFor={date} className="capitalize text-sm font-normal text-gray-600 leading-4 cursor-pointer">{date}</label>
                  </div>
                ))}
                <svg className="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16" height="16"
                  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827"
                    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <p className="font-medium text-sm leading-6 text-black mb-3 mt-6">Date</p>
              <div className="box flex flex-col gap-2">
                {DATEFIlTTER?.map((date, index) => (
                  <div key={index} className="flex items-center">
                    <input id={date} type="checkbox" value="" className="capitalize w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-red-500 hover:bg-red-100 checked:bg-no-repeat checked:bg-center checked:border-red-500 checked:bg-red-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                    <label htmlFor={date} className="capitalize text-sm font-normal text-gray-600 leading-4 cursor-pointer">{date}</label>
                  </div>
                ))}


              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9"></div>
        </div>

      </div>
    </section>

  )
}

export default Filter
