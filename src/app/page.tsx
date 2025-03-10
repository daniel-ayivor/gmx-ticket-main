"use client"

import React, { useMemo } from "react"
import { Button, Typography } from "@material-tailwind/react"
import { FiArrowRight } from "react-icons/fi"
import { MdOutlineEventNote } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"
import { EventCategory, EventType } from "@/utils/types/eventTypes"

import Skeletons from "@/components/skeleton/Skeletons"
import EventListingCard from "@/components/cards/EventListingCard"
import { useFetchData } from "../hooks/useData"


// const CATEGORIES = [
//   {
//     name: "Musical Concert",
//     icon: "🎵",
//     count: 45,
//     color: "bg-blue-500/10",
//     textColor: "text-blue-500",
//   },
//   {
//     name: "Sports",
//     icon: "⚽️",
//     count: 28,
//     color: "bg-green-500/10",
//     textColor: "text-green-500",
//   },
//   {
//     name: "Arts",
//     icon: "🎨",
//     count: 32,
//     color: "bg-purple-500/10",
//     textColor: "text-purple-500",
//   },
//   {
//     name: "Food",
//     icon: "🍽️",
//     count: 19,
//     color: "bg-orange-500/10",
//     textColor: "text-orange-500",
//   },
// ]

const STATS = [
  { number: "500+", label: "Events" },
  { number: "100K+", label: "Tickets Sold" },
  { number: "50+", label: "Venues" },
  { number: "1M+", label: "Happy Customers" },
]

export default function HomePage() {
  const router = useRouter()
  const {
    data,
    isLoading,
  } = useFetchData<EventType[]>('events')

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useFetchData<EventCategory[]>('categories')


  const featuredEvents = useMemo(() => data?.filter((event) => event?.featured), [data])


  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2667&q=80"
            alt="hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Discover Amazing Events in Ghana
            </Typography>

            <Typography className="text-xl text-gray-300 mb-8">
              Find and book tickets for the best events happening near you. From
              concerts to sports, we've got you covered.
            </Typography>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary"
                onClick={() => router.push("/events")}
              >
                Explore Events
              </Button>
              <Button
                size="lg"
                variant="outlined"
                className="border-white/20 text-white flex flex-row items-center"
                onClick={() => router.push("/my-tickets")}
              >
                <HiOutlineTicket className="mr-1 h-5 w-5" />
                My Tickets
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Typography variant="h3" className="font-bold text-white">
                Featured Events
              </Typography>
              <Typography className="text-gray-400 mt-1">
                Don't miss out on these amazing events
              </Typography>
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 text-primary"
              onClick={() => router.push("/events")}
            >
              View All <FiArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array(6)
                .fill({})
                .map((_, index) => <Skeletons key={index} />)
              : featuredEvents?.map((event) => <EventListingCard {...event} key={event?.id} />)}
          </div>

        </div>
      </section>

      {/* Categories */}
      {/* <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <Typography variant="h3" className="text-white text-center mb-2">
            Browse by Category
          </Typography>
          <Typography className="text-gray-400 text-center mb-12">
            Find events that match your interests
          </Typography>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories?.map((category) => (
              <div
                key={category?.name}
                className={`rounded-2xl p-6 cursor-pointer transition-transform hover:-translate-y-1`}
                onClick={() => router.push("/events")}
              >
                {category?.icon && <div className="text-4xl mb-4">{category?.icon}</div>}
                <div
                  className={`text-xl font-semibold text-purple-500 mb-2`}
                >
                  {category?.name}
                </div>
                <div className="text-gray-600">{category?.event_count} Events</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#e30045] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black/80 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
            alt="cta"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" className="text-white mb-6">
              Ready to Experience Amazing Events?
            </Typography>
            <Typography className="text-gray-300 mb-8">
              Join thousands of people who use GMX Tickets to discover and book
              their favorite events.
            </Typography>
            <div className="flex flex-row items-center justify-center">
              <Button
                size="lg"
                className="bg-primary flex flex-row items-center"
                onClick={() => router.push("/events")}
              >
                <MdOutlineEventNote className="mr-1 h-5 w-5" />
                Browse Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Toaster position="top-center" />
    </div>
  )
}
