import React from 'react'
// import { DUMMYEVENTS } from './pages/EventPage/ContentWrapper'
import EventListingCard from './cards/TicketCard'
import { HiOutlineTicket } from 'react-icons/hi'

const TicketList = () => {
  return (
    <div className='pb-5 px-4 mt-30'>
      <div className="container flex flex-col mx-auto">
        <h1 className='pt-20 flex flex-row items-center gap-x-3 text-3xl mb-4 font-bold capitalize text-black'>
          <HiOutlineTicket className='text-primary' />
          <span>
            My Ticket
          </span>
        </h1>

        {/* {DUMMYEVENTS?.slice(0, 3)?.map((event, key) => <EventListingCard index={key} item={event} key={key} />)} */}
      </div>
    </div>
  )
}

export default TicketList