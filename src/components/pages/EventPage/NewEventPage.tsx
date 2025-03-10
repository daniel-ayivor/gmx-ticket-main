"use client"
import React, { useEffect, useState, useMemo, useCallback } from "react"
import {
  Button,
  IconButton,
  Input,
  Typography,
  Chip,
} from "@material-tailwind/react"
import {
  FiSearch,
  FiMapPin,
  FiCalendar,
  FiFilter,
  FiGrid,
  FiList,
} from "react-icons/fi"
import { IoTicketOutline } from "react-icons/io5"
import { MdOutlineEventNote } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import FilterDrawer from "./FilterDrawer"
import { toast, Toaster } from "react-hot-toast"
import { initializeHubtelPayment } from "@/utils/payment"
import { EventCategory, EventType } from "@/utils/types/eventTypes"
import { useFetchData } from "@/hooks/useData"
import Skeletons from "@/components/skeleton/Skeletons"
import moment from "moment"

export interface Event {
  id: number
  title: string
  date: string
  location: string
  description: string
  price: number
  image: string
  category: string
  artist?: string
  collaborators?: string[]
}

const NewEventPage = () => {
  // Router
  const router = useRouter()
  // UI States
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("viewMode") as "grid" | "list") || "grid"
    }
    return "grid"
  })
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    selectedLocations: [] as string[],
    selectedArtists: [] as string[],
    selectedDates: [] as string[],
    searchQuery: "",
  })

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useFetchData<EventCategory[]>('categories')

  const {
    data: events,
    isLoading: eventsLoading,
  } = useFetchData<EventType[]>('events')

  const {
    data: searchEvents,
    isLoading: searchEventsLoading,
    mutate
  } = useFetchData<EventType[]>(`events/?search=${searchQuery}`)

  const formatedCategories = useMemo(() => {
    let formattedCategories = [{
      id: "all",
      name: "All",
      event_count: events?.length,
    }]

    if (categories) {
      categories.forEach((category) => {
        formattedCategories.push({
          id: category?.id?.toString(),
          name: category?.name,
          event_count: category?.event_count ? parseInt(category?.event_count) : 0,
        })
      })
    }
    return formattedCategories
  }, [categories, events])

  const featuredEvents = useMemo(() => events?.filter((event) =>
    event?.featured &&
    (selectedCategory === "all" || event?.category?.id?.toString() === selectedCategory)
  ), [events, selectedCategory])

  const upcomingEvents = useMemo(() => events?.filter((event) =>
    !event?.featured &&
    (selectedCategory === "all" || event?.category?.id?.toString() === selectedCategory)
  ), [events, selectedCategory])

  const debouncedSearch = useCallback(
    (value: string) => {
      const timer = setTimeout(() => {
        if (value.trim()) {
          mutate()
        }
      }, 500)

      return () => clearTimeout(timer)
    },
    [mutate]
  )

  useEffect(() => {
    const cleanup = debouncedSearch(searchQuery)
    return () => cleanup()
  }, [searchQuery, debouncedSearch])

  // Save view mode preference
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode)
  }, [viewMode])


  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Apply filters
  const handleApplyFilters = () => {

  }

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      selectedLocations: [],
      selectedArtists: [],
      selectedDates: [],
      searchQuery: "",
    })
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      mutate()
    }
  };

  // Navigate to event detail
  const handleEventClick = (eventId: number) => {
    router.push(`/events/${eventId}`)
  }

  const handleGetTickets = async (event: EventType, e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      await initializeHubtelPayment({
        totalAmount: 32,
        description: "Regular admission ticket",
        eventTitle: event.title,
        ticketType: "Regular",
      })
    } catch (error) {
      console.error("Payment initialization failed:", error)
      toast.error("Unable to process payment. Please try again.")
    }
  }

  // Render search results or default content
  const renderContent = () => {
    if (searchEventsLoading) {
      return (
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill({}).map((_, index) => (
              <Skeletons key={index} />
            ))}
          </div>
        </div>
      )
    }

    if (searchQuery.trim()) {
      if (searchEvents && searchEvents.length > 0) {
        return (
          <div className="container mx-auto px-4 py-16">
            <Typography variant="h3" className="font-bold text-white mb-8">
              Search Results ({searchEvents.length})
            </Typography>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchEvents.map((event) => (
                <div
                  key={event.id}
                  className="group cursor-pointer"
                  onClick={() => handleEventClick(event?.id)}
                >
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img
                      // src={event?.image}
                      src={"https://ghanamusic.com/wp-content/uploads/2024/09/GXlh_9kXEAARrv8.jpeg"}
                      alt={event?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex items-center gap-2 mb-3">
                        <Chip
                          value={`${event?.min_ticket_price ? `GHC ${event?.min_ticket_price}` : "Free"}`}
                          className="bg-primary text-white"
                        />
                        <Chip
                          value={moment(event?.start_date).format('MMMM Do YYYY, h:mm:ss a')}
                          className="bg-white/10 text-white backdrop-blur-sm"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {event?.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-300 text-sm">
                          <FiMapPin className="mr-1" /> {event?.venue}
                        </div>
                        <Button
                          variant="outlined"
                          className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
                          onClick={(e) => handleGetTickets(event, e)}
                        >
                          <HiOutlineTicket className="h-4 w-4" />
                          Get Tickets
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      } else {
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <Typography variant="h3" className="font-bold text-white mb-4">
              No events found
            </Typography>
            <Typography className="text-gray-400">
              Try adjusting your search terms or browse our featured events below
            </Typography>
          </div>
        )
      }
    }

    return (
      <>
        {/* Featured Events Section */}
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
            </div>

            {eventsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill({}).map((_, index) => (
                  <Skeletons key={index} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredEvents?.map((event) => (
                    <div
                      key={event.id}
                      className="group cursor-pointer"
                      onClick={() => handleEventClick(event?.id)}
                    >
                      <div className="relative h-[400px] rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <img
                          // src={event?.image}
                          src={"https://ghanamusic.com/wp-content/uploads/2024/09/GXlh_9kXEAARrv8.jpeg"}
                          alt={event?.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <div className="flex items-center gap-2 mb-3">
                            <Chip
                              value={`${event?.min_ticket_price ? `GHC ${event?.min_ticket_price}` : "Free"}`}
                              className="bg-primary text-white"
                            />
                            <Chip
                              value={moment(event?.start_date).format('MMMM Do YYYY, h:mm:ss a')}
                              className="bg-white/10 text-white backdrop-blur-sm"
                            />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {event?.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-300 text-sm">
                              <FiMapPin className="mr-1" /> {event?.venue}
                            </div>
                            <Button
                              variant="outlined"
                              className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
                              onClick={(e) => handleGetTickets(event, e)}
                            >
                              <HiOutlineTicket className="h-4 w-4" />
                              Get Tickets
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Typography variant="h3" className="font-bold text-white">
                  Upcoming Events
                </Typography>
                <Typography className="text-gray-400 mt-1">
                  Browse through our upcoming events
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <IconButton
                  variant={viewMode === "grid" ? "filled" : "text"}
                  color="white"
                  className={
                    viewMode === "grid" ? "bg-white/10" : "text-white/70"
                  }
                  onClick={() => setViewMode("grid")}
                >
                  <FiGrid className="h-4 w-4" />
                </IconButton>
                <IconButton
                  variant={viewMode === "list" ? "filled" : "text"}
                  color="white"
                  className={
                    viewMode === "list" ? "bg-white/10" : "text-white/70"
                  }
                  onClick={() => setViewMode("list")}
                >
                  <FiList className="h-4 w-4" />
                </IconButton>
                <IconButton
                  variant="outlined"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <FiFilter className="h-4 w-4" />
                </IconButton>
              </div>
            </div>

            {eventsLoading ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                }
              >
                {Array(6).fill({}).map((_, index) => (
                  <Skeletons key={index} />
                ))}
              </div>
            ) : upcomingEvents?.length! > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                }
              >
                  {upcomingEvents?.map((event) => (
                    <div
                      key={event.id}
                      className={`group cursor-pointer ${viewMode === "list"
                        ? "flex gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10 transition-all"
                        : ""
                        }`}
                      onClick={() => handleEventClick(event.id)}
                    >
                      <div
                        className={`relative ${viewMode === "list" ? "w-48 h-48" : "h-[300px]"
                          } rounded-xl overflow-hidden`}
                      >
                        <img
                          // src={event.image}
                          src={"https://ghanamusic.com/wp-content/uploads/2024/09/GXlh_9kXEAARrv8.jpeg"}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Chip
                            value={`${event?.min_ticket_price ? `GHC ${event?.min_ticket_price}` : "Free"}`}
                            className="bg-primary text-white"
                          />
                        </div>
                      </div>
                      <div className={viewMode === "list" ? "flex-1" : "mt-4"}>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {event?.title}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                          <div className="flex items-center">
                            <FiCalendar className="mr-1" /> {moment(event?.start_date).format('MMMM Do YYYY, h:mm:ss a')}
                          </div>
                          <div className="flex items-center">
                            <FiMapPin className="mr-1" /> {event?.venue}
                          </div>
                        </div>
                        {viewMode === "list" && (
                          <p className="text-gray-400 mb-4">{event.description}</p>
                        )}
                        <Button
                          variant="outlined"
                          className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
                          onClick={(e) => handleGetTickets(event, e)}
                        >
                          <HiOutlineTicket className="h-4 w-4" />
                          Get Tickets
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
            ) : null}
          </div>
        </section>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar _isScrolling={true} />

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-black flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/20 z-10" />
          <img
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2667&q=80"
            alt="hero"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing Events in Ghana
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Find and book tickets for the best events happening near you
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-2 shadow-xl">
                <div className="grid md:grid-cols-3 gap-2">
                  <div className="md:col-span-2 relative">
                    <Input
                      type="text"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="!border-none bg-transparent text-white ring-0 focus:!border-none"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      icon={<FiSearch className="h-4 w-4 text-gray-400" />}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Location"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="!border-none bg-transparent text-white ring-0 focus:!border-none"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      icon={<FiMapPin className="h-4 w-4 text-gray-400" />}
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xl"
              >
                {searchEventsLoading ? "Searching..." : "Search Events"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="sticky top-0 bg-black/50 backdrop-blur-lg border-b border-white/10 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
            {categoriesLoading ?
              Array(6).fill({}).map((_, index) => (
                <div key={index} className="w-24 h-8 bg-white/5 rounded-full animate-pulse"></div>
              ))
              : formatedCategories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category?.id?.toString())}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full transition-all ${selectedCategory === category?.id?.toString()
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                >
                  {category?.name}
                  {category?.event_count && (
                    <span
                      className={`text-sm ${selectedCategory === category?.id?.toString()
                        ? "text-white/70"
                        : "text-white/40"
                        }`}
                    >
                      ({category?.event_count})
                    </span>
                  )}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-black">
        {renderContent()}
      </div>

      <FilterDrawer
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      <Toaster position="top-center" />

      <Footer />
    </div >
  )
}


export default NewEventPage
