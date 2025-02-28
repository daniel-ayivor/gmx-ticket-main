import React from 'react'
import { DATEFIlTTER, LOCATIONS } from './Filter'



const SearchBar = () => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="p-4 flex md:flex-nowrap flex-wrap gap-4 md:items-center justify-between bg-white rounded-2xl">
          <div className="w-full flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="#111827" stroke-width="1.6" stroke-linecap="round"></path>
            </svg>
            <input type="text" className="focus:outline-none placeholder-gray-400 w-full text-gray-900 text-base font-normal leading-5" placeholder="Search ..." />
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative flex items-center w-[116px] h-8 cursor-pointer">
              <select id="Offer" className="text-gray-900 py-1.5 pr-1.5 pl-3 cursor-pointer text-xs font-medium leading-5 block w-full rounded-md shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border capitalize border-gray-300 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:bg-gray-50 focus-within:border-gray-300">
                <option selected={undefined}>Sort by date</option>
                {DATEFIlTTER?.map((item) => (
                  <option value={item} label={item} key={item}>Label 1</option>
                ))}
              </select>
              <svg className="absolute top-1/2 -translate-y-1/2 right-1.5 z-50 ml-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>

            <div className="relative flex items-center w-[140px] h-8 cursor-pointer">
              <svg className="absolute top-1/2 -translate-y-1/2 left-2 z-50 mr-1.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4.6665H14M4 7.99984H12M6.66667 11.3332H9.33333" stroke="#111827" stroke-width="1.6" stroke-linecap="round"></path>
              </svg>
              <select id="Offer" className="text-gray-900 py-1.5 cursor-pointer text-xs font-medium leading-5 block w-full pr-1.5 pl-7 rounded-md shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-300 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:bg-gray-50 focus-within:border-gray-300">
                <option selected={undefined}>Location</option>
                {LOCATIONS?.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
                
              </select>
              <svg className="absolute top-1/2 -translate-y-1/2 right-4 z-50 hidden" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default SearchBar