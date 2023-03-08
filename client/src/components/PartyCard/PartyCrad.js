import React from 'react'

export default function PartyCrad() {
  return (
    <div>
        <div className="relative card w-full md:w-96 bg-base-100 shadow-xl flex flex-col">
  <figure className="px-4 md:px-10 pt-8 md:pt-10">
    <img src="https://source.unsplash.com/random/300x200/?naked" alt="Party" className="rounded-xl object-cover w-full h-full" />
  </figure>
  <div className="card-body flex flex-col justify-center items-center py-4 md:py-6">
    <h2 className="card-title text-lg md:text-2xl font-bold mb-2 md:mb-4">Party Info</h2>
    <p className="text-gray-500 mb-2 md:mb-4">Date: March 15, 2023</p>
    <p className="text-gray-500 mb-2 md:mb-4">Time: 7:00 PM - 11:00 PM</p>
    <p className="text-gray-500 mb-2 md:mb-4">Location: 123 Main St, Anytown, USA</p>
  </div>
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-medium mb-2">Do you want to accept or deny?</h3>
      <div className="flex justify-between">
        <button className="w-24 md:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out">Accept</button>
        <button className="w-24 md:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out">Deny</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
