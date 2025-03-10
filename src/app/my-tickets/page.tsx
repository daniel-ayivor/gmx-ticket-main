'use client'

import React, { useEffect, useState } from 'react'
import { Button, Typography, Chip, Tab, TabsHeader, Tabs } from '@material-tailwind/react'
import { FiCalendar, FiMapPin, FiClock, FiDownload } from 'react-icons/fi'
import { HiOutlineTicket } from 'react-icons/hi'
import { TbTimeDuration30 } from "react-icons/tb";
import { MdEventSeat, MdTimeline } from 'react-icons/md'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { QRCodeSVG } from 'qrcode.react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaCediSign } from "react-icons/fa6";
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import moment from 'moment'
import { TbCircleDashedNumber1 } from "react-icons/tb";
import { API_URL } from '../../../common'


export default function MyTicketsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [myTickets, setMyTickets] = useState<myTicketType[]>([]);
  const { user } = useAuth()


  const handleDownloadTicket = (ticket: any) => {
    console.log('Downloading ticket:', myTickets)
  }


  const fetchMyTicket = async () => {
    try {
      const response = await fetch(`${API_URL.BASE_URL}tickets/user_tickets/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${user?.access_token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const data: myTicketType[] = await response.json();

      if (data) {
        setMyTickets(data);
      }
    } catch (error) {
      console.log('Error fetching tickets:', error);
      toast.error('Failed to fetch tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if an event is upcoming
  const isUpcomingEvent = (startDate: string) => {
    const eventDate = moment(startDate);
    const currentDate = moment();
    return eventDate.isAfter(currentDate);
  };

  // Helper function to check if an event is past
  const isPastEvent = (startDate: string) => {
    const eventDate = moment(startDate);
    const currentDate = moment();
    return eventDate.isBefore(currentDate);
  };

  const filteredTickets = myTickets.filter((ticket) => {
    if (activeTab === "upcoming") {
      return isUpcomingEvent(ticket.event.start_date);
    } else {
      return isPastEvent(ticket.event.start_date);
    }
  });


  return (
    <div className="min-h-screen bg-black">
      <Navbar _isScrolling={true} />

      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[40vh] bg-black flex items-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50 z-10" />
            <img
              src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2667&q=80"
              alt="hero"
              className="w-full h-full object-cover opacity-40"
            />
          </div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl">
              <Typography variant="h2" className="text-white font-bold mb-4">
                My Tickets
              </Typography>
              <Typography className="text-gray-400 text-lg">
                Manage your event tickets and access your QR codes
              </Typography>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-40">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab}>
              <TabsHeader className="bg-white/5 border-b border-white/10">
                {[
                  { label: "Upcoming Events", value: "upcoming" },
                  { label: "Past Events", value: "past" },
                ].map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-white" : "text-white/50"}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Tickets List */}

            <div className="lg:col-span-5 space-y-4">
              {filteredTickets?.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all ${selectedTicket === ticket.id ? 'ring-2 ring-primary' : 'hover:bg-white/10'
                    }`}
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80"}
                        alt={""}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Chip
                          value={ticket?.ticket_type}
                          className="bg-[#e30045] text-white"
                        />
                      </div>
                      <h3 className="text-white font-semibold mb-1">
                        {ticket.event.title}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <FiCalendar className="mr-1" />{moment(ticket.event.start_date).format('LLL')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredTickets.filter(ticket =>
                activeTab === "upcoming" ? ticket.event.start_date === "upcoming" : ticket.event.start_date === "past"
              ).length === 0 && (
                  <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl">
                    <HiOutlineTicket className="mx-auto text-5xl text-gray-400 mb-4" />
                    <Typography className="text-white font-medium mb-2">
                      No {activeTab} tickets
                    </Typography>
                    <Typography className="text-gray-400 text-sm mb-6">
                      {activeTab === "upcoming"
                        ? "You don't have any upcoming event tickets"
                        : "You haven't attended any events yet"
                      }
                    </Typography>
                    <Button
                      className="bg-[#e30045]"
                      onClick={() => router.push('/events')}
                    >
                      Browse Events
                    </Button>
                  </div>
                )}
            </div>

            {/* Ticket Details */}
            <div className="lg:col-span-7">
              {selectedTicket ? (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                  {filteredTickets.filter(ticket => ticket.id === selectedTicket).map((ticket) => (
                    <div key={ticket.id}>
                      <div className="relative h-48">
                        <img
                          src={"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80"}
                          alt={ticket.event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Chip
                              value={ticket.ticket_type}
                              className="bg-[#e30045] text-white"
                            />
                            <Chip
                              value={`GH₵ ${ticket.event.min_ticket_price}`}
                              className="bg-white/10 text-white"
                            />
                          </div>
                          <h2 className="text-2xl font-bold text-white">
                            {ticket.event.title}
                          </h2>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                            <FiCalendar className="text-[#e30045] mb-2 text-xl" />
                            <div className="text-white/60 text-sm">Date</div>
                            <div className="text-white font-medium">{moment(ticket.event.start_date).format('LL')}</div>
                          </div>
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                            <FiClock className="text-[#e30045] mb-2 text-xl" />
                            <div className="text-white/60 text-sm">Time</div>
                            <div className="text-white font-medium">{moment(ticket.event.start_date).format('LTS')}</div>
                          </div>
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                            <FiMapPin className="text-[#e30045] mb-2 text-xl" />
                            <div className="text-white/60 text-sm">Location</div>
                            <div className="text-white font-medium">{ticket.event.venue}</div>
                          </div>
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                            <TbTimeDuration30 className="text-[#e30045] mb-2 text-xl" />
                            <div className="text-white/60 text-sm">Duration</div>
                            <div className="text-white font-medium">{ticket.event.duration}</div>
                          </div>
                        </div>



                        <div className="mb-6">
                          <Typography variant="small" className="text-white/60 mb-2">
                            Event Description
                          </Typography>
                          <Typography className="text-white">
                            {ticket.event.description}
                          </Typography>
                        </div>
                        <h2 className=" text-white/60 mb-2 text-center">Tickets Info</h2>
                        <div className=" grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                            <FaCediSign className="text-[#e30045] mb-2 text-xl" />
                            <div className="text-white/60 text-sm">Price</div>
                            <div className="text-white font-medium">GH₵ {(ticket.price)}</div>
                          </div>
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                            <TbCircleDashedNumber1 className="text-[#e30045] mb-2 text-xl" />
                            <div className="text-white/60 text-sm">Quantity Available</div>
                            <div className="text-white font-medium">{ticket.available_quantity}</div>
                          </div>

                        </div>

                        <div className="border-t border-white/10 pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <Typography variant="small" className="text-white/60">
                              Entry QR Code
                            </Typography>
                            <Button
                              variant="text"
                              className="flex items-center gap-2 text-primary"
                              onClick={() => handleDownloadTicket(ticket)}
                            >
                              <FiDownload className="h-4 w-4" />
                              Download Ticket
                            </Button>
                          </div>
                          <div className="flex items-center gap-6">
                            <QRCodeSVG
                              // value={ticket.reference}
                              value={''}
                              size={120}
                              level="H"
                              className="bg-white p-2 rounded-xl"
                            />
                            <div>
                              <div className="text-white/60 text-sm mb-1">Reference Number</div>
                              {/* <div className="text-white font-medium mb-2">{ticket.reference}</div> */}
                              <div className="text-gray-400 text-sm">
                                Present this QR code at the venue for entry
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl p-8">
                  <div className="text-center">
                    <HiOutlineTicket className="mx-auto text-5xl text-gray-400 mb-4" />
                    <Typography className="text-white font-medium mb-2">
                      Select a Ticket
                    </Typography>
                    <Typography className="text-gray-400 text-sm">
                      Choose a ticket from the list to view details
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 