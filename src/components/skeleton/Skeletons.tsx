import React from 'react'

const Skeletons = () => {
  return (
    <div className='w-full  overflow-hidden space-y-2'>
      <span className={`block w-full rounded-xl h-[250px] bg-gradient-to-r from-gray-100 to-gray-200/15 animate-pulse`}></span>
      <div className='flex flex-row items-center justify-between'>
        <span className={`block h-4 rounded-full w-20 bg-gradient-to-r from-gray-100 to-gray-200/15 animate-pulse`}></span>
        <span className={`block h-4 rounded-full w-14 bg-gradient-to-r from-gray-100 to-gray-200/15 animate-pulse`}></span>
      </div>
      <span className={`block h-3 w-72 bg-gradient-to-r from-gray-100 to-gray-200/15 animate-pulse`}></span>
      <span className={`block h-3 w-64 bg-gradient-to-r from-gray-100 to-gray-200/15 animate-pulse`}></span>
    </div>
  )
}

export default Skeletons