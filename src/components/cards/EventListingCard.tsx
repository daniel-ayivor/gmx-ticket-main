/* eslint-disable @next/next/no-img-element */
import { EventType } from '@/utils/types/eventTypes'
import { Button } from '@material-tailwind/react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { HiOutlineTicket } from "react-icons/hi"


const EventListingCard = (event: EventType) => {
  const router = useRouter()
  return (
    <div
      className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
      onClick={() => router.push(`/events/${event.id}`)}
    >
      <div className="relative h-[300px]">
        <Image
          src={"https://ghanamusic.com/wp-content/uploads/2024/09/GXlh_9kXEAARrv8.jpeg"} // Fallback image
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <div className="bg-primary text-white px-3 py-1 rounded-full text-sm">
            {event?.category?.name}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center gap-2 mb-3">
          <div className="bg-white/10 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {event?.artists_list?.[0] || "Artist Name"}
          </div>
          <div className="bg-white/10 capitalize text-green-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {event?.is_free ? "Free" : `from ₵${event.min_ticket_price}`}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">
          {event.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center">
              <FiCalendar className="mr-1" /> {moment(event.start_date).format('MMMM Do YYYY, h:mm:ss a')}
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-1" /> {event.venue}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button
            variant="outlined"
            className="w-full flex items-center justify-center gap-2 border-white/20 text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event card click
              // handleGetTickets(event, e);
            }}
          >
            <HiOutlineTicket className="h-4 w-4" />
            Get Tickets
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventListingCard