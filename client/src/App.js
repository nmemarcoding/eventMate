import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { useEffect, useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import CreatEventPage from './pages/CreatEventPage/CreatEventPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import AddGuestPage from './pages/AddGuestPage/AddGuestPage';
import EventAcceptation from './pages/EventAcceptation/EventAcceptation';
import { publicRequest } from './hooks/requestMethods';

function App() { 
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  const [serveIsRunning, setServeIsRunning] = useState(false)

  useEffect(() => {
    publicRequest().get("/start")
      .then((res) => {
        setServeIsRunning(true)
      })
      .catch((err) => {
        console.log(err)
        
        setServeIsRunning(false)
      })
  }, [])
  console.log(serveIsRunning)
  if(!serveIsRunning){
    return <div class="flex items-center justify-center h-screen">
    <div class="app">
      <h1 class="animate-pulse animate-slow text-4xl font-bold text-center">EVENTMATE</h1>
    </div>
  </div>
  
  

  }
  else{
  
  return <Router>
    
    <div className="h-screen w-screen bg-blue-200">
      <div className="sticky top-0 left-0 right-0 z-50">
        <Navbar/>
      </div>

      <div className="mt-5">
        <Routes>
          
          <Route path="/createvent" element={user && (new Date().getTime() - new Date(user.date).getTime()) < 259200000 ? <CreatEventPage/> : <LoginPage/>}/>
          <Route path="/login" element={<LoginPage/>}/> 
          <Route path="/signup" element={<SignUpPage/>}/>
     
          <Route path="/addguest/:id" element={user && (new Date().getTime() - new Date(user.date).getTime()) < 259200000 ? <AddGuestPage/> : <LoginPage/>}/>
          
          <Route path="/eventacceptation/:eventId/:guestId" element={<EventAcceptation/>}/>
          <Route path="*" element={user && (new Date().getTime() - new Date(user.date).getTime()) < 259200000 ? <HomePage/> : <LoginPage/>}/> 
        </Routes>
      </div>
    </div>

    </Router>
  }
}

export default App;
