import { useState,useEffect } from 'react';
import { publicRequest } from '../../hooks/requestMethods';
import { useNavigate } from 'react-router-dom';
export default function () {

    const [eventDetails, setEventDetails] = useState({title:"",description:"",date:"",time:"",location:""})
    const [token, setToken] = useState();
    const navigate = useNavigate()
    // get token from local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setToken(user.accessToken);
    }, [])

    // on change input set the value to eventDetails
    const handleChange = (e) => {
        const {id,value} = e.target
        setEventDetails({...eventDetails,[id]:value})
    }

    useEffect(() => {
        console.log(eventDetails)
    }, [eventDetails])

    // function to handel submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // send event details to server
        if(token){

            publicRequest(token).post("event/create",eventDetails)
            .then((res) => {
                window.alert("Event created successfully")
                navigate('/');

            })
            .catch((err) => {
                console.log(err.response.data)
            })
        }
    }

    
  return (
    <div className="bg-blue-200 ">
        
        <form className="w-full max-w-lg sm:bg-white rounded-lg shadow-md px-6 py-8 md:p-10 m-auto ">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="event-title">
                Event Title
                </label>
                <input className="appearance-none w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="title" type="text" placeholder="Enter event title" onChange={handleChange} required/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="event-description">
                Event Description
                </label>
                <textarea className="appearance-none w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder="Enter event description"onChange={handleChange} required></textarea>
            </div>
            <div className="flex flex-col md:flex-row md:-mx-2">
                <div className="md:w-1/2 md:px-2 mb-6 md:mb-0">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="event-date">
                    Event Date
                </label>
                <input className="appearance-none w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="date" type="date"onChange={handleChange} required/>
                </div>
                <div className="md:w-1/2 md:px-2">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="event-time">
                    Event Time
                </label>
                <input className="appearance-none w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="time" type="time"onChange={handleChange}required/>
                </div>
                
                
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="event-title">
                Address
                </label>
                <input className="appearance-none w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="location" type="text" placeholder="Enter event address" onChange={handleChange} required/>
            </div>
            <div className="mt-8">
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onSubmit={handleSubmit} onClick={handleSubmit}>Create Event</button>
            </div>
        </form>

    </div>
  )
}
