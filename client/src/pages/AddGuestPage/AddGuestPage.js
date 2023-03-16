import React, { Suspense,useState,useEffect } from 'react'
import PartyCard from '../../components/PartyCard/PartyCrad'
import { publicRequest } from '../../hooks/requestMethods'



export default function AddGuestPage() {

  const [eventData,setEventData] = useState({})
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  const [guestInfo, setGuestInfo] = useState({name:"",phone:"",email:""})
  // geting evnt data with event id from server
  useEffect(() => {
    // getting id from url 
    const id = window.location.pathname.split("/")[2]

    publicRequest().get(`event/get/${id}`)
        .then((res) => {
            setEventData(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err.response.data)
        })
}, [])




// on change input for guest info
const handleChange = (e) => {
  setGuestInfo({...guestInfo,[e.target.name]:e.target.value})
}

// submiting guest info to server event/addGest/6406e4eaae62df94bb304a4c
const handleSubmit = (e) => {
  e.preventDefault()
  publicRequest().post(`event/addGest/${eventData._id}`,guestInfo)
  .then((res) => {
      // allert to say that guest added 
      window.alert("Guest Added")
      //gtting last guest  from gest list
      const lastGuest = res.data.gestList[res.data.gestList.length - 1]
      console.log(lastGuest)
      console.log(window.location.origin + "/eventacceptation/" + eventData._id + "/" + lastGuest)
  })
  .catch((err) => {
      console.log(err.response.data)
  })
}

  




const guests = ["Guest 1", "Guest 2", "Guest 3"];

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 " >
      <div className="m-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <PartyCard params={eventData} />
        </Suspense>
      </div>
      <div className="max-w-md w-full px-4 mt-8">
        <h2 className="text-lg font-medium mb-4">Invite New Guest</h2>
        <form className="bg-white rounded-lg shadow-md px-6 py-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-400 rounded-lg px-4 py-2 w-full"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="border border-gray-400 rounded-lg px-4 py-2 w-full"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-400 rounded-lg px-4 py-2 w-full"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}
              onSubmit={handleSubmit}
            >
              Invite
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-md w-full px-4">
        <h2 className="text-lg font-medium my-8">Invited Guests</h2>
        <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {eventData?.gestList?.map((guest, index) => {
            const getGuestClass = () => {
              
              if (eventData.acceptedGestList.includes(guest._id)) {
                return "bg-green-200";
              
              } else {
                return "text-gray-900";
              }
            };

            return (
              <li key={index} className={`px-6 py-4 ${getGuestClass()}`}>
                <p className="text-gray-900">{guest.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>



  

  )
}
