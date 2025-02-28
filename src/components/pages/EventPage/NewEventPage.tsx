"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  IconButton,
  Input,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  FiSearch,
  FiMapPin,
  FiCalendar,
  FiFilter,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import FilterDrawer from "./FilterDrawer";
import { toast, Toaster } from "react-hot-toast";
import { initializeHubtelPayment } from "@/utils/payment";

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  price: number;
  image: string;
  category: string;
  artist?: string;
  collaborators?: string[];
}

const NewEventPage = () => {
  // Router
  const router = useRouter();

  // UI States
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("viewMode") as "grid" | "list") || "grid";
    }
    return "grid";
  });
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    selectedLocations: [] as string[],
    selectedArtists: [] as string[],
    selectedDates: [] as string[],
    searchQuery: "",
  });

  // Save view mode preference
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const categories = [
    { id: "all", name: "All Events" },
    {
      id: "musical concert",
      name: "Musical Concert",
      count: countEventsByCategory("musical concert"),
    },
    { id: "sports", name: "Sports", count: countEventsByCategory("sports") },
    {
      id: "arts",
      name: "Arts & Theatre",
      count: countEventsByCategory("arts"),
    },
    { id: "food", name: "Food & Drinks", count: countEventsByCategory("food") },
    { id: "comedy", name: "Comedy", count: countEventsByCategory("comedy") },
  ];

  // Helper function to count events by category
  function countEventsByCategory(category: string): number {
    return DUMMYEVENTS.filter((event) => event.category === category).length;
  }

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    setIsLoading(true);
    // Apply all filters at once
    setIsFilterDrawerOpen(false);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      selectedLocations: [],
      selectedArtists: [],
      selectedDates: [],
      searchQuery: "",
    });
  };

  // Filter events based on all criteria
  const filteredEvents = useMemo(() => {
    setIsLoading(true);

    let filtered = [...DUMMYEVENTS];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
      );
    }

    // Location filter
    if (filters.selectedLocations.length > 0) {
      filtered = filtered.filter((event) =>
        filters.selectedLocations.includes(event.location)
      );
    }

    // Artist filter
    if (filters.selectedArtists.length > 0) {
      filtered = filtered.filter(
        (event) =>
          event.artist && filters.selectedArtists.includes(event.artist)
      );
    }

    // Date filter (simplified for demo)
    if (filters.selectedDates.length > 0) {
      // Add date filtering logic based on your requirements
    }

    // Price range filter
    filtered = filtered.filter(
      (event) =>
        event.price >= filters.priceRange[0] &&
        event.price <= filters.priceRange[1]
    );

    setTimeout(() => setIsLoading(false), 500);
    return filtered;
  }, [selectedCategory, searchQuery, filters]);

  // Split events into featured and upcoming
  const featuredEvents = filteredEvents.slice(0, 3);
  const upcomingEvents = filteredEvents.slice(3);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500);
  };

  // Navigate to event detail
  const handleEventClick = (eventId: number) => {
    router.push(`/events/${eventId}`);
  };

  const handleGetTickets = async (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await initializeHubtelPayment({
        totalAmount: event.price,
        description: "Regular admission ticket",
        eventTitle: event.title,
        ticketType: "Regular",
      });
    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast.error("Unable to process payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar _isScrolling={true} />

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-black flex items-center">
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
                      className="!border-none bg-transparent text-white ring-0 placeholder:text-gray-400 focus:!border-none"
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
                      className="!border-none bg-transparent text-white ring-0 placeholder:text-gray-400 focus:!border-none"
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
                Search Events
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {category.name}
                {category.count && (
                  <span
                    className={`text-sm ${
                      selectedCategory === category.id
                        ? "text-white/70"
                        : "text-white/40"
                    }`}
                  >
                    ({category.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <section className="py-16 bg-black">
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

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-[400px] rounded-2xl bg-white/5"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group cursor-pointer"
                  onClick={() => handleEventClick(event.id)}
                >
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex items-center gap-2 mb-3">
                        <Chip
                          value={`GHC ${event.price}`}
                          className="bg-primary text-white"
                        />
                        <Chip
                          value={event.date}
                          className="bg-white/10 text-white backdrop-blur-sm"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-300 text-sm">
                          <FiMapPin className="mr-1" /> {event.location}
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
      <section className="py-16 bg-black">
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

          {isLoading ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`animate-pulse ${
                    viewMode === "list"
                      ? "flex gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-4"
                      : ""
                  }`}
                >
                  <div
                    className={`bg-white/5 rounded-xl ${
                      viewMode === "list" ? "w-48 h-48" : "h-[300px]"
                    }`}
                  ></div>
                  <div
                    className={
                      viewMode === "list"
                        ? "flex-1 space-y-4"
                        : "mt-4 space-y-4"
                    }
                  >
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className={`group cursor-pointer ${
                    viewMode === "list"
                      ? "flex gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10 transition-all"
                      : ""
                  }`}
                  onClick={() => handleEventClick(event.id)}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-48 h-48" : "h-[300px]"
                    } rounded-xl overflow-hidden`}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Chip
                        value={`GHC ${event.price}`}
                        className="bg-primary text-white"
                      />
                    </div>
                  </div>
                  <div className={viewMode === "list" ? "flex-1" : "mt-4"}>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" /> {event.date}
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="mr-1" /> {event.location}
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
          ) : (
            <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl">
              <MdOutlineEventNote className="mx-auto text-7xl text-gray-400 mb-4" />
              <Typography
                variant="h5"
                className="font-semibold text-white mb-2"
              >
                No Events Found
              </Typography>
              <Typography className="text-gray-400">
                Try adjusting your filters or search criteria
              </Typography>
            </div>
          )}
        </div>
      </section>

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
    </div>
  );
};

export const DUMMYEVENTS: Event[] = [
  {
    id: 1,
    title: "My motherland concert",
    date: "Dec 28, 2024",
    location: "Okese Park in Ejisu, Kumasi",
    image:
      "https://ghanamusic.com/wp-content/uploads/2024/09/GXlh_9kXEAARrv8.jpeg",
    category: "Musical Concert",
    price: 50,
    description:
      "The inaugural edition of the My Motherland Concert was a massive success, drawing an impressive crowd of over 6,000 fans. Attendees were treated to electrifying performances from a stellar lineup of artists, including Fameye, Eno Barony, Fancy Gadam, YPee, and Nkansah Lil Win. Building on the momentum of last year’s event, Amerado aims to make this year’s concert even bigger and better.",
    artist: "Amerado",
  },
  {
    id: 2,
    title: "Kwesi Arthur Unplugged",
    date: "Dec 26, 2024",
    location: "Jamestown Coffee Company, Accra",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Concert",
    price: 30,
    artist: "Kwesi Arthur",
    description:
      "Kwesi Arthur Unplugged 🎤🔥 \n\nIt’s going down this December 26th in Accra! Catch Ghana’s very own superstar, Kwesi Arthur, serving raw vibes and real energy in an exclusive unplugged live band session. 🎶✨. This is your chance to vibe up-close with the man himself in a premium setup. 💎 Limited tickets only—so don’t snooze or you’ll miss out on the most lit experience this holiday szn! 🚀👀",
  },
  {
    id: 3,
    title: "Accra Fashion Week",
    date: "Jan 15, 2024",
    location: "Kempinski Hotel",
    description:
      "Witness the latest trends in African fashion at Accra Fashion Week.",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "arts",
    collaborators: [],
  },
  {
    id: 4,
    title: "Ghana Food Festival",
    date: "Jan 21, 2024",
    location: "Independence Square",
    description:
      "Taste the diverse flavors of Ghanaian cuisine at the Food Festival.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "food",
    collaborators: [],
  },
  {
    id: 5,
    title: "Chale Wote Street Art Festival",
    date: "Feb 1, 2024",
    location: "Jamestown",
    description: "Experience the vibrant street art culture of Accra.",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "arts",
    collaborators: [],
  },
  {
    id: 6,
    title: "Ghana Jazz Festival",
    date: "Feb 14, 2024",
    location: "National Theatre",
    description:
      "Enjoy smooth jazz performances from local and international artists.",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "musical concert",
    artist: "King Promise",
    collaborators: ["Kwabena Kwabena", "Efya", "Bisa Kdei"],
  },
];

export default NewEventPage;
