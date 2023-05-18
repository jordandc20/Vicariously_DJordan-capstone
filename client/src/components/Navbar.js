import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {
   return (
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full ">
         <div className="mb-2 sm:mb-0">
            <NavLink className="text-2xl no-underline text-grey-darkest hover:text-blue-dark" to='/'>Vicariously</NavLink>
         </div>
         <div>
            <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to='/'>Home</NavLink>
            <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to='/cities'>My Cities</NavLink>
         </div>
      </nav>
   )
}

export default Navbar