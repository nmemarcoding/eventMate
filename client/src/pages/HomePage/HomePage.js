import { useState, useEffect,Suspense,lazy } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PartyCard from '../../components/PartyCard/PartyCrad'
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethods';

export default function HomePage() {
    const [events, setEvents] = useState([])
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const PartyCard = lazy(() => import('../../components/PartyCard/PartyCrad'))
    const navigate = useNavigate();
    // get events from server
    useEffect(() => {
        publicRequest(user.accessToken).get("event/all")
            .then((res) => {
                setEvents(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [user])
    const handleClick = () => {
        navigate(`/addguest/${params.params?._id}`)
      }

  return (
    <div className="bg-blue-200 flex flex-wrap justify-start justify-evenly">
        <Suspense fallback={<div>Loading...</div>}>
            {events.map((event) => (
                <div className="mb-10" onClick={handleClick}>
                    <PartyCard params={event} />
                </div>
            ))}
        </Suspense>
        
      
    
   </div>

  

  



  )
}
<img src="https://source.unsplash.com/random/?familyparty&fit=crop&w=200px&h=200px" alt="random party image" className="object-cover w-full h-full" />