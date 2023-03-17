import {useState,useEffect, Suspense} from 'react'
import { publicRequest } from '../../hooks/requestMethods'
import PartyCard from '../../components/PartyCard/PartyCrad'
export default function EventAcceptation() {

    const [eventData, setEventData] = useState({})
    const [invited, setInvited] = useState(true)

    // getting event data from server with event id /eventacceptation/:eventId/:guestId
    useEffect(() => {
        // getting id from url
        const id = window.location.pathname.split("/")[2]

        publicRequest().get(`event/get/${id}`)
            .then((res) => {
                setEventData(res.data)
                console.log(res.data)
                // check if guest is in the guest list or not
                const guestId = window.location.pathname.split("/")[3]
                const guest = res.data.gestList.find((guest) => guest._id === guestId)
                if (!guest) {
                    window.alert("You are not invited to this event")
                    setInvited(false)
                    // close window
                    //refrech page
                    
                   
                }

            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])
    
    // add youser to event acceptation list /event/acceptGest/6406e4eaae62df94bb304a4c/6406e502ae62df94bb304a53
    const handleAccept = () => {
        //  guest id and event id from url
        const guestId = window.location.pathname.split("/")[3]
        const eventId = window.location.pathname.split("/")[2]
        publicRequest().post(`event/acceptGest/${eventId}/${guestId}`)
            .then((res) => {
                // allert to say that guest added
                window.alert("You are going to this event")
                
                window.location.reload()
                
            })
            .catch((err) => {
                window.alert(err.response.data)
            })
     
    }

    //remove youser from event acceptation list deleteGest/6406e4eaae62df94bb304a4c/6406e502ae62df94bb304a53
    const handleDecline = () => {
        //  guest id and event id from url
        const guestId = window.location.pathname.split("/")[3]
        const eventId = window.location.pathname.split("/")[2]
        publicRequest().delete(`event/deleteGest/${eventId}/${guestId}`)
            .then((res) => {
                // allert to say that guest added
                window.alert("You are not going to this event")
                window.location.reload()

                

            })
            .catch((err) => {
                window.alert(err.response.data)
                console.log(err.response.data)
            })

    }



    if (invited) {
        return (
          <div className="bg-blue-200 flex flex-wrap justify-start justify-evenly">
            <Suspense fallback={<div>Loading...</div>}>
              <div className="mb-10">
                {/* adding guest name */}
                <h1 className="text-3xl text-center mb-10">Hello {eventData.gestList?.find((guest) => guest._id === window.location.pathname.split("/")[3])?.name}</h1>
                {/* adding guest accempted or not by cheacking if user is in the acceptedguestlist or not*/}
                <h1 className="text-3xl text-center mb-10">
                    {eventData.acceptedGestList?.find((guest) => guest === window.location.pathname.split("/")[3]) ? "You are going to this event" : "You are not going to this event"}
                </h1>
                <PartyCard params={eventData} />
              </div>
              {/* option to ask user is joining event or not */}
              <div className="flex flex-col items-center justify-center">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-10" onClick={handleAccept}>
                  Accept
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-10" onClick={handleDecline}>
                  Decline
                </button>
              </div>
            </Suspense>
          </div>
        );
    }
}
