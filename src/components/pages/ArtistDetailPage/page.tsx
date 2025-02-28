"use client"

import React, { useEffect, useState } from 'react'
import { Button, Typography, Chip, Tab, TabsHeader, Tabs } from '@material-tailwind/react'
import { FiCalendar, FiMapPin, FiClock, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'

interface ArtistData {
  id: number
  name: string
  image: string
  coverImage?: string
  bio?: string
  genre: number
  socialMedia?: {
    instagram?: string
    twitter?: string
    youtube?: string
  }
  stats?: {
    followers?: string
    monthlyListeners?: string
    totalPlays?: string
  }
  upcomingEvents?: any[]
  pastEvents?: any[]
}

interface Genre {
  id: number
  name: string
}

// Dummy events data
const dummyUpcomingEvents = [
  {
    id: 1,
    title: "Live in Concert 2024",
    date: "Dec 28, 2023",
    time: "8:00 PM",
    location: "National Theatre, Accra",
    price: 50,
    description: "An unforgettable night of music and entertainment",
    ticketsAvailable: 500,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Ghana Meets Naija",
    date: "Jan 20, 2024",
    time: "7:00 PM",
    location: "Accra Sports Stadium",
    price: 30,
    description: "The biggest Afrobeats concert of the year",
    ticketsAvailable: 1000,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "December to Remember",
    date: "Feb 14, 2024",
    time: "9:00 PM",
    location: "Grand Arena, Accra",
    price: 80,
    description: "End the year with an amazing musical experience",
    ticketsAvailable: 800,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
]

const dummyPastEvents = [
  {
    id: 4,
    title: "Valentine's Day Special",
    date: "Dec 14, 2023",
    location: "Labadi Beach Hotel",
    description: "A romantic night of music under the stars",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Independence Day Concert",
    date: "Dec 31, 2023",
    location: "Black Star Square",
    description: "Celebrating Ghana's independence with music",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    title: "Easter Weekend Festival",
    date: "Jan 31, 2024",
    location: "Alliance Française",
    description: "A special Easter celebration with live performances",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
]

interface ArtistDetailProps {
  id: string
}

export default function ArtistDetailPage({ id }: ArtistDetailProps): JSX.Element {
  // const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [artistData, setArtistData] = useState<ArtistData | null>(null)
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const fetchGenres = async () => {
    try {
      const response = await fetch('https://admin.gmxofficial.com/api/genres')
      if (!response.ok) {
        throw new Error('Failed to fetch genres')
      }
      const result = await response.json()
      if (result) {
        setGenres(result)
      }
    } catch (err) {
      console.error('Error fetching genres:', err)
    }
  }

  const getGenreName = (genreId: number) => {
    const genre = genres?.find(g => g?.id === genreId)
    return genre?.name || 'Unknown Genre'
  }

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const response = await fetch(`https://admin.gmxofficial.com/api/artists/${id}`, requestOptions)

      if (response.status === 429) {
        console.error("Rate limit exceeded, retrying after delay...")
        setTimeout(fetchData, 2000)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch artist data')
      }

      const result = await response.json()
      if (result.data) {
        setArtistData({
          id: result.data.id,
          name: result.data.name,
          image: result.data.image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          coverImage: result.data.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
          bio: result.data.bio || "No biography available.",
          genre: result.data.genre || [],
          socialMedia: {
            instagram: result.data.social?.instagram,
            twitter: result.data.social?.twitter,
            youtube: result.data.social?.youtube,
          },
          stats: {
            followers: result.data.stats?.followers || "0",
            monthlyListeners: result.data.stats?.monthly_listeners || "0",
            totalPlays: result.data.stats?.total_plays || "0",
          },
          upcomingEvents: result.data.upcoming_events?.length > 0
            ? result.data.upcoming_events
            : dummyUpcomingEvents,
          pastEvents: result.data.past_events?.length > 0
            ? result.data.past_events
            : dummyPastEvents,
        })
      }
    } catch (err) {
      console.error('Error fetching artist data:', err)
      setError('Failed to load artist data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGenres()
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <Typography className="text-white">Loading artist details...</Typography>
        </div>
      </div>
    )
  }

  if (error || !artistData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h4" className="text-white mb-4">
            {error || 'Artist not found'}
          </Typography>
          <Button
            className="bg-primary"
          // onClick={() => router.push('/events')}
          >
            Browse Events
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar _isScrolling={true} />

      {/* Hero Section */}
      <section className="relative pt-20">
        {/* Cover Image */}
        <div className="relative h-[40vh] md:h-[50vh] lg:block md:block hidden
        ">
          <Image
            src={artistData.coverImage!}
            alt={artistData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
        </div>

        {/* Artist Info */}
        <div className="container mx-auto px-4 mt-24 lg:mt-0 md:mt-24">
          <div className="relative -mt-32 flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border-4 border-black">
              <Image
                src={artistData.image}
                alt={artistData.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Artist Details */}
            <div className="flex-1">
              <Typography variant="h1" className="text-4xl md:text-6xl font-bold text-white mb-4">
                {artistData.name}
              </Typography>
              <div className="flex flex-wrap gap-2 mb-6">
                <Chip
                  key={getGenreName(artistData?.genre!)}
                  value={getGenreName(artistData?.genre!)}
                  className="bg-white/10 text-white backdrop-blur-sm"
                />
              </div>
             
            </div>

            {/* Social Links */}
            {artistData.socialMedia && (
              <div className="flex gap-4">
                {artistData.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${artistData.socialMedia.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <FiInstagram className="w-5 h-5" />
                  </a>
                )}
                {artistData.socialMedia.twitter && (
                  <a
                    href={`https://twitter.com/${artistData.socialMedia.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </a>
                )}
                {artistData.socialMedia.youtube && (
                  <a
                    href={`https://youtube.com/${artistData.socialMedia.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <FiYoutube className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="-mt-7 lg:mt-0 md:mt-0 lg:py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab}>
            <TabsHeader className="bg-white/5 border-b border-white/10">
              {[
                { label: "Overview", value: "overview" },
                { label: "Events", value: "events" },
                // { label: "About", value: "about" },
              ].map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={activeTab === value ? "text-black" : "text-white/50"}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>

            <div className="mt-8">
              {activeTab === "overview" && (
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    {/* <Typography variant="h4" className="text-white mb-4">
                      About {artistData.name}
                    </Typography>
                    <Typography className="text-gray-400 mb-8">
                      {artistData.bio}
                    </Typography> */}

                    {artistData.upcomingEvents && artistData.upcomingEvents.length > 0 && (
                      <>
                        <Typography variant="h5" className="text-white mb-4">
                          Upcoming Shows and Events
                        </Typography>
                        <div className="space-y-4">
                          {artistData.upcomingEvents.map((event) => (
                            <div
                              key={event.id}
                              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                              <Link href={`/events/${event.id}`} className="block">
                                <div className="flex gap-4">
                                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                      src={event.image || artistData.image}
                                      alt={event.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Chip
                                        value={`GHC ${event.price}`}
                                        className="bg-primary text-white"
                                      />
                                    </div>
                                    <h3 className="text-white font-semibold mb-1">
                                      {event.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                                      <div className="flex items-center">
                                        <FiCalendar className="mr-1" /> {event.date}
                                      </div>
                                      <div className="flex items-center">
                                        <FiMapPin className="mr-1" /> {event.location}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                      <Typography variant="h6" className="text-white mb-4">
                        Popular Genres
                      </Typography>
                      <div className="flex flex-wrap gap-2">
                       
                        <Chip
                          key={getGenreName(artistData?.genre!)}
                          value={getGenreName(artistData?.genre!)}
                          className="bg-white/10 text-white"
                          />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "events" && (
                <div>
                  <Typography variant="h4" className="text-white mb-6">
                    All Events
                  </Typography>

                  {artistData.upcomingEvents && artistData.upcomingEvents.length > 0 && (
                    <>
                      <Typography variant="h6" className="text-white mb-4">
                        Upcoming Events
                      </Typography>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {artistData.upcomingEvents.map((event) => (
                          <div
                            key={event.id}
                            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
                          >
                            <Link href={`/events/${event.id}`} className="block">
                              <div className="relative h-48">
                                <Image
                                  src={event.image || artistData.image}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Chip
                                    value={`GHC ${event.price}`}
                                    className="bg-primary text-white"
                                  />
                                </div>
                                <h3 className="text-white font-semibold mb-2">
                                  {event.title}
                                </h3>
                                <div className="flex items-center gap-4 text-gray-400 text-sm">
                                  <div className="flex items-center">
                                    <FiCalendar className="mr-1" /> {event.date}
                                  </div>
                                  <div className="flex items-center">
                                    <FiMapPin className="mr-1" /> {event.location}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {artistData.pastEvents && artistData.pastEvents.length > 0 && (
                    <>
                      <Typography variant="h6" className="text-white mb-4">
                        Past Events
                      </Typography>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artistData.pastEvents.map((event) => (
                          <div
                            key={event.id}
                            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
                          >
                            <Link href={`/events/${event.id}`} className="block">
                              <div className="relative h-48">
                                <Image
                                  src={event.image || artistData.image}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="text-white font-semibold mb-2">
                                  {event.title}
                                </h3>
                                <div className="flex items-center gap-4 text-gray-400 text-sm">
                                  <div className="flex items-center">
                                    <FiCalendar className="mr-1" /> {event.date}
                                  </div>
                                  <div className="flex items-center">
                                    <FiMapPin className="mr-1" /> {event.location}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {(!artistData.upcomingEvents?.length && !artistData.pastEvents?.length) && (
                    <div className="text-center py-12">
                      <Typography className="text-gray-400">
                        No events found for this artist.
                      </Typography>
                    </div>
                  )}
                </div>
              )}

              {/* {activeTab === "about" && (
                <div className="max-w-3xl">
                  <Typography variant="h4" className="text-white mb-6">
                    About {artistData.name}
                  </Typography>
                  <Typography className="text-gray-400 mb-8">
                    {artistData.bio}
                  </Typography>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {artistData.stats && (
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                        <Typography variant="h6" className="text-white mb-4">
                          Stats
                        </Typography>
                        <div className="space-y-4">
                       
                          {artistData?.stats?.followers && (
                            <div>
                              <div className="text-gray-400 mb-1">Followers</div>
                              <div className="text-white font-medium">{artistData?.stats?.followers}</div>
                            </div>
                          )}
                          {artistData?.stats?.monthlyListeners && (
                            <div>
                              <div className="text-gray-400 mb-1">Total Plays</div>
                              <div className="text-white font-medium">{artistData?.stats?.monthlyListeners}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {artistData.socialMedia && (
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                        <Typography variant="h6" className="text-white mb-4">
                          Social Media
                        </Typography>
                        <div className="space-y-4">
                          {artistData.socialMedia.instagram && (
                            <a
                              href={`https://instagram.com/${artistData.socialMedia.instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                            >
                              <FiInstagram className="w-5 h-5" />
                              @{artistData.socialMedia.instagram}
                            </a>
                          )}
                          {artistData.socialMedia.twitter && (
                            <a
                              href={`https://twitter.com/${artistData.socialMedia.twitter}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                            >
                              <FiTwitter className="w-5 h-5" />
                              @{artistData.socialMedia.twitter}
                            </a>
                          )}
                          {artistData.socialMedia.youtube && (
                            <a
                              href={`https://youtube.com/${artistData.socialMedia.youtube}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                            >
                              <FiYoutube className="w-5 h-5" />
                              {artistData.socialMedia.youtube}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )} */}
            </div>
          </Tabs>
        </div>
      </section>

      <Footer />
      <Toaster position="top-center" />
    </div>
  )
}