"use client"

import { MaterialProps } from "@/components/constants"
import { Button, Typography } from "@material-tailwind/react"

function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/image/event.jpeg')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography variant="h1" color="white" className="lg:max-w-3xl">
            Discover Events From Your Favourites Artists
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
          >
            Discover local events and more effortlessly. We`ve got you covered.
          </Typography>
          <div className="flex items-center gap-4">
            {/* <Button
              {...MaterialProps} variant="gradient" color="white">
              Popular Events
            </Button> */}
            <a href="/events">
              <Button
                {...MaterialProps} variant="filled" className="bg-red-600 text-white" color="white">
                Discover Events
              </Button>
            </a>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
