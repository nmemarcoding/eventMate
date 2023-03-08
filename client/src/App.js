import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() { 
  return <Router>
    
    <div className="h-screen w-screen bg-blue-200">
  <div className="sticky top-0 left-0 right-0 z-50">
    <Navbar/>
  </div>

  <div className="mt-5">
    <Routes>
      <Route path="/login" element={<LoginPage/>}/> 
      <Route path="/" element={<HomePage/>}/> 
    </Routes>
  </div>
</div>

    </Router>
  }

export default App;
