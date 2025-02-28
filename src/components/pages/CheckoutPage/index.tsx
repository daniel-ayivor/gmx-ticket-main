/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/navbar'
import React, { useState } from 'react'
import Footer from '@/components/footer'


const MOMOOPTIONS = [
  {
    image: "https://images.africanfinancials.com/gh-mtn-logo.png",
    label: "MTN GH"
  },
  {
    image: "https://play-lh.googleusercontent.com/yZFOhTvnlb2Ply82l8bXusA3OAhYopla9750NcqsjqcUNAd4acuohCTAlqHR9_bKrqE",
    label: "AirtelTigo"
  },
  {
    image: "https://pbs.twimg.com/profile_images/1767853504398295040/pbavaZc1_400x400.jpg",
    label: "Telecel"
  }
]

export const CheckoutPage = () => {
  const options = ["momo", "bank"]
  const [menu, setMenu] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState<{ label: string, image: string }>({
    image: "https://images.africanfinancials.com/gh-mtn-logo.png",
    label: "MTN GH"
  })


  const changeText = (e: any) => {
    setMenu(false)
    setSelectedType(e.target.textContent)
  }

  return (
    <>
      <Navbar _isScrolling={true} />

      <div className='mt-3'>
        <div className="flex justify-center items-center">
          <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
            <div className="flex flex-col justify-start items-start w-full space-y-9">
              <p className="text-3xl lg:text-4xl font-semibold leading-7 px-4 lg:leading-9 text-gray-800">Checkout</p>

              {!options?.includes(selectedType) && <div className='w-screen container mx-auto px-4'>
                <button
                  onClick={() => setSelectedType('bank')}
                  className="w-full border border-transparent hover:border-gray-300 bg-primary hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded">
                  <div></div>
                  <div>
                    <p className="text-base leading-4">Pay With Bank</p>
                  </div>
                </button>

                <button

                  onClick={() => setSelectedType('momo')}
                  className="mt-2 w-full border border-transparent hover:border-gray-300 bg-black hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded">
                  <div>

                  </div>
                  <div>
                    <p className="text-base leading-4">Pay with MoMo</p>
                  </div>
                </button>
              </div>}


              {selectedType === "bank" ? <>
                <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">


                  <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                    <div className="">
                      <input className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="Email" />
                    </div>

                    <label className="mt-8 text-base leading-4 text-gray-800">Card details</label>
                    <div className="mt-2 flex-col">
                      <div>
                        <input className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="0000 1234 6549 15151" />
                      </div>
                      <div className="flex-row flex">
                        <input className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="MM/YY" />
                        <input className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="CVC" />
                      </div>
                    </div>

                    <label className="mt-8 text-base leading-4 text-gray-800">Name on card</label>
                    <div className="mt-2 flex-col">
                      <div>
                        <input className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="Name on card" />
                      </div>
                    </div>

                    {/* <label className="mt-8 text-base leading-4 text-gray-800">Country or region</label>
                  <div className="mt-2 flex-col">
                    <div className="relative">
                      <button className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white" type="button">
                        {country}
                      </button>
                      <svg onClick={() => setMenu(!menu)} className={"transform  cursor-pointer absolute top-4 right-4 " + (menu ? "rotate-180" : "")} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 5.75L8 10.25L12.5 5.75" stroke="#27272A" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className={"mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " + (menu ? "block" : "hidden")}>
                        {countries.map((country) => (
                          <div key={country} className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2" onClick={changeText}>
                            {country}
                          </div>
                        ))}
                      </div>
                    </div>
                    <input className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="ZIP" />
                  </div> */}

                    <button className="mt-8 border border-transparent hover:border-gray-300 bg-primary hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                      <div>
                        <p className="text-base leading-4">Pay GHC 652.00</p>
                      </div>
                    </button>
                  </div>
                </div>
              </> : selectedType === "momo" ? <>
                <div className="p-8 bg-gray-100 flex flex-col w-96">




                  <label className="text-base leading-4 text-gray-800">Select Network</label>
                  <div className="mt-2 flex-col">
                    <div className="relative">
                      <button onClick={() => setMenu(!menu)} className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base capitalize leading-4 flex flex-row items-center gap-x-3 placeholder-gray-600 text-gray-600 bg-white" type="button">
                        <img
                          src={selectedNetwork?.image}
                          className='w-6 h-6 object-contain mr-3'
                          alt=''
                        />
                        {selectedNetwork?.label}
                      </button>
                      <svg onClick={() => setMenu(!menu)} className={"transform  cursor-pointer absolute top-4 right-4 " + (menu ? "rotate-180" : "")} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 5.75L8 10.25L12.5 5.75" stroke="#27272A" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className={"mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " + (menu ? "block" : "hidden")}>
                        {MOMOOPTIONS.map((el) => (
                          <div key={el?.label} className="capitalize cursor-pointer hover:bg-gray-800 flex flex-row items-center gap-x-2 hover:text-white px-4 py-2" onClick={() => {
                            setSelectedNetwork(el)
                            setMenu(false)

                          }}>
                            <img
                              src={el?.image}
                              className='w-6 h-6 object-contain mr-3'
                              alt=''
                            />
                            {el?.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <label className="mt-8 text-base leading-4 text-gray-800">Phone number</label>
                  <div className="mt-2 flex-col">
                    <div>
                      <input name="phone" id="phone" className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="tel" placeholder="Phone Number" />
                    </div>
                  </div>

                  <button className="mt-8 border border-transparent hover:border-gray-300 bg-primary hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                    <div>
                      <p className="text-base leading-4">Pay GHC 652.00</p>
                    </div>
                  </button>
                </div></> : null}


            </div>
          </div>
        </div>

        {options?.includes(selectedType) && <div className='-mt-12 flex items-center justify-center'>
          <button onClick={() => setSelectedType("")} className='text-primary text-sm text-center justify-center'>
            Change payment method
          </button>
        </div>}

      </div>
      <Footer />

    </>
  )
}
