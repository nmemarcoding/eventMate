import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {

    const handleChange = (e) => {}

    const handleLogin = (e) => {}
  return (
    <div className="ritght4" >
        <div class="flex items-center justify-center h-screen ">
        
        <div class="w-full max-w-xs">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Username
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={handleChange}/>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={handleChange}/>
              
            </div>
            <div class="flex flex-col items-center">
             <div class="flex justify-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="button" onClick={handleLogin}>
                Sign In
              </button>
              <div class="ml-4"></div>
              <Link to="/signup">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="button" href="/">
                      Sign Up
                  </button>
              </Link>
            </div>
              <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
