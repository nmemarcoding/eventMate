import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("user")
        navigate("/login")
      }
  return (
    <div className="navbar bg-base-100" style={{ backgroundColor: '#87bfff' }}>
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Homepage</a></li>
                <li><a>Portfolio</a></li>
                <li><a>About</a></li>
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl">EventMate</a>
        </div>
        <div className="navbar-end">
                    <button
                        onClick={logout}
                        type="button"
                        className="rounded-full  p-1 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" 
                        >
                        <span className="sr-only">login</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>

                    </button>
           
        </div>
    </div>
  )
}
