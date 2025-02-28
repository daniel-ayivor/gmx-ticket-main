import React from 'react'
import {
  Drawer,
  Typography,
  IconButton,
  Button,
  Slider,
  Chip,
  Input,
} from '@material-tailwind/react'
import { IoClose } from 'react-icons/io5'
import { FiMapPin, FiCalendar } from 'react-icons/fi'

interface FilterDrawerProps {
  open: boolean
  onClose: () => void
  filters: {
    priceRange: [number, number]
    selectedLocations: string[]
    selectedArtists: string[]
    selectedDates: string[]
    searchQuery: string
  }
  onFilterChange: (key: string, value: any) => void
  onApplyFilters: () => void
  onClearFilters: () => void
}

const locations = [
  "Accra",
  "Kumasi",
  "Tamale",
  "Cape Coast",
  "Takoradi",
  "Tema",
  "East Legon",
  "Spintex",
]

const artists = [
  "Sarkodie",
  "Shatta Wale",
  "Stonebwoy",
  "Black Sherif",
  "R2Bees",
  "King Promise",
  "Gyakie",
  "Kuami Eugene",
]

const dates = [
  "Today",
  "Tomorrow",
  "This Weekend",
  "This Week",
  "This Month",
  "Next Month",
  "Custom Date"
]

const FilterDrawer = ({
  open,
  onClose,
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}: FilterDrawerProps) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      className="p-4"
      placement="right"
      size={400}
    >
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h5" color="blue-gray">
          Filters
        </Typography>
        <div className="flex items-center gap-2">
          <Button 
            variant="text" 
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear All
          </Button>
          <IconButton variant="text" onClick={onClose}>
            <IoClose className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <Typography variant="h6" color="blue-gray" className="mb-4">
          Price Range
        </Typography>
        <div className="px-2">
          <Slider
            defaultValue={[filters.priceRange[0].toString(), filters.priceRange[1].toString()]}
            value={[filters.priceRange[0].toString(), filters.priceRange[1].toString()]}
            onChange={(e: any) => onFilterChange('priceRange', [parseInt(e.target.value[0]), parseInt(e.target.value[1])])}
            min="0"
            max="1000"
            className="text-primary"
          />
          <div className="flex justify-between mt-2">
            <Typography color="white" variant="small">
              GHC {filters.priceRange[0]}
            </Typography>
            <Typography color="white" variant="small">
              GHC {filters.priceRange[1]}
            </Typography>
          </div>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-8">
        <Typography variant="h6" color="blue-gray" className="mb-4">
          Location
        </Typography>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search location..."
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            icon={<FiMapPin className="h-4 w-4" />}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => {
                const newLocations = filters.selectedLocations.includes(location)
                  ? filters.selectedLocations.filter(l => l !== location)
                  : [...filters.selectedLocations, location]
                onFilterChange('selectedLocations', newLocations)
              }}
            >
              <Chip
                value={location}
                variant={filters.selectedLocations.includes(location) ? "filled" : "outlined"}
                className="m-1"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Artist Filter */}
      <div className="mb-8">
        <Typography variant="h6" color="blue-gray" className="mb-4">
          Artists
        </Typography>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search artists..."
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {artists.map((artist) => (
            <button
              key={artist}
              onClick={() => {
                const newArtists = filters.selectedArtists.includes(artist)
                  ? filters.selectedArtists.filter(a => a !== artist)
                  : [...filters.selectedArtists, artist]
                onFilterChange('selectedArtists', newArtists)
              }}
            >
              <Chip
                value={artist}
                variant={filters.selectedArtists.includes(artist) ? "filled" : "outlined"}
                className="m-1"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Date Filter */}
      <div className="mb-8">
        <Typography variant="h6" color="blue-gray" className="mb-4">
          Date
        </Typography>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Select date..."
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            icon={<FiCalendar className="h-4 w-4" />}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => {
                const newDates = filters.selectedDates.includes(date)
                  ? filters.selectedDates.filter(d => d !== date)
                  : [...filters.selectedDates, date]
                onFilterChange('selectedDates', newDates)
              }}
            >
              <Chip
                value={date}
                variant={filters.selectedDates.includes(date) ? "filled" : "outlined"}
                className="m-1"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <Button
          size="lg"
          className="w-full bg-gray-900 text-white shadow-none hover:shadow-none"
          onClick={onApplyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </Drawer>
  )
}

export default FilterDrawer 