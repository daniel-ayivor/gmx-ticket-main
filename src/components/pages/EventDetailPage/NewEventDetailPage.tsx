"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Chip,
  IconButton,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Progress,
} from "@material-tailwind/react";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUser,
  FiShare2,
  FiHeart,
} from "react-icons/fi";
import { MdEventSeat } from "react-icons/md";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { initializeHubtelPayment } from "@/utils/payment";
import { toast } from "react-hot-toast";
import { EventType, OrderType, TicketType } from "@/utils/types/eventTypes";
import { BASE_URL } from "@/utils/api/authApi";
import moment from "moment";
import DOMPurify from "dompurify";
import { useAuth } from "../../../../hooks/useAuth";
interface EventDetailProps {
  id: string;
}

const NewEventDetailPage = ({ id }: EventDetailProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth()
  // Find event data (replace with API call in production

  const [event, setEvent] = useState<EventType>();
  const [eventsTickets, setEventsTickets] = useState<TicketType[]>([]);
  const [order, setOrder] = useState<OrderType>()
  const [loading, setLoading] = useState<boolean>(true);


  console.log(user, "user token")
  const fetchEvent = async () => {
    try {
      const response = await fetch(`${BASE_URL}events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      const data: EventType = await response.json();

      if (response.ok && data?.id) {
        setEvent(data)
      }
    } catch (error) {
      // 
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchEvent()
  }, [])


  const fetchAllEventsTickets = async () => {
    try {
      const response = await fetch(`${BASE_URL}events/${id}/tickets/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      const data: TicketType[] = await response.json();

      if (response.ok && data) {
        setEventsTickets(data)
      }
    } catch (error) {
      // 
    } finally {
      setLoading(false)
    }

  };

  useEffect(() => {
    fetchAllEventsTickets();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const sendOrders = async () => {
    if (!selectedTicket) {
      toast.error("Please select a ticket before creating an order.");
      return;
    }

    try {
      // Define the payload for the order
      const payload = {
        ticket_id: selectedTicket.id,
        quantity: 1,
        status: "pending",
      };

      // Send the POST request to create the order
      const response = await fetch(`${BASE_URL}orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${user?.access_token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      // Parse the response
      const data: OrderType = await response.json();

      // Check if the request was successful
      if (response.ok && data?.ticket_id) {
        setOrder(data);
        toast.success("Order created successfully!");
      } else {
        console.log("Failed to create order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("An error occurred while creating the order.");
    } finally {
      setLoading(false);
    }
  };


  // handle tickets
  const handleBuyTickets = async () => {
   
    if (!user) {
      toast.error("Please log in to proceed with payment.");
      router.push("/login");
      return;
    }
    console.log(selectedTicket, "selected Tickets")

    if (!selectedTicket) {
      // toast.error("Please select a ticket type.");
      return;
    }

    try {
      setIsProcessing(true);

      // Create the order first
      await sendOrders();

      // Proceed to payment
      await initializeHubtelPayment({
        totalAmount: parseFloat(selectedTicket.price),
        description: selectedTicket?.ticket_type?.description,
        eventTitle: event?.title!,
        ticketType: selectedTicket?.ticket_type?.name,
      });

      // Note: No need to handle redirect here as initializeHubtelPayment will handle it
    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast.error("Unable to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  // const handleBuyTickets = async () => {
  //   // if (!selectedTicket) {
  //   //   toast.error('Please select a ticket type')
  //   //   return
  //   // }

  //   try {
  //     setIsProcessing(true);

  //     if (!selectedTicket) {
  //       toast.error("Invalid ticket type");
  //       return;
  //     }



  //     await initializeHubtelPayment({
  //       totalAmount: parseFloat(selectedTicket.price),
  //       description: selectedTicket?.ticket_type?.description,
  //       eventTitle: event?.title!,
  //       ticketType: selectedTicket?.ticket_type?.name,
  //     });

  //     // Note: No need to handle redirect here as initializeHubtelPayment will handle it
  //   } catch (error) {
  //     console.error("Payment initialization failed:", error);
  //     toast.error("Unable to process payment. Please try again.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // if (!event?.id && !loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <Typography variant="h4" className="mb-2">
  //           Event Not Found
  //         </Typography>
  //         <Button onClick={() => router.push("/events")}>Back to Events</Button>
  //       </div>
  //     </div>
  //   );
  // }


  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar _isScrolling={true} />

        {/* Loader */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar _isScrolling={true} />

      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="bg-black/80 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Typography color="white" className="font-semibold truncate">
                {event?.title}
              </Typography>
              {!event?.is_free && <Chip
                value={`GHC ${event?.min_ticket_price}`}
                className="bg-primary text-white"
              />}
            </div>
            <Button
              className={` ${selectedTicket ? "bg-[#e30045]" : "bg-primary"}`}
              onClick={() => {
                // setSelectedTicket();
                // handleBuyTickets();
                // document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                selectedTicket ? `${selectedTicket?.ticket_type?.name} selected` : "Get Ticket"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen bg-black flex items-center">
        <div className="absolute inset-0">
          <Image
            src={"https://ghanamusic.com/wp-content/uploads/2024/09/GXlh_9kXEAARrv8.jpeg"}
            alt={event?.title!}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 pt-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Chip
                  value={event?.category?.name}
                  className="bg-primary capitalize text-white"
                />
                {/* {event?.artists_list && (
                  <Chip
                    value={event.artists_list[0]}
                    className="bg-white/10 text-white backdrop-blur-sm"
                    icon={<FiUser className="h-4 w-4" />}
                  />
                )} */}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                {event?.title}
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <FiCalendar className=" text-white/60 mb-2 text-xl" />
                  <div className="text-white/60 text-sm">Date</div>
                  <div className="text-white font-medium">{moment(event?.start_date).format('LL')}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <FiClock className="text-white/60 mb-2 text-xl" />
                  <div className="text-white/60 text-sm">Time</div>
                  <div className="text-white font-medium">{moment(event?.start_date).format('LT')}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <FiMapPin className="text-white/60 mb-2 text-xl" />
                  <div className="text-white/60 text-sm">Location</div>
                  <div className="text-white font-medium">
                    {event?.venue}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="bg-primary flex-1"
                  onClick={() => {
                    // setSelectedTicket("Regular");
                    // handleBuyTickets();
                  }}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    "Get Tickets"
                  )}
                </Button>
                <IconButton
                  variant="outlined"
                  className={`border-white/20 ${isFavorite ? "text-red-500" : "text-white"
                    }`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <FiHeart className={isFavorite ? "fill-current" : ""} />
                </IconButton>
                <IconButton
                  variant="outlined"
                  className="border-white/20 text-white"
                >
                  <FiShare2 />
                </IconButton>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={
                  "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80"
                }
                alt={event?.title!}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="py-12">
            <Tabs value={activeTab}>
              <TabsHeader className="bg-white/5 backdrop-blur-sm">
                {[
                  { label: "Overview", value: "overview" },
                  { label: "Schedule", value: "schedule" },
                  { label: "Venue", value: "venue" },
                  { label: "Tickets", value: "tickets" },
                ].map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={`${activeTab === value ? "text-primary" : "text-white/70"
                      } transition-colors`}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <div className="mt-12">
                {activeTab === "overview" && (
                  <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                        <div className="text-white/70 leading-relaxed whitespace-pre-line">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(event?.description || ""),
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {event?.highlights_list?.map((item, index) => (
                            <div
                              key={index}
                              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3"
                            >
                              <div className="h-2 w-2 rounded-full bg-[#e30045]" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-2xl capitalize font-bold mb-4">
                          Event Details
                        </h3>
                        <div className="capitalize space-y-4">
                          <div>
                            <div className="text-white/60 mb-1">Category</div>
                            <div className="font-medium">
                              {event?.category?.name}
                            </div>
                          </div>
                          {event?.artists_list &&
                            event?.artists_list?.length > 0 && (
                              <div>
                                <div className="text-white/60 mb-1">
                                  Artist
                                </div>
                                <div className="font-medium">
                                  {event?.artists_list?.map((artist, index) => <a
                                    target="_blank"
                                    className="hover:text-red-500"
                                    key={artist}
                                    href={`https://music.gmxofficial.com/search?q=${artist}`}>
                                    {`${artist}${event?.artists_list?.length - 1 === index ? "" : ", "}`}
                                  </a>)}
                                </div>
                              </div>
                            )}
                          <div>
                            <div className="text-white/60 mb-1">Duration</div>
                            <div className="font-medium lowercase">
                              {moment(event?.duration).format('LTS')}

                            </div>
                          </div>
                          {event?.age_restriction && <div>
                            <div className="text-white/60 mb-1">
                              Age Restriction
                            </div>
                            <div className="font-medium">{event?.age_restriction}</div>
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "schedule" && (
                  <div className="max-w-3xl">
                    <div className="space-y-6">
                      {[
                        {
                          time: "6:00 PM",
                          title: "Doors Open",
                          description: "Early entry and seating",
                        },
                        {
                          time: "7:00 PM",
                          title: "Opening Act",
                          description: "Welcome and opening performances",
                        },
                        {
                          time: "8:30 PM",
                          title: "Main Performance",
                          description: "Headline artist performance",
                        },
                        {
                          time: "10:00 PM",
                          title: "Event Ends",
                          description: "Closing and exit",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 flex gap-6"
                        >
                          <div className="text-red-200 font-medium w-24">
                            {item.time}
                          </div>
                          <div>
                            <div className="font-medium mb-1">{item.title}</div>
                            <div className="text-white/60">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "venue" && (
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">
                        Venue Information
                      </h2>
                      <div className="aspect-video rounded-xl overflow-hidden mb-6">
                        <iframe
                          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9735392120507!2d-0.2197804!3d5.5760516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c7ebaeabe93%3A0x5e0c729d10d4e8d1!2s${event?.venue}!5e0!3m2!1sen!2sgh!4v1630619159673!5m2!1sen!2sgh`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                      <div className="text-xl font-bold mb-2">
                        {event?.venue}
                      </div>
                      <p className="text-white/70">
                        {event?.venue_address}
                        {/* Located in the heart of Accra, this premier venue offers
                        state-of-the-art facilities and easy access to public
                        transportation. */}
                      </p>
                    </div>
                    {event?.facilities_list?.length && <div>
                      <h2 className="text-2xl font-bold mb-6">Facilities</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {event?.facilities_list?.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-4"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>}
                  </div>
                )}

                {activeTab === "tickets" && (
                  <div id="tickets" className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                      {eventsTickets?.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all ${selectedTicket?.id === ticket?.id
                            ? "ring-2 ring-gray-700"
                            : "hover:bg-white/10"
                            }`}
                          onClick={() => {
                            if (selectedTicket === ticket) {
                              return setSelectedTicket(null)
                            }
                            setSelectedTicket(ticket);
                          }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-2xl font-bold mb-1">
                                {ticket.ticket_type?.name}
                              </div>
                              <div className="text-3xl font-bold text-red-200">
                                GHC {ticket.price}
                              </div>
                            </div>
                            <MdEventSeat className="text-4xl text-red-200" />
                          </div>
                          <div className="space-y-3">
                            <div>
                              <div className="text-white/60 text-sm mb-1">
                                Available Tickets
                              </div>
                              <Progress
                                value={(ticket?.available_quantity / 200) * 100}
                                className="h-1"
                              />
                              <div className="text-sm mt-1">
                                {ticket?.available_quantity} remaining
                              </div>
                            </div>
                            <div className="border-t border-white/10 pt-3">
                              <div className="text-white/60 text-sm mb-2">
                                What's Included:
                              </div>
                              <div className="space-y-2">
                                {ticket?.whats_included_list?.map((perk, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#e30045]" />
                                    <div className="text-sm">{perk}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Button
                        size="lg"
                        className={`w-full ${selectedTicket ? "bg-[#e30045]" : "bg-primary"}`}
                        disabled={!selectedTicket || isProcessing}
                        onClick={handleBuyTickets}
                      >
                        {isProcessing ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : selectedTicket ? (
                          "Proceed to payment"
                        ) : (
                          "Select a Ticket Type"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};


export default NewEventDetailPage;
