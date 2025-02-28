import React from 'react'

const TicketCard = ({ item, index, bgColor }: { item: any, index: number, bgColor?: string }) => {
  return (
    <a href={`/my-tickets/${item?.id}`}>
      <div
        style={{
          background: 'url("./frame1.jpg")',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
          objectFit: "cover",
          // backgroundAttachment: 'fixed',
          backgroundPosition: 'center'
        }}
        className='my-2 h-40 relative object-contain overflow-hidden hover:cursor-pointer'>
        <div className={`${bgColor ? bgColor : index % 2 === 0 ? "bg-black/30" : "bg-primary/30"} absolute inset-0`}></div>
        <div className='relative p-3'>
          <div className=''>
            <h1 className='text-sm leading-6 tracking-wider font-medium text-gray-400'>
              GMT32L{index}
            </h1>
            <p className='text-xl font-extrabold text-white mt-2'>
              {item?.title}
            </p>
          </div>

        </div>
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
    </a>
  )
}

export default TicketCard